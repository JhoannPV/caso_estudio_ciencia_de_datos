import { CasoEstudioApi } from "../../api";

export interface ClasificacionInput {
  sex: string;
  age: number;
  famsize: string;
  Medu: number;
  Fedu: number;
  Mjob: string;
  Fjob: string;
  reason: string;
  guardian: string;
  traveltime: number;
  studytime: number;
  failures: number;
  schoolsup: string;
  famsup: string;
  paid: string;
  activities: string;
  nursery: string;
  romantic: string;
  famrel: number;
  freetime: number;
  goout: number;
  Dalc: number;
  Walc: number;
  health: number;
  absences: number;
  G1: number;
  G2: number;
}

export interface ClasificacionResult {
  label: number;
  resultado: "Aprueba" | "Reprueba";
  probabilidad_reprobar: number;
  probabilidad_aprobar: number;
}

export const predecirClasificacion = async (
  data: ClasificacionInput
): Promise<ClasificacionResult> => {
  const api = CasoEstudioApi.getInstance();
  const response = await api.post("/clasificacion/predict", data);
  return response.data.data;
};
