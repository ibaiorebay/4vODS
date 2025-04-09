import { Injectable } from '@angular/core';
import { Iniciativa } from '../models/iniciativa';
import { Meta } from '../models/meta';
import { EntidadExterior } from '../models/entidad-exterior';
import { Profesor } from '../models/profesor';
import { Asignatura } from '../models/asignatura';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Curso } from '../models/curso';
import { Ods } from '../models/ods';


@Injectable({
  providedIn: 'root'
})
export class IniciativaService {


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
    // this.iniciativas = this.iniciativas.filter(iniciativa => iniciativa.Id !== Number(id));
  }

  
  private apiUrl = 'http://localhost:5115/api';
  constructor(private http: HttpClient) { 
    
  }
  
  getIniciativas(): Observable<Iniciativa[]> {
    return this.http.get<any[]>(this.apiUrl + "/iniciativas").pipe(
      map(data => data.map(item => this.mapToIniciativa(item)))  // Aquí mapeamos la respuesta a instancias de Iniciativa
    );
  }

  // Obtener todas las asignaturas
  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<any[]>(this.apiUrl + "/Asignaturas").pipe(
      map(data => data.map(item => this.mapToAsignatura(item)))
    );
  }

  // Obtener todas los cursos
  getCursos(): Observable<Curso[]> {
    return this.http.get<any[]>(this.apiUrl + "/Cursos").pipe(
      map(data => data.map(item => this.mapToCurso(item)))
    );
  }

  // Obtener todas las metas
  getMetas(): Observable<Meta[]> {
    return this.http.get<any[]>(this.apiUrl + "/Metas").pipe(
      map(data => data.map(item => this.mapToMeta(item)))
    );
  }

  // Obtener todas las ods
  getOds(): Observable<Ods[]> {
    return this.http.get<any[]>(this.apiUrl + "/Ods").pipe(
      map(data => data.map(item => this.mapToOds(item)))
    );
  }
// Obtener todas las profs
  getProfesores(): Observable<Profesor[]> {
    return this.http.get<any[]>(this.apiUrl + "/Profesores").pipe(
      map(data => data.map(item => this.mapToProfesor(item)))
    );
  }

  // Obtener todas las entidsdes ext
  getEntidadesExt(): Observable<EntidadExterior[]> {
    return this.http.get<any[]>(this.apiUrl + "/entidades").pipe(
      map(data => data.map(item => this.mapToEntidadExterior(item)))
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
        metaData.descripcioN_ODS
      )) : []
    );

    return iniciativa;
  }

  private mapToAsignatura(data: any): Asignatura {
    console.log(data);

    const asignatura = new Asignatura(
      data.iD_ASIGNATURA,
      data.iD_CURSO,
      data.nombre
    );
    return asignatura;
  }

  private mapToCurso(data: any): Curso {
    console.log(data);

    const curso = new Curso(
      data.iD_CURSO,
      data.nombrecurso
    );
    return curso;
  }

  private mapToMeta(data: any): Meta {
    console.log(data);

    const meta = new Meta(
      data.iD_META,
      data.iD_ODS,
      data.descripcion
    );
    return meta;
  }

  private mapToOds(data: any): Ods {
    console.log(data);

    const ods = new Ods(
      data.iD_ODS,
      data.nombre
    );
    return ods;
  }

  private mapToProfesor(data: any): Profesor {
    console.log(data);

    const profesor = new Profesor(
      data.iD_Profesor,
      data.nombre
    );
    return profesor;
  }

  private mapToEntidadExterior(data: any): EntidadExterior {
    console.log(data);

    const entidadExterior = new EntidadExterior(
      data.iD_ENTIDAD,
      data.nombre,
      data.descripcion
    );
    return entidadExterior;
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
