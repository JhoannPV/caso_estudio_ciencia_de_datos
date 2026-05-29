import { CasoEstudioApi } from "../../api";

export interface RegresionInput {
  longitude: number;
  latitude: number;
  housing_median_age: number;
  total_bedrooms: number;
  median_income: number;
  ocean_proximity: string;
  rooms_per_household: number;
  population_per_household: number;
}

export interface RegresionResult {
  valor_predicho: number;
  valor_formateado: string;
  features_usadas: string[];
}

export const predecirRegresion = async (
  data: RegresionInput
): Promise<RegresionResult> => {
  const api = CasoEstudioApi.getInstance();
  const response = await api.post("/regresion/predict", data);
  return response.data.data;
};
