import type { RegresionResult } from "../services/regresionService";

interface Props {
  resultado: RegresionResult;
}

export const RegresionResultCard = ({ resultado }: Props) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Valor Predicho
        </h2>
        <span className="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-blue-600">
          {resultado.valor_formateado}
        </span>
      </div>

      <div className="bg-white rounded-lg p-3 border border-gray-100">
        <span className="text-sm text-gray-500">Precio estimado de la vivienda</span>
        <p className="text-2xl font-bold text-gray-800 mt-1">
          {resultado.valor_formateado}
        </p>
      </div>

      <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 text-sm text-blue-800">
        El modelo Gradient Boosting estima el valor de la vivienda basado en
        ubicación, tamaño, ingresos y proximidad al océano.
      </div>
    </div>
  );
};
