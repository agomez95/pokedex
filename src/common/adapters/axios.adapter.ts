import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable()
export class AxiosAdapter implements HttpAdapter {
    private axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch(error) {
            throw new Error('This is a error - Check logs');
        }
    }
}

/**
 * OJO: el adaptador de axios hace que elimines la inyeccion de axios directamente del servicio del proyecto, si queremos otro adaptador
 * creamos otro con fetch u otro mas 
 */