import { useState, useEffect } from 'react';
import { Profesor } from '../Models/Profesor';
import { mockProfesores } from '../Mocks/mockProfesores';

export const useProfesores = () => {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMockData = async () => {
      try {
        await new Promise(res => setTimeout(res, 500));
        setProfesores(mockProfesores);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  return {
    profesores,
    loading,
    error
  };
};
