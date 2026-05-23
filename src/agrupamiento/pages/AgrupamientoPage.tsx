import { useState } from "react";
import { AgrupamientoForm } from "../components/AgrupamientoForm";
import { AgrupamientoResultCard } from "../components/AgrupamientoResultCard";
import type { AgrupamientoInput, AgrupamientoResult } from "../services/agrupamientoService";

export const AgrupamientoPage = () => {
  const [resultado, setResultado] = useState<AgrupamientoResult | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const manejarPredecir = async (data: AgrupamientoInput) => {
    setCargando(true);
    setError(null);
    setResultado(null);
    try {
      const { predecirAgrupamiento } = await import("../services/agrupamientoService");
      const res = await predecirAgrupamiento(data);
      setResultado(res);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error al conectar con la API";
      setError(msg);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Análisis de Calidad del Aire
        </h1>
        <p className="text-gray-600 mt-1">
          Ingrese los valores de las variables ambientales para clasificar el
          nivel de contaminación.
        </p>
      </div>

      <AgrupamientoForm onPredecir={manejarPredecir} cargando={cargando} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {cargando && (
        <div className="text-center text-gray-500">Clasificando...</div>
      )}

      {resultado && <AgrupamientoResultCard resultado={resultado} />}
    </div>
  );
};
