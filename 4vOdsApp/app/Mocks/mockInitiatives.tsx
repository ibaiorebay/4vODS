// src/mocks/mockInitiatives.ts
import { Iniciativa } from '../Models/Iniciativa';

export const mockInitiatives: Iniciativa[] = [
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
  },
  {
    iD_INICIATIVA: 2,
    titulo: 'Charla sobre Energías Renovables',
    horas: 5,
    fecha_INICIO: '2025-05-10',
    fecha_FIN: '2025-05-10',
    descripcion: 'Conferencia para concienciar sobre el uso de energías limpias',
    tipo: 'Charla',
    productO_FINAL: 'Video educativo',
    nueva: false,
    difusion: 'Página web',
    iD_ASIGNATURAs: [
      {
        iD_ASIGNATURA: 3,
        iD_CURSO: 2,
        nombrE_CURSO: 'Curso de Energía',
        nombre: 'Energías Renovables'
      }
    ],
    iD_ENTIDADs: [
      {
        iD_ENTIDAD: 2,
        nombre: 'Instituto Solar',
        descripcion: 'Investigación y divulgación de energía solar'
      }
    ],
    iD_METAs: [
      {
        iD_META: 3,
        iD_ODS: 7,
        nombrE_ODS: 'Energía asequible y no contaminante',
        descripcioN_ODS: 'Garantizar el acceso a una energía asequible, segura, sostenible y moderna',
        dimensioN_ODS: 'Ambiental',
        descripcioN_META: 'Aumentar el uso de energías renovables'
      }
    ],
    iD_PROFESORs: [
      {
        iD_PROFESOR: 3,
        nombre: 'Elena',
        apellidO1: 'Sánchez',
        apellidO2: 'Ruiz',
        fechA_NACIMIENTO: '1985-11-30'
      }
    ]
  },
  {
    iD_INICIATIVA: 3,
    titulo: 'Campaña de Recogida de Residuos',
    horas: 15,
    fecha_INICIO: '2025-06-01',
    fecha_FIN: '2025-06-07',
    descripcion: 'Actividad para recoger residuos en espacios públicos con participación comunitaria',
    tipo: 'Campaña',
    productO_FINAL: 'Informe de impacto',
    nueva: true,
    difusion: 'Volantes y redes',
    iD_ASIGNATURAs: [
      {
        iD_ASIGNATURA: 4,
        iD_CURSO: 3,
        nombrE_CURSO: 'Gestión Urbana',
        nombre: 'Limpieza y Espacios Verdes'
      }
    ],
    iD_ENTIDADs: [
      {
        iD_ENTIDAD: 3,
        nombre: 'EcoCiudad',
        descripcion: 'ONG urbana para mejorar entornos ciudadanos'
      }
    ],
    iD_METAs: [
      {
        iD_META: 4,
        iD_ODS: 11,
        nombrE_ODS: 'Ciudades y comunidades sostenibles',
        descripcioN_ODS: 'Hacer que las ciudades sean inclusivas, seguras y sostenibles',
        dimensioN_ODS: 'Social',
        descripcioN_META: 'Reducción de residuos en zonas urbanas'
      }
    ],
    iD_PROFESORs: [
      {
        iD_PROFESOR: 4,
        nombre: 'Javier',
        apellidO1: 'Domínguez',
        apellidO2: 'Pérez',
        fechA_NACIMIENTO: '1990-02-20'
      }
    ]
  },
  {
    iD_INICIATIVA: 4,
    titulo: 'Huertos Urbanos Sostenibles',
    horas: 20,
    fecha_INICIO: '2025-03-01',
    fecha_FIN: '2025-06-30',
    descripcion: 'Creación y mantenimiento de huertos urbanos con estudiantes',
    tipo: 'Proyecto',
    productO_FINAL: 'Huerto activo',
    nueva: false,
    difusion: 'Radio local',
    iD_ASIGNATURAs: [
      {
        iD_ASIGNATURA: 5,
        iD_CURSO: 4,
        nombrE_CURSO: 'Agricultura Sostenible',
        nombre: 'Cultivos Urbanos'
      }
    ],
    iD_ENTIDADs: [
      {
        iD_ENTIDAD: 4,
        nombre: 'Verde Vivo',
        descripcion: 'Asociación para agricultura urbana'
      }
    ],
    iD_METAs: [
      {
        iD_META: 5,
        iD_ODS: 2,
        nombrE_ODS: 'Hambre cero',
        descripcioN_ODS: 'Poner fin al hambre, lograr la seguridad alimentaria',
        dimensioN_ODS: 'Social',
        descripcioN_META: 'Fomentar agricultura urbana sostenible'
      }
    ],
    iD_PROFESORs: [
      {
        iD_PROFESOR: 5,
        nombre: 'María',
        apellidO1: 'Ramírez',
        apellidO2: 'Gómez',
        fechA_NACIMIENTO: '1978-06-18'
      }
    ]
  },
  {
    iD_INICIATIVA: 5,
    titulo: 'Foro de Igualdad de Género',
    horas: 8,
    fecha_INICIO: '2025-07-10',
    fecha_FIN: '2025-07-11',
    descripcion: 'Espacio de discusión y formación sobre equidad de género en la educación',
    tipo: 'Foro',
    productO_FINAL: 'Conclusiones del foro',
    nueva: true,
    difusion: 'Email institucional',
    iD_ASIGNATURAs: [
      {
        iD_ASIGNATURA: 6,
        iD_CURSO: 5,
        nombrE_CURSO: 'Derechos Humanos',
        nombre: 'Igualdad y Diversidad'
      }
    ],
    iD_ENTIDADs: [
      {
        iD_ENTIDAD: 5,
        nombre: 'Fundación Mujer y Futuro',
        descripcion: 'Organización en pro de la igualdad de género'
      }
    ],
    iD_METAs: [
      {
        iD_META: 6,
        iD_ODS: 5,
        nombrE_ODS: 'Igualdad de género',
        descripcioN_ODS: 'Lograr la igualdad entre los géneros y empoderar a todas las mujeres y niñas',
        dimensioN_ODS: 'Social',
        descripcioN_META: 'Disminuir la brecha de género en la educación'
      }
    ],
    iD_PROFESORs: [
      {
        iD_PROFESOR: 6,
        nombre: 'Rosa',
        apellidO1: 'Navarro',
        apellidO2: 'Silva',
        fechA_NACIMIENTO: '1983-12-02'
      }
    ]
  },
  {
    iD_INICIATIVA: 6,
    titulo: 'Aplicación para la Movilidad Sostenible',
    horas: 30,
    fecha_INICIO: '2025-02-01',
    fecha_FIN: '2025-05-01',
    descripcion: 'Desarrollo de app móvil para incentivar el uso de transporte público',
    tipo: 'Desarrollo',
    productO_FINAL: 'Aplicación móvil',
    nueva: false,
    difusion: 'Presentación pública',
    iD_ASIGNATURAs: [
      {
        iD_ASIGNATURA: 7,
        iD_CURSO: 6,
        nombrE_CURSO: 'Tecnología Social',
        nombre: 'Aplicaciones para el Bien Común'
      }
    ],
    iD_ENTIDADs: [
      {
        iD_ENTIDAD: 6,
        nombre: 'Movilidad Verde',
        descripcion: 'Start-up para movilidad urbana sostenible'
      }
    ],
    iD_METAs: [
      {
        iD_META: 7,
        iD_ODS: 9,
        nombrE_ODS: 'Industria, innovación e infraestructura',
        descripcioN_ODS: 'Construir infraestructuras resilientes, promover la industrialización sostenible',
        dimensioN_ODS: 'Económica',
        descripcioN_META: 'Fomentar innovación para ciudades verdes'
      }
    ],
    iD_PROFESORs: [
      {
        iD_PROFESOR: 7,
        nombre: 'Carlos',
        apellidO1: 'Vega',
        apellidO2: 'Ortiz',
        fechA_NACIMIENTO: '1987-09-10'
      }
    ]
  },
  {
    iD_INICIATIVA: 7,
    titulo: 'Documental sobre Cambio Climático',
    horas: 12,
    fecha_INICIO: '2025-08-01',
    fecha_FIN: '2025-08-20',
    descripcion: 'Creación de un documental participativo sobre el cambio climático local',
    tipo: 'Producción audiovisual',
    productO_FINAL: 'Documental',
    nueva: true,
    difusion: 'YouTube',
    iD_ASIGNATURAs: [
      {
        iD_ASIGNATURA: 8,
        iD_CURSO: 7,
        nombrE_CURSO: 'Comunicación Ambiental',
        nombre: 'Medios y Medio Ambiente'
      }
    ],
    iD_ENTIDADs: [
      {
        iD_ENTIDAD: 7,
        nombre: 'Clima Ahora',
        descripcion: 'Colectivo de concienciación climática'
      }
    ],
    iD_METAs: [
      {
        iD_META: 8,
        iD_ODS: 13,
        nombrE_ODS: 'Acción por el clima',
        descripcioN_ODS: 'Adoptar medidas urgentes para combatir el cambio climático',
        dimensioN_ODS: 'Ambiental',
        descripcioN_META: 'Difundir conocimiento sobre el cambio climático'
      }
    ],
    iD_PROFESORs: [
      {
        iD_PROFESOR: 8,
        nombre: 'Fernando',
        apellidO1: 'López',
        apellidO2: 'Salas',
        fechA_NACIMIENTO: '1982-04-14'
      }
    ]
  },
  {
    iD_INICIATIVA: 8,
    titulo: 'Programa de Lectura Infantil',
    horas: 18,
    fecha_INICIO: '2025-04-20',
    fecha_FIN: '2025-05-20',
    descripcion: 'Actividades de lectura y cuentacuentos en escuelas primarias',
    tipo: 'Programa',
    productO_FINAL: 'Cuadernillo de cuentos',
    nueva: false,
    difusion: 'Periódico escolar',
    iD_ASIGNATURAs: [
      {
        iD_ASIGNATURA: 9,
        iD_CURSO: 8,
        nombrE_CURSO: 'Educación Inicial',
        nombre: 'Literatura Infantil'
      }
    ],
    iD_ENTIDADs: [
      {
        iD_ENTIDAD: 8,
        nombre: 'Biblioteca Comunitaria',
        descripcion: 'Espacio de fomento lector en zonas vulnerables'
      }
    ],
    iD_METAs: [
      {
        iD_META: 9,
        iD_ODS: 4,
        nombrE_ODS: 'Educación de calidad',
        descripcioN_ODS: 'Garantizar una educación inclusiva, equitativa y de calidad',
        dimensioN_ODS: 'Social',
        descripcioN_META: 'Mejorar comprensión lectora infantil'
      }
    ],
    iD_PROFESORs: [
      {
        iD_PROFESOR: 9,
        nombre: 'Laura',
        apellidO1: 'Molina',
        apellidO2: 'Castro',
        fechA_NACIMIENTO: '1992-01-25'
      }
    ]
  }
];
