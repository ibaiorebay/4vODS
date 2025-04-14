import { useState, useEffect } from 'react';
import { Iniciativa } from '../Models/Iniciativa';

export const useInitiatives = () => {
  const [initiatives, setInitiatives] = useState<Iniciativa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulamos un pequeño delay como si fuera una petición real
    const loadMockData = async () => {
      try {
        const mockData: Iniciativa[] = [
          {
            iD_INICIATIVA: 1,
            titulo: 'Taller de Reciclaje',
            horas: 10,
            fecha_INICIO: '2025-04-01',
            fecha_FIN: '2025-04-15',
            descripcion: 'Taller para enseñar técnicas de reciclaje y cuidado del medio ambiente',
            tipo: 'Taller',
            productO_FINAL: 'Material educativo',
            nueva: true,
            difusion: 'Redes sociales',
            iD_ASIGNATURAs: [
              {
                iD_ASIGNATURA: 1,
                iD_CURSO: 1,
                nombrE_CURSO: 'Curso de Medio Ambiente',
                nombre: 'Ecología y Sostenibilidad'
              },
              {
                iD_ASIGNATURA: 2,
                iD_CURSO: 1,
                nombrE_CURSO: 'Curso de Medio Ambiente',
                nombre: 'Gestión Ambiental'
              }
            ],
            iD_ENTIDADs: [
              {
                iD_ENTIDAD: 1,
                nombre: 'Entidad Ambiental',
                descripcion: 'Organización dedicada a la protección y cuidado del medio ambiente'
              }
            ],
            iD_METAs: [
              {
                iD_META: 1,
                iD_ODS: 1,
                nombrE_ODS: 'ODS Social',
                descripcioN_ODS: 'Promover la equidad y el bienestar social',
                dimensioN_ODS: 'Social',
                descripcioN_META: 'Reducir la desigualdad social'
              },
              {
                iD_META: 2,
                iD_ODS: 1,
                nombrE_ODS: 'ODS Social',
                descripcioN_ODS: 'Promover la equidad y el bienestar social',
                dimensioN_ODS: 'Social',
                descripcioN_META: 'Mejorar la inclusión'
              }
            ],
            iD_PROFESORs: [
              {
                iD_PROFESOR: 1,
                nombre: 'Ana',
                apellidO1: 'Martínez',
                apellidO2: 'López',
                fechA_NACIMIENTO: '1980-03-15'
              },
              {
                iD_PROFESOR: 2,
                nombre: 'Luis',
                apellidO1: 'García',
                apellidO2: 'Fernández',
                fechA_NACIMIENTO: '1975-07-22'
              }
            ]
          }
        ];

        // Simular delay
        await new Promise(res => setTimeout(res, 500));

        setInitiatives(mockData);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  return {
    initiatives,
    loading,
    error
  };
};
