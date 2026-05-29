import { useState } from "react";
import type { RegresionInput } from "../services/regresionService";

const CAMPOS = [
  { id: "longitude", label: "Longitud", placeholder: "-124 a -114", min: -124, max: -114, step: 0.01 },
  { id: "latitude", label: "Latitud", placeholder: "32 a 42", min: 32, max: 42, step: 0.01 },
  { id: "housing_median_age", label: "Antigüedad media (años)", placeholder: "1 a 52", min: 1, max: 52, step: 1 },
  { id: "total_bedrooms", label: "Total de dormitorios", placeholder: "1 a 6445", min: 1, max: 6445, step: 1 },
  { id: "median_income", label: "Ingreso medio (decenas de miles USD)", placeholder: "0.5 a 15.0", min: 0.5, max: 15, step: 0.01 },
  { id: "rooms_per_household", label: "Habitaciones por hogar", placeholder: "1 a 141", min: 1, max: 141, step: 0.1 },
  { id: "population_per_household", label: "Población por hogar", placeholder: "0 a 1243", min: 0, max: 1243, step: 0.1 },
];

const OPCIONES_OCEANO = [
  { value: "<1H OCEAN", label: "<1H OCEAN (a <1 hora del océano)" },
  { value: "INLAND", label: "INLAND (tierra adentro)" },
  { value: "NEAR OCEAN", label: "NEAR OCEAN (cerca del océano)" },
  { value: "NEAR BAY", label: "NEAR BAY (cerca de la bahía)" },
  { value: "ISLAND", label: "ISLAND (isla)" },
];

interface Props {
  onPredecir: (data: RegresionInput) => void;
  cargando: boolean;
}

export const RegresionForm = ({ onPredecir, cargando }: Props) => {
  const [valores, setValores] = useState<Record<string, string>>({});
  const [oceano, setOceano] = useState("<1H OCEAN");

  const actualizarNum = (id: string, valor: string) => {
    if (/^-?\d*\.?\d*$/.test(valor) || valor === "") {
      setValores((prev) => ({ ...prev, [id]: valor }));
    }
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todosLlenos) return;
    const data: RegresionInput = {
      longitude: parseFloat(valores["longitude"] || "0"),
      latitude: parseFloat(valores["latitude"] || "0"),
      housing_median_age: parseFloat(valores["housing_median_age"] || "0"),
      total_bedrooms: parseFloat(valores["total_bedrooms"] || "0"),
      median_income: parseFloat(valores["median_income"] || "0"),
      ocean_proximity: oceano,
      rooms_per_household: parseFloat(valores["rooms_per_household"] || "0"),
      population_per_household: parseFloat(valores["population_per_household"] || "0"),
    };
    onPredecir(data);
  };

  const todosLlenos = CAMPOS.every((c) => (valores[c.id] ?? "").trim() !== "");

  return (
    <form onSubmit={enviar} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              onChange={(e) => actualizarNum(campo.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
        <div>
          <label htmlFor="ocean_proximity" className="block text-sm font-medium text-gray-700 mb-1">
            Proximidad al océano
          </label>
          <select
            id="ocean_proximity"
            value={oceano}
            onChange={(e) => setOceano(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {OPCIONES_OCEANO.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={!todosLlenos || cargando}
        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {cargando ? "Prediciendo..." : "Predecir precio de vivienda"}
      </button>
    </form>
  );
};
