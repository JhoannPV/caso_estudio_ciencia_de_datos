import { useState } from "react";
import { ClasificacionForm } from "../components/ClasificacionForm";
import { ClasificacionResultCard } from "../components/ClasificacionResultCard";
import type { ClasificacionInput, ClasificacionResult } from "../services/clasificacionService";

export const ClasificacionPage = () => {
  const [resultado, setResultado] = useState<ClasificacionResult | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const manejarPredecir = async (data: ClasificacionInput) => {
    setCargando(true);
    setError(null);
    setResultado(null);
    try {
      const { predecirClasificacion } = await import("../services/clasificacionService");
      const res = await predecirClasificacion(data);
      setResultado(res);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error al conectar con la API";
      setError(msg);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Predicción de Éxito Estudiantil
        </h1>
        <p className="text-gray-600 mt-1">
          Ingrese los datos del estudiante para predecir si aprobará o reprobará
          el curso de matemáticas.
        </p>
      </div>

      <ClasificacionForm onPredecir={manejarPredecir} cargando={cargando} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {cargando && (
        <div className="text-center text-gray-500">Prediciendo...</div>
      )}

      {resultado && <ClasificacionResultCard resultado={resultado} />}
    </div>
  );
};
