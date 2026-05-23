# Frontend - Clasificador de Calidad del Aire

Aplicación React + Vite + TypeScript + Tailwind que consume la API de
agrupamiento y muestra el nivel de contaminación para valores ingresados.

## Requisitos

- Node.js 18+

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```
VITE_API_URL=http://localhost:3000/api
```

## Ejecución

```bash
npm run dev
```

El frontend arranca en `http://localhost:5173`. Asegúrate de que la API
esté corriendo en `http://localhost:3000`.

## Build

```bash
npm run build
```

## Estructura

```
src/
├── agrupamiento/
│   ├── pages/AgrupamientoPage.tsx        # Página principal
│   ├── components/AgrupamientoForm.tsx   # Formulario de entrada
│   ├── components/AgrupamientoResultCard.tsx  # Resultado visual
│   └── services/agrupamientoService.ts   # Cliente API tipado
├── api/casoEstudioApi.ts                 # Singleton axios
├── components/Navbar.tsx                 # Barra de navegación
├── router/AppRouter.tsx                  # Rutas
└── helpers/getEnvariables.ts             # Variables de entorno
```
