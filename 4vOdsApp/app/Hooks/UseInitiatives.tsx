import { useState, useEffect } from 'react';
import { Iniciativa } from '../Models/Iniciativa';
import { mockInitiatives } from '../Mocks/mockInitiatives';

export const useInitiatives = (courseName: string | null = null) => {
  const [initiatives, setInitiatives] = useState<Iniciativa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar las iniciativas sin ningún filtro
  const loadAllInitiatives = async () => {
    try {
      await new Promise(res => setTimeout(res, 500)); // Simulando un retraso para cargar los datos
      setInitiatives(mockInitiatives);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  // Función para cargar las iniciativas filtradas por el curso
  const loadFilteredInitiatives = async (courseName: string) => {
    try {
      await new Promise(res => setTimeout(res, 500)); // Simulando un retraso para cargar los datos
      const filteredInitiatives = mockInitiatives.filter(initiative =>
        initiative.iD_ASIGNATURAs.some(asignatura =>
          asignatura.nombrE_CURSO.toLowerCase().includes(courseName.toLowerCase())
        )
      );
      setInitiatives(filteredInitiatives);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  // useEffect que carga todas las iniciativas si no se pasa un curso
  useEffect(() => {
    if (courseName) {
      loadFilteredInitiatives(courseName);
    } else {
      loadAllInitiatives();
    }
  }, [courseName]); // Dependemos del `courseName` para actualizar las iniciativas

  return {
    initiatives,
    loading,
    error
  };
};
