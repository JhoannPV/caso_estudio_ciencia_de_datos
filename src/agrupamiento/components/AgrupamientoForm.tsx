import { useState } from "react";
import type { AgrupamientoInput } from "../services/agrupamientoService";

const CAMPOS = [
  { id: "PT08.S1(CO)", label: "PT08.S1(CO) - Sensor de CO", placeholder: "ej: 1360.0" },
  { id: "PT08.S2(NMHC)", label: "PT08.S2(NMHC) - Sensor NMHC", placeholder: "ej: 1046.0" },
  { id: "C6H6(GT)", label: "C6H6(GT) - Benceno", placeholder: "ej: 11.9" },
  { id: "NOx(GT)", label: "NOx(GT) - Óxidos de nitrógeno", placeholder: "ej: 166.0" },
];

interface Props {
  onPredecir: (data: AgrupamientoInput) => void;
  cargando: boolean;
}

export const AgrupamientoForm = ({ onPredecir, cargando }: Props) => {
  const [valores, setValores] = useState<Record<string, string>>({});

  const actualizar = (id: string, valor: string) => {
    if (/^-?\d*\.?\d*$/.test(valor) || valor === "") {
      setValores((prev) => ({ ...prev, [id]: valor }));
    }
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todosLlenos) return;
    const data: AgrupamientoInput = {
      "PT08.S1(CO)": parseFloat(valores["PT08.S1(CO)"] || "0"),
      "PT08.S2(NMHC)": parseFloat(valores["PT08.S2(NMHC)"] || "0"),
      "C6H6(GT)": parseFloat(valores["C6H6(GT)"] || "0"),
      "NOx(GT)": parseFloat(valores["NOx(GT)"] || "0"),
    };
    onPredecir(data);
  };

  const todosLlenos = CAMPOS.every((c) => (valores[c.id] ?? "").trim() !== "");

  return (
    <form onSubmit={enviar} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      {CAMPOS.map((campo) => (
        <div key={campo.id}>
          <label htmlFor={campo.id} className="block text-sm font-medium text-gray-700 mb-1">
            {campo.label}
          </label>
          <input
            id={campo.id}
            type="text"
            inputMode="decimal"
            placeholder={campo.placeholder}
            value={valores[campo.id] ?? ""}
            onChange={(e) => actualizar(campo.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={!todosLlenos || cargando}
        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {cargando ? "Clasificando..." : "Clasificar nivel de contaminación"}
      </button>
    </form>
  );
};
