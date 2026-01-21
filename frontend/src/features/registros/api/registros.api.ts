import { httpClient } from '../../../shared/lib/http/httpClient';
import type { Registro, RegistroPayload, Stats } from '../types/registro';

export const registrosApi = {
    getAll: async () => {
        const { data } = await httpClient.get<{ success: boolean; data: Registro[] }>('/api/usuarios');
        return data.data;
    },

    create: async (payload: RegistroPayload) => {
        const { data } = await httpClient.post<{ success: boolean; data: Registro }>('/api/usuarios', payload);
        return data.data;
    },

    getStats: async () => {
        const { data } = await httpClient.get<{ success: boolean; data: Stats }>('/api/usuarios/stats');
        return data.data;
    },

    delete: async (id: number) => {
        const { data } = await httpClient.delete<{ success: boolean; data: any }>(`/api/usuarios/${id}`);
        return data.success;
    },
};
