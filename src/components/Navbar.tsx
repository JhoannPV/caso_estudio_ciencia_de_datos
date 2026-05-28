import { Link, useLocation } from "react-router";

const enlaces = [
  { path: "/", label: "Inicio" },
  { path: "/agrupamiento", label: "Calidad del Aire" },
  { path: "/clasificacion", label: "Éxito Estudiantil" },
];

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-6">
        <Link to="/" className="font-bold text-lg text-gray-800">
          Casos de Estudio
        </Link>
        <div className="flex gap-4 ml-6">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.path}
              to={enlace.path}
              className={`text-sm font-medium transition-colors ${
                pathname === enlace.path
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {enlace.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
