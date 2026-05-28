import type { ClasificacionResult } from "../services/clasificacionService";

interface Props {
  resultado: ClasificacionResult;
}

export const ClasificacionResultCard = ({ resultado }: Props) => {
  const aprueba = resultado.resultado === "Aprueba";
  const color = aprueba ? "green" : "red";

  return (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-xl p-6 space-y-4`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Resultado</h2>
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-bold text-white bg-${color}-500`}
        >
          {resultado.resultado}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <span className="text-gray-500">Probabilidad de aprobar</span>
          <p className="text-lg font-semibold text-gray-800">
            {(resultado.probabilidad_aprobar * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <span className="text-gray-500">Probabilidad de reprobar</span>
          <p className="text-lg font-semibold text-gray-800">
            {(resultado.probabilidad_reprobar * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
        {aprueba
          ? "El modelo predice que el estudiante aprobará el curso de matemáticas con alta confianza."
          : "El modelo predice que el estudiante está en riesgo de reprobar. Se recomienda implementar intervenciones pedagógicas."}
      </div>
    </div>
  );
};
