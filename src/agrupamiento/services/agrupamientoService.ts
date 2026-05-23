import { CasoEstudioApi } from "../../api";

export interface AgrupamientoInput {
  "PT08.S1(CO)": number;
  "PT08.S2(NMHC)": number;
  "C6H6(GT)": number;
  "NOx(GT)": number;
}

export interface AgrupamientoResult {
  label: number;
  nivel: "Bajo" | "Alto";
  distancia_al_centroide: number;
  centroide: Record<string, number>;
}

export const predecirAgrupamiento = async (
  data: AgrupamientoInput
): Promise<AgrupamientoResult> => {
  const api = CasoEstudioApi.getInstance();
  const response = await api.post("/agrupamiento/predict", data);
  return response.data.data;
};
