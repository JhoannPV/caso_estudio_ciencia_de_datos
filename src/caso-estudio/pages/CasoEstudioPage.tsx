import { Link } from "react-router";

export const CasoEstudioPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Casos de Estudio</h1>
        <p className="text-gray-600 mt-2">
          Proyectos de ciencia de datos aplicados a diferentes dominios.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link
          to="/agrupamiento"
          className="block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            Calidad del Aire
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Agrupamiento de niveles de contaminación (KMeans) — Caso de estudio
            CRISP-DM.
          </p>
        </Link>
      </div>
    </div>
  );
};
