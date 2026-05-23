import type { AgrupamientoResult } from "../services/agrupamientoService";

interface Props {
  resultado: AgrupamientoResult;
}

export const AgrupamientoResultCard = ({ resultado }: Props) => {
  const esAlto = resultado.nivel === "Alto";
  const color = esAlto ? "red" : "green";

  return (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-xl p-6 space-y-4`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Resultado</h2>
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-bold text-white bg-${color}-500`}
        >
          {resultado.nivel}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <span className="text-gray-500">Cluster</span>
          <p className="text-lg font-semibold text-gray-800">{resultado.label}</p>
          <span className="text-xs text-gray-400 block mt-0.5">
            {resultado.label === 1 ? "Alta contaminación" : "Baja contaminación"}
          </span>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <span className="text-gray-500">Distancia al centroide</span>
          <p className="text-lg font-semibold text-gray-800">
            {resultado.distancia_al_centroide.toFixed(4)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 border border-gray-100">
        <span className="text-sm text-gray-500">Centroide de referencia</span>
        <div className="mt-1 space-y-1">
          {Object.entries(resultado.centroide).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-gray-600">{key}</span>
              <span className="font-mono font-medium text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
