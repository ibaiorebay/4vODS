import { useState, useEffect } from 'react';
import { Entidad } from '../Models/Entidad';
import { mockEntidades } from '../Mocks/mockEntidades';

export const useEntidades = () => {
  const [entidades, setEntidades] = useState<Entidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMockData = async () => {
      try {
        await new Promise(res => setTimeout(res, 500));
        setEntidades(mockEntidades);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  return {
    entidades,
    loading,
    error
  };
};
