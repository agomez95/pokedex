export interface HttpAdapter {
    get<T>(url: string): Promise<T>;
}

// Ingreso algo de tipo T y regreso algo de tipo T, leer un poco