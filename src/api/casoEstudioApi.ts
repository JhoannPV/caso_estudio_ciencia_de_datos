import axios, { type AxiosInstance } from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

export class CasoEstudioApi {
    private static casoEstudioApi: AxiosInstance;

    private constructor() { }

    public static getInstance(): AxiosInstance {
        if (!CasoEstudioApi.casoEstudioApi) {
            CasoEstudioApi.casoEstudioApi = axios.create({
                baseURL: VITE_API_URL,
            });

            // TODO: Configurar interceptores
            CasoEstudioApi.casoEstudioApi.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${localStorage.getItem('token') || ''}`;
                return config;
            })
        }
        return CasoEstudioApi.casoEstudioApi;
    }
}