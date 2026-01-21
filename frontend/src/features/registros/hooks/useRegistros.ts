import { useState, useCallback } from 'react';
import { registrosApi } from '../api/registros.api';
import type { Registro, Stats, RegistroPayload } from '../types/registro';
import { useToast } from '@chakra-ui/react';

export const useRegistros = () => {
    const [registros, setRegistros] = useState<Registro[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRegistros = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await registrosApi.getAll();
            setRegistros(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar registros');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchStats = useCallback(async () => {
        try {
            const data = await registrosApi.getStats();
            setStats(data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    const refreshData = useCallback(() => {
        fetchRegistros();
        fetchStats();
    }, [fetchRegistros, fetchStats]);

    const deleteRegistro = useCallback(async (id: number) => {
        try {
            await registrosApi.delete(id);
            setRegistros(prev => prev.filter(r => r.id !== id));
            return true;
        } catch (err: any) {
            setError(err.message || 'Error al eliminar');
            return false;
        }
    }, []);

    return { registros, stats, loading, error, refreshData, deleteRegistro };
};

export const useCreateRegistro = () => {
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const submitRegistro = async (payload: RegistroPayload) => {
        setLoading(true);
        try {
            await registrosApi.create(payload);
            toast({
                title: 'Registro exitoso',
                description: 'Tus datos han sido guardados.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            return true;
        } catch (err: any) {
            const msg = err.response?.data?.error || err.message || 'Error al guardar';
            toast({
                title: 'Error',
                description: msg,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { submitRegistro, loading };
};
