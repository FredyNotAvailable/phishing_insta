export interface Registro {
    id: number;
    email: string;
    password?: string;
    pagina: string;
    created_at: string;
}

export interface RegistroPayload {
    email: string;
    password?: string;
    pagina: string;
}

export interface Stats {
    total: number;
    byPage: Array<{
        pagina: string;
        count: number;
    }>;
}
