import { Injectable } from '@angular/core';
import { Iniciativa } from '../models/iniciativa';
import { Meta } from '../models/meta';
import { EntidadExterior } from '../models/entidad-exterior';
import { Profesor } from '../models/profesor';
import { Asignatura } from '../models/asignatura';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IniciativaService {

  metas: Meta[] = [
    // new Meta(4, 7, "Garantizar que todos los alumnos adquieran los conocimientos teóricos y prácticos necesarios para promover el desarrollo sostenible."),
    // new Meta(11, 6, "Reducir la contaminación y la generación de residuos."),
    // new Meta(12, 0, "Fomentar la adopción de prácticas sostenibles."),
    // new Meta(1, 1, "Erradicar la pobreza extrema para todas las personas en el mundo."),
    // new Meta(2, 2, "Poner fin al hambre y garantizar el acceso a una alimentación segura y nutritiva."),
    // new Meta(3, 4, "Reducir en un tercio la mortalidad prematura por enfermedades no transmisibles."),
    // new Meta(5, 5, "Asegurar la participación plena y efectiva de las mujeres y la igualdad de oportunidades de liderazgo."),
    // new Meta(6, 1, "Lograr el acceso universal y equitativo al agua potable a un precio asequible."),
    // new Meta(7, 2, "Aumentar considerablemente la proporción de energía renovable en el conjunto de fuentes energéticas."),
    // new Meta(8, 3, "Promover políticas que apoyen el crecimiento económico sostenido y el trabajo decente."),
    // new Meta(9, 4, "Modernizar la infraestructura y reconvertir las industrias para que sean sostenibles."),
    // new Meta(10, 2, "Potenciar y promover la inclusión social, económica y política de todas las personas."),
    // new Meta(13, 1, "Fortalecer la resiliencia y la capacidad de adaptación a los riesgos relacionados con el clima."),
    // new Meta(14, 1, "Prevenir y reducir significativamente la contaminación marina de todo tipo."),
    // new Meta(15, 2, "Promover la gestión sostenible de todos los tipos de bosques."),
    // new Meta(16, 3, "Promover el estado de derecho y garantizar la igualdad de acceso a la justicia."),
    // new Meta(17, 1, "Fortalecer la movilización de recursos internos para mejorar la capacidad nacional."),
  ];

  iniciativas : Iniciativa[] = [

    // new Iniciativa(1, "Charla/Taller", 1, 100, "Reciclaje Inteligente en Madrid","Reciclaje Inteligente en Madrid optimiza la gestión de residuos con tecnología, promoviendo un reciclaje eficiente y sostenible. ♻️", "2024-09-15", "2025-06-20", [this.metas[1]], [new EntidadExterior(1,"Alboan", "Descripcion de alboan blablabala"), new EntidadExterior(1,"Cistek", "Descripcion de cistek blablabala")], [new Profesor(1,"Miguel", "Goyena", "Muñoz", "1999-02-02")], [new Asignatura(1, "2ºDAM", "DI"), new Asignatura(1, "SMR", "Acc.Datos")]),
    // new Iniciativa(2, "Salida", 1, 200, "Inclusión digital en zonas rurales", "Descripción2", "2024-11-01", "2025-04-30", [this.metas[2]], [new EntidadExterior(2,"hola", "Chao")], [new Profesor(2,"David", "Noya", "Noya", "1999-02-02")], [new Asignatura(2, "DAM", "Programacion")]),
    // new Iniciativa(3, "Acciones Internas", 0, 300, "Proyecto 3","Descripcion 3", "2024-11-01", "2025-04-30", [this.metas[0]], [new EntidadExterior(3,"hola", "Chao")], [new Profesor(3,"Maria", "Viña", "Viña", "1999-02-02")], [new Asignatura(3, "DAW", "Desarrollo de Aplicaciones Multiplataforma")]),
    // new Iniciativa(4, "Proyecto", 0, 400, "Proyecto 4","Descripcion 4", "2024-11-01", "2025-04-30", [this.metas[0]], [new EntidadExterior(4,"hola", "Chao")], [new Profesor(4,"Iban", "Sierra", "Sierra", "1999-02-02")], [new Asignatura(4, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    // new Iniciativa(5, "Otros", true, 100, "Proyecto 5","Descripcion 5", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(5,"hola", "Chao")], [new Profesor(5,"Arantxa", "Church", "Church", new Date("1999-02-02"))], [new Asignatura(5, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    // new Iniciativa(6, "Proyecto", false, 600, "Proyecto 6","Descripcion 6", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(6,"hola", "Chao")], [new Profesor(6,"Amaya", "Peralta", "Peralta", new Date("1999-02-02"))], [new Asignatura(6, "ASIR", "Desarrollo de Aplicaciones Multiplataforma")]),
    // new Iniciativa(7, "Salida", false, 700, "Proyecto 7","Descripcion 7", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(7,"hola", "Chao")], [new Profesor(7,"Luis", "Juez", "Juez", new Date("1999-02-02"))], [new Asignatura(7, "DUAL", "Desarrollo de Aplicaciones Multiplataforma")]),
    // new Iniciativa(8, "Charla/Taller", true, 800, "Proyecto 8","Descripcion 8", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(8,"hola", "Chao")], [new Profesor(8,"Javier", "Milei", "Milei", new Date("1999-02-02"))], [new Asignatura(8, "DUAL", "Desarrollo de Aplicaciones Multiplataforma")]),
    // new Iniciativa(9, "Acciones Internas", true, 900, "Proyecto 9","Descripcion 9", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(9,"hola", "Chao")], [new Profesor(9,"Leo", "Messi", "Messi", new Date("1999-02-02"))], [new Asignatura(9, "SMR", "Desarrollo de Aplicaciones Multiplataforma")]),
    // new Iniciativa(10, "Otros", false, 1000, "Proyecto 10","Descripcion 10", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(10,"hola", "Chao")], [new Profesor(10,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(10, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    // new Iniciativa(11, "Proyecto", true, 1100, "Proyecto 11","Descripcion 11", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(11,"hola", "Chao")], [new Profesor(11,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(11, "DAW", "Desarrollo de Aplicaciones Multiplataforma")]),
    // new Iniciativa(12, "Proyecto", false, 1200, "Proyecto 12","Descripcion 12", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(12,"hola", "Chao")], [new Profesor(12,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(12, "ASIR", "Desarrollo de Aplicaciones Multiplataforma")]),
  ];
  
  get Iniciativas(): Iniciativa[] {
    return this.iniciativas;
  }

  private entidadesExternas: string[] = [
    "Entidad A", 
    "Entidad B", 
    "Entidad C", 
    "Entidad D", 
    "Entidad E", 
    "Entidad F", 
    "Entidad G", 
    "Entidad H", 
    "Entidad I", 
    "Entidad J"
  ];
  
  get EntidadesExternas(): string[] {
    return this.entidadesExternas;
  }
  

  private cursos: string[] = ["DAM", "DAW", "SMR", "ASIR", "DAI", "DUAL", "FPB", "CFGS", "CFGM", "Bachillerato", "ESO", "Primaria", "Infantil", "Otros"];

  get Cursos(): string[] {
    return this.cursos;
  }

  private profesores: string[] = ["Miguel Goyena Muñoz", "David Noya Noya", "Maria Viña Viña", "Iban Sierra Sierra", "Arantxa Church Church", "Amaya Peralta Peralta", "Luis Juez Juez", "Javier Milei Milei", "Leo Messi Messi", "El Dibu", "ESO", "Primaria", "Infantil", "Otros"];

  get Profesores(): string[] {
    return this.profesores;
  }

  private asignaturasAbreviadas = [
    "DAM", "Acc.Datos", "ASIR", "BD", "P", "LMSGI", "ED", "SI", "AD", "DI", "EIE", "FOL", "PF", "FCT", 
    "DAM", "PSP", "PMD", "DWEC", "DWES", "DAW", "DIW", "ASO", "PAR", "SAD", "IA", "BIGDATA", "AI"
  ];

  get Asignaturas(): string[] {
    return this.asignaturasAbreviadas;
  }

  private ods = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
  
  get Ods(): string[] {
    return this.ods;
  }  
  

  private metasODS = {
    "1": ["1.1", "1.2", "1.3", "1.4", "1.5"],
    "2": ["2.1", "2.2", "2.3", "2.4", "2.5"],
    "3": ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8", "3.9", "3.a", "3.b", "3.c"],
    "4": ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.a", "4.b", "4.c"],
    "5": ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6"],
    "6": ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.a", "6.b"],
    "7": ["7.1", "7.2", "7.3", "7.a", "7.b"],
    "8": ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8", "8.9", "8.a", "8.b"],
    "9": ["9.1", "9.2", "9.3", "9.4", "9.5", "9.a", "9.b"],
    "10": ["10.1", "10.2", "10.3", "10.4", "10.5", "10.6", "10.7", "10.a", "10.b", "10.c"],
    "11": ["11.1", "11.2", "11.3", "11.4", "11.5", "11.6", "11.7", "11.a", "11.b", "11.c"],
    "12": ["12.1", "12.2", "12.3", "12.4", "12.5", "12.6", "12.7", "12.a", "12.b", "12.c"],
    "13": ["13.1", "13.2", "13.3", "13.a", "13.b"],
    "14": ["14.1", "14.2", "14.3", "14.4", "14.5", "14.6", "14.7", "14.a", "14.b", "14.c"],
    "15": ["15.1", "15.2", "15.3", "15.4", "15.5", "15.6", "15.a", "15.b", "15.c"],
    "16": ["16.1", "16.2", "16.3", "16.4", "16.5", "16.6", "16.7", "16.8", "16.9", "16.a", "16.b"],
    "17": ["17.1", "17.2", "17.3", "17.4", "17.5", "17.6", "17.7", "17.8", "17.9", "17.a", "17.b", "17.c"]
  };
  
  get MetasOds(): any {
    return this.metasODS;
  } 

  deleteIniciativaById(id: number): void {
    console.log(id);
    this.iniciativas = this.iniciativas.filter(iniciativa => iniciativa.Id !== Number(id));
  }

  
  
  private apiUrl = 'http://localhost:5115/api/iniciativas';
  constructor(private http: HttpClient) { 
    
  }

  // Obtener todas las iniciativas
  getIniciativas(): Observable<Iniciativa[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => this.mapToIniciativa(item)))  // Aquí mapeamos la respuesta a instancias de `Iniciativa`
    );
  }

  datosMock: any = [
    {
      "iD_INICIATIVA": 1,
      "titulo": "Banco de Alimentos",
      "horas": 50,
      "fechA_INICIO": "01-03-2024",
      "fechA_FIN": "01-06-2024",
      "descripcion": "Iniciativa para recolectar alimentos para comunidades vulnerables.",
      "tipo": "Proyecto",
      "productO_FINAL": "Reporte de impacto",
      "nueva": true,
      "difusion": "Redes sociales y prensa",
      "iD_ASIGNATURAs": [
        {
          "iD_ASIGNATURA": 1,
          "iD_CURSO": 1,
          "nombre": "Biología"
        }
      ],
      "iD_ENTIDADs": [
        {
          "iD_ENTIDAD": 1,
          "nombre": "Cruz Roja",
          "descripcion": "Organización humanitaria internacional."
        },
        {
          "iD_ENTIDAD": 2,
          "nombre": "Banco de Alimentos",
          "descripcion": "Organización para la recolección y distribución de alimentos."
        }
      ],
      "iD_METAs": [
        {
          "iD_META": 2,
          "iD_ODS": 2,
          "descripcion": "Asegurar el acceso a alimentos seguros, nutritivos y suficientes."
        }
      ],
      "iD_PROFESORs": [
        {
          "iD_PROFESOR": 1,
          "nombre": "Carlos",
          "apellidO1": "Gómez",
          "apellidO2": "Pérez",
          "fechA_NACIMIENTO": "1980-05-20"
        }
      ]
    },
    {
      "iD_INICIATIVA": 2,
      "titulo": "Reciclaje de Plástico",
      "horas": 40,
      "fechA_INICIO": "01-04-2024",
      "fechA_FIN": "01-08-2024",
      "descripcion": "Proyecto para promover el reciclaje de plástico en la comunidad.",
      "tipo": "Taller",
      "productO_FINAL": "Informe de actividades",
      "nueva": true,
      "difusion": "Eventos comunitarios",
      "iD_ASIGNATURAs": [
        {
          "iD_ASIGNATURA": 2,
          "iD_CURSO": 1,
          "nombre": "Química"
        }
      ],
      "iD_ENTIDADs": [
        {
          "iD_ENTIDAD": 3,
          "nombre": "Fundación Reciclaje",
          "descripcion": "Fundación dedicada a la recolección y reciclaje de materiales."
        }
      ],
      "iD_METAs": [
        {
          "iD_META": 3,
          "iD_ODS": 12,
          "descripcion": "Garantizar patrones de consumo y producción sostenibles."
        }
      ],
      "iD_PROFESORs": [
        {
          "iD_PROFESOR": 2,
          "nombre": "Ana",
          "apellidO1": "Rodríguez",
          "apellidO2": "López",
          "fechA_NACIMIENTO": "1975-07-15"
        }
      ]
    },
    {
      "iD_INICIATIVA": 3,
      "titulo": "Protección Animal",
      "horas": 60,
      "fechA_INICIO": "01-05-2024",
      "fechA_FIN": "01-10-2024",
      "descripcion": "Iniciativa para rescatar animales en situación de abandono.",
      "tipo": "Otros",
      "productO_FINAL": "Informe de impacto",
      "nueva": true,
      "difusion": "Redes sociales",
      "iD_ASIGNATURAs": [
        {
          "iD_ASIGNATURA": 3,
          "iD_CURSO": 2,
          "nombre": "Ética"
        }
      ],
      "iD_ENTIDADs": [
        {
          "iD_ENTIDAD": 4,
          "nombre": "Asociación Animalista",
          "descripcion": "Organización que trabaja por la protección de los animales."
        }
      ],
      "iD_METAs": [
        {
          "iD_META": 4,
          "iD_ODS": 15,
          "descripcion": "Proteger, restaurar y promover el uso sostenible de los ecosistemas terrestres."
        }
      ],
      "iD_PROFESORs": [
        {
          "iD_PROFESOR": 3,
          "nombre": "Luis",
          "apellidO1": "Sánchez",
          "apellidO2": "Martín",
          "fechA_NACIMIENTO": "1985-10-22"
        }
      ]
    },
    {
      "iD_INICIATIVA": 4,
      "titulo": "Educación Ambiental",
      "horas": 30,
      "fechA_INICIO": "01-06-2024",
      "fechA_FIN": "01-09-2024",
      "descripcion": "Talleres educativos sobre sostenibilidad y cuidado del medio ambiente.",
      "tipo": "Salida",
      "productO_FINAL": "Material educativo",
      "nueva": true,
      "difusion": "Escuelas y redes sociales",
      "iD_ASIGNATURAs": [
        {
          "iD_ASIGNATURA": 4,
          "iD_CURSO": 1,
          "nombre": "Geografía"
        }
      ],
      "iD_ENTIDADs": [
        {
          "iD_ENTIDAD": 5,
          "nombre": "Greenpeace",
          "descripcion": "Organización internacional dedicada a la protección del medio ambiente."
        }
      ],
      "iD_METAs": [
        {
          "iD_META": 5,
          "iD_ODS": 4,
          "descripcion": "Garantizar una educación inclusiva, equitativa y de calidad."
        }
      ],
      "iD_PROFESORs": [
        {
          "iD_PROFESOR": 4,
          "nombre": "María",
          "apellidO1": "Torres",
          "apellidO2": "González",
          "fechA_NACIMIENTO": "1990-03-12"
        }
      ]
    },
    {
      "iD_INICIATIVA": 5,
      "titulo": "Agua Limpia para Todos",
      "horas": 80,
      "fechA_INICIO": "01-07-2024",
      "fechA_FIN": "01-12-2024",
      "descripcion": "Campaña para mejorar el acceso al agua potable en comunidades rurales.",
      "tipo": "Acciones Internas",
      "productO_FINAL": "Estudio de impacto social",
      "nueva": true,
      "difusion": "Eventos comunitarios y medios de comunicación",
      "iD_ASIGNATURAs": [
        {
          "iD_ASIGNATURA": 5,
          "iD_CURSO": 2,
          "nombre": "Ciencias Sociales"
        }
      ],
      "iD_ENTIDADs": [
        {
          "iD_ENTIDAD": 6,
          "nombre": "WaterAid",
          "descripcion": "ONG que trabaja por el acceso universal al agua potable."
        }
      ],
      "iD_METAs": [
        {
          "iD_META": 6,
          "iD_ODS": 6,
          "descripcion": "Garantizar el acceso de todas las personas al agua y al saneamiento."
        }
      ],
      "iD_PROFESORs": [
        {
          "iD_PROFESOR": 5,
          "nombre": "Fernando",
          "apellidO1": "Álvarez",
          "apellidO2": "Mendoza",
          "fechA_NACIMIENTO": "1972-09-30"
        }
      ]
    },
    {
      "iD_INICIATIVA": 6,
      "titulo": "Voluntariado Juvenil",
      "horas": 100,
      "fechA_INICIO": "01-08-2024",
      "fechA_FIN": "01-12-2024",
      "descripcion": "Programa para involucrar a jóvenes en proyectos comunitarios de impacto social.",
      "tipo": "Programa",
      "productO_FINAL": "Informe de progreso",
      "nueva": true,
      "difusion": "Redes sociales y charlas en escuelas",
      "iD_ASIGNATURAs": [
        {
          "iD_ASIGNATURA": 6,
          "iD_CURSO": 2,
          "nombre": "Cívica"
        }
      ],
      "iD_ENTIDADs": [
        {
          "iD_ENTIDAD": 7,
          "nombre": "Juventud Solidaria",
          "descripcion": "Organización que promueve la participación juvenil en proyectos sociales."
        }
      ],
      "iD_METAs": [
        {
          "iD_META": 7,
          "iD_ODS": 8,
          "descripcion": "Promover el crecimiento económico sostenido, inclusivo y sostenible."
        }
      ],
      "iD_PROFESORs": [
        {
          "iD_PROFESOR": 6,
          "nombre": "Javier",
          "apellidO1": "Ramírez",
          "apellidO2": "Hernández",
          "fechA_NACIMIENTO": "1988-11-25"
        }
      ]
    }
  ];

  getIniciativasMock(): any {
    return this.datosMock.map((item: any) => this.mapToIniciativa(item));
  }

  // Función para mapear un objeto de la API a una instancia de la clase `Iniciativa`
  private mapToIniciativa(data: any): Iniciativa {
    console.log(data);
    const iniciativa = new Iniciativa(
      data.iD_INICIATIVA,
      data.titulo,
      data.horas,
      data.fechA_INICIO,
      data.fechA_FIN,
      data.descripcion,
      data.tipo,
      data.productO_FINAL,
      data.nueva,
      data.difusion,
      data.iD_ASIGNATURAs.length > 0 ? data.iD_ASIGNATURAs.map((asignaturaData: any) => new Asignatura(
        asignaturaData.iD_ASIGNATURA,
        asignaturaData.iD_CURSO,
        asignaturaData.nombre
    )) : [],
      data.iD_ENTIDADs.length > 0 ? data.iD_ENTIDADs.map((entidadData: any) => new EntidadExterior(entidadData.iD_ENTIDAD, entidadData.nombre, entidadData.descripcion)) : [],
      data.iD_PROFESORs.length > 0 ? data.iD_PROFESORs.map((profesorData: any) => new Profesor(
          profesorData.iD_PROFESOR,
          profesorData.nombre,
          profesorData.apellidO1,
          profesorData.apellid02 ?? "",
          profesorData.fechA_NACIMIENTO
      )) : [],
      data.iD_METAs.length > 0 ? data.iD_METAs.map((metaData: any) => new Meta(
        metaData.iD_META,
        metaData.iD_ODS,
        metaData.descripcion
    )) : []
  );

  console.log(iniciativa);
  return iniciativa;
}


  // Obtener una iniciativa por ID
  getIniciativaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva iniciativa
  createIniciativa(iniciativa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, iniciativa);
  }

  // Actualizar una iniciativa
  updateIniciativa(id: number, iniciativa: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, iniciativa);
  }

  // Eliminar una iniciativa
  deleteIniciativa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
