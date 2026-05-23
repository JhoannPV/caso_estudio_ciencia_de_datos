import { Route, Routes } from "react-router";
import { CasoEstudioPage } from "../caso-estudio";
import { AgrupamientoPage } from "../agrupamiento/pages/AgrupamientoPage";
import { Navbar } from "../components/Navbar";

export const AppRouter = () => {
    return (
        <>
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<CasoEstudioPage />} />
                    <Route path="/agrupamiento" element={<AgrupamientoPage />} />
                </Routes>
            </main>
        </>
    );
};
