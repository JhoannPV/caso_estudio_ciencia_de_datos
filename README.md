# Frontend - Casos de Estudio

Aplicación React + Vite + TypeScript + Tailwind que consume la API de casos de
estudio. Incluye tres módulos: **Agrupamiento** (calidad del aire),
**Clasificación** (rendimiento estudiantil) y **Regresión** (precio de viviendas).

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

## Rutas

| Ruta | Módulo | Descripción |
|---|---|---|
| `/` | Inicio | Landing page con acceso a los casos |
| `/agrupamiento` | Agrupamiento | Clasificar contaminación ambiental (Bajo/Alto) |
| `/clasificacion` | Clasificación | Predecir éxito estudiantil (Aprueba/Reprueba) |
| `/regresion` | Regresión | Estimar precio de vivienda en California (USD) |

## Estructura

```
src/
├── agrupamiento/
│   ├── pages/AgrupamientoPage.tsx
│   ├── components/AgrupamientoForm.tsx
│   ├── components/AgrupamientoResultCard.tsx
│   └── services/agrupamientoService.ts
├── clasificacion/
│   ├── pages/ClasificacionPage.tsx
│   ├── components/ClasificacionForm.tsx
│   ├── components/ClasificacionResultCard.tsx
│   └── services/clasificacionService.ts
├── regresion/
│   ├── pages/RegresionPage.tsx
│   ├── components/RegresionForm.tsx
│   ├── components/RegresionResultCard.tsx
│   └── services/regresionService.ts
├── api/casoEstudioApi.ts           # Singleton axios
├── components/Navbar.tsx           # Navegación entre módulos
├── router/AppRouter.tsx            # React Router
└── helpers/getEnvariables.ts       # Variables de entorno
```
