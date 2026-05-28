import { useState } from "react";
import type { ClasificacionInput } from "../services/clasificacionService";

type CampoDef = {
  id: keyof ClasificacionInput;
  label: string;
  tipo: "number" | "select";
  opciones?: { value: string; label: string }[];
  min?: number;
  max?: number;
};

const SECCIONES: { titulo: string; campos: CampoDef[] }[] = [
  {
    titulo: "Datos personales",
    campos: [
      { id: "sex", label: "Sexo", tipo: "select", opciones: [{ value: "F", label: "Femenino" }, { value: "M", label: "Masculino" }] },
      { id: "age", label: "Edad", tipo: "number", min: 15, max: 22 },
      { id: "famsize", label: "Tamaño familiar", tipo: "select", opciones: [{ value: "LE3", label: "≤ 3" }, { value: "GT3", label: "> 3" }] },
    ],
  },
  {
    titulo: "Educación de los padres",
    campos: [
      { id: "Medu", label: "Educación de la madre (0-4)", tipo: "number", min: 0, max: 4 },
      { id: "Fedu", label: "Educación del padre (0-4)", tipo: "number", min: 0, max: 4 },
      { id: "Mjob", label: "Trabajo de la madre", tipo: "select", opciones: [
        { value: "teacher", label: "Docente" }, { value: "health", label: "Salud" },
        { value: "services", label: "Servicios" }, { value: "at_home", label: "Hogar" },
        { value: "other", label: "Otro" },
      ]},
      { id: "Fjob", label: "Trabajo del padre", tipo: "select", opciones: [
        { value: "teacher", label: "Docente" }, { value: "health", label: "Salud" },
        { value: "services", label: "Servicios" }, { value: "at_home", label: "Hogar" },
        { value: "other", label: "Otro" },
      ]},
    ],
  },
  {
    titulo: "Información escolar",
    campos: [
      { id: "reason", label: "Razón para elegir escuela", tipo: "select", opciones: [
        { value: "home", label: "Cerca de casa" }, { value: "reputation", label: "Reputación" },
        { value: "course", label: "Preferencia de curso" }, { value: "other", label: "Otro" },
      ]},
      { id: "guardian", label: "Tutor", tipo: "select", opciones: [
        { value: "mother", label: "Madre" }, { value: "father", label: "Padre" },
        { value: "other", label: "Otro" },
      ]},
      { id: "traveltime", label: "Tiempo de viaje (1-4)", tipo: "number", min: 1, max: 4 },
      { id: "studytime", label: "Estudio semanal (1-4)", tipo: "number", min: 1, max: 4 },
      { id: "failures", label: "Fracasos previos (0-4)", tipo: "number", min: 0, max: 4 },
      { id: "absences", label: "Ausencias (0-93)", tipo: "number", min: 0, max: 93 },
    ],
  },
  {
    titulo: "Apoyos educativos",
    campos: [
      { id: "schoolsup", label: "Apoyo escolar extra", tipo: "select", opciones: [{ value: "yes", label: "Sí" }, { value: "no", label: "No" }] },
      { id: "famsup", label: "Apoyo familiar", tipo: "select", opciones: [{ value: "yes", label: "Sí" }, { value: "no", label: "No" }] },
      { id: "paid", label: "Clases pagadas extra", tipo: "select", opciones: [{ value: "yes", label: "Sí" }, { value: "no", label: "No" }] },
      { id: "activities", label: "Actividades extraescolares", tipo: "select", opciones: [{ value: "yes", label: "Sí" }, { value: "no", label: "No" }] },
      { id: "nursery", label: "Asistió a guardería", tipo: "select", opciones: [{ value: "yes", label: "Sí" }, { value: "no", label: "No" }] },
      { id: "romantic", label: "Relación romántica", tipo: "select", opciones: [{ value: "yes", label: "Sí" }, { value: "no", label: "No" }] },
    ],
  },
  {
    titulo: "Vida personal",
    campos: [
      { id: "famrel", label: "Calidad familiar (1-5)", tipo: "number", min: 1, max: 5 },
      { id: "freetime", label: "Tiempo libre (1-5)", tipo: "number", min: 1, max: 5 },
      { id: "goout", label: "Salidas con amigos (1-5)", tipo: "number", min: 1, max: 5 },
      { id: "Dalc", label: "Alcohol diario (1-5)", tipo: "number", min: 1, max: 5 },
      { id: "Walc", label: "Alcohol fin de semana (1-5)", tipo: "number", min: 1, max: 5 },
      { id: "health", label: "Estado de salud (1-5)", tipo: "number", min: 1, max: 5 },
    ],
  },
  {
    titulo: "Notas parciales",
    campos: [
      { id: "G1", label: "Nota primer período (0-20)", tipo: "number", min: 0, max: 20 },
      { id: "G2", label: "Nota segundo período (0-20)", tipo: "number", min: 0, max: 20 },
    ],
  },
];

interface Props {
  onPredecir: (data: ClasificacionInput) => void;
  cargando: boolean;
}

export const ClasificacionForm = ({ onPredecir, cargando }: Props) => {
  const [valores, setValores] = useState<Record<string, string>>({});

  const actualizar = (id: string, valor: string) => {
    setValores((prev) => ({ ...prev, [id]: valor }));
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Record<string, unknown> = {};
    for (const sec of SECCIONES) {
      for (const campo of sec.campos) {
        data[campo.id] = campo.tipo === "number"
          ? parseFloat(valores[campo.id] ?? "0")
          : valores[campo.id] ?? "";
      }
    }
    onPredecir(data as unknown as ClasificacionInput);
  };

  const todosLlenos = SECCIONES.flatMap((s) => s.campos).every(
    (c) => valores[c.id]?.trim() !== ""
  );

  return (
    <form onSubmit={enviar} className="space-y-6">
      {SECCIONES.map((sec) => (
        <fieldset
          key={sec.titulo}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
        >
          <legend className="text-sm font-semibold text-gray-700 px-2 uppercase tracking-wide">
            {sec.titulo}
          </legend>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
            {sec.campos.map((campo) => (
              <div key={campo.id}>
                <label
                  htmlFor={campo.id}
                  className="block text-xs font-medium text-gray-600 mb-1"
                >
                  {campo.label}
                </label>
                {campo.tipo === "select" ? (
                  <select
                    id={campo.id}
                    value={valores[campo.id] ?? ""}
                    onChange={(e) => actualizar(campo.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="">--</option>
                    {campo.opciones?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={campo.id}
                    type="number"
                    min={campo.min}
                    max={campo.max}
                    placeholder={`${campo.min ?? 0} - ${campo.max ?? 20}`}
                    value={valores[campo.id] ?? ""}
                    onChange={(e) => actualizar(campo.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
            ))}
          </div>
        </fieldset>
      ))}

      <button
        type="submit"
        disabled={!todosLlenos || cargando}
        className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {cargando ? "Prediciendo..." : "Predecir rendimiento académico"}
      </button>
    </form>
  );
};
