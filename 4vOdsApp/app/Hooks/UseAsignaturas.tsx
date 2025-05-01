import { useState, useEffect } from 'react';
import { Asignatura } from '../Models/Asignatura';
import { mockAsignaturas } from '../Mocks/mockAsignaturas';

export const useAsignaturas = (id?: number) => {
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMockData = async () => {
      try {
        await new Promise(res => setTimeout(res, 500));
        if (id) {
          const asignatura = mockAsignaturas.find(a => a.iD_ASIGNATURA === id);
          setAsignaturas(asignatura ? [asignatura] : []);
        } else {
          setAsignaturas(mockAsignaturas);
        }
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    loadMockData();
  }, [id]);

  return {
    asignaturas,
    loading,
    error
  };
};

