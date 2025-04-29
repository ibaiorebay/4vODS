import { useState, useEffect } from 'react';
import { Asignatura } from '../Models/Asignatura';
import { mockAsignaturas } from '../Mocks/mockAsignaturas';

export const useAsignaturas = () => {
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMockData = async () => {
      try {
        await new Promise(res => setTimeout(res, 500));
        setAsignaturas(mockAsignaturas);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  return {
    asignaturas,
    loading,
    error
  };
};
