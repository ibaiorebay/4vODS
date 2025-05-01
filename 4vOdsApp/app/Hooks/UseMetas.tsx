import { useState, useEffect } from 'react';
import { Meta } from '../Models/Meta';
import { mockMetas } from '../Mocks/mockMetas';

export const useMetas = () => {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMockData = async () => {
      try {
        await new Promise(res => setTimeout(res, 500));
        setMetas(mockMetas);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  const findMetaById = (id: number): Meta | undefined => {
    return metas.find(meta => meta.iD_META === id);
  };

  return {
    metas,
    loading,
    error,
    findMetaById
  };
};

