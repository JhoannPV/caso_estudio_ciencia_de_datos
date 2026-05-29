import { useState } from "react";
import { RegresionForm } from "../components/RegresionForm";
import { RegresionResultCard } from "../components/RegresionResultCard";
import type { RegresionInput, RegresionResult } from "../services/regresionService";

export const RegresionPage = () => {
  const [resultado, setResultado] = useState<RegresionResult | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const manejarPredecir = async (data: RegresionInput) => {
    setCargando(true);
    setError(null);
    setResultado(null);
    try {
      const { predecirRegresion } = await import("../services/regresionService");
      const res = await predecirRegresion(data);
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
          Predicción de Precio de Vivienda
        </h1>
        <p className="text-gray-600 mt-1">
          Ingrese las características de la vivienda para estimar su valor de
          mercado en California.
        </p>
      </div>

      <RegresionForm onPredecir={manejarPredecir} cargando={cargando} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {cargando && (
        <div className="text-center text-gray-500">Prediciendo...</div>
      )}

      {resultado && <RegresionResultCard resultado={resultado} />}
    </div>
  );
};
