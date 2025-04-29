import { Injectable } from '@angular/core';
import { Iniciativa } from '../models/iniciativa';
import { Meta } from '../models/meta';
import { EntidadExterior } from '../models/entidad-exterior';
import { Profesor } from '../models/profesor';
import { Asignatura } from '../models/asignatura';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Curso } from '../models/curso';
<<<<<<< HEAD
import { ProfesorDTO } from '../models/profesor-dto';
import { AsignaturaDTO } from '../models/asignatura-dto';
import { OdsDTO } from '../models/ods-dto';
import { MetaDTO } from '../models/meta-dto';
=======
import { Ods } from '../models/ods';
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6


@Injectable({
  providedIn: 'root'
})
export class IniciativaService {
<<<<<<< HEAD
=======


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

>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
  
  private apiUrl = 'http://localhost:5115/api';
  constructor(private http: HttpClient) { 
    
  }
  
  getIniciativas(): Observable<Iniciativa[]> {
    return this.http.get<any[]>(this.apiUrl + "/iniciativas").pipe(
      map(data => data.map(item => this.mapToIniciativa(item)))  // Aquí mapeamos la respuesta a instancias de Iniciativa
<<<<<<< HEAD
=======
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
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
    );
  }

  // Obtener todas las asignaturas
  getAsignaturas(): Observable<AsignaturaDTO[]> {
    return this.http.get<any[]>(this.apiUrl + "/Asignaturas").pipe(
      map(data => data.map(item => this.mapToAsignaturaDTO(item)))
    );
  }

  // Obtener todas los cursos
  getCursos(): Observable<Curso[]> {
    return this.http.get<any[]>(this.apiUrl + "/Cursos").pipe(
      map(data => data.map(item => this.mapToCurso(item)))
    );
  }

  // Obtener todas las metas
  getMetas(): Observable<MetaDTO[]> {
    return this.http.get<any[]>(this.apiUrl + "/Metas").pipe(
      map(data => data.map(item => this.mapToMetaDTO(item)))
    );
  }

  // Obtener todas las ods
  getOds(): Observable<OdsDTO[]> {
    return this.http.get<any[]>(this.apiUrl + "/Ods").pipe(
      map(data => data.map(item => this.mapToOds(item)))
    );
  }

  // Obtener todos los profesores, la api solo devuelve id y nombre
  getProfesores(): Observable<ProfesorDTO[]> {
    return this.http.get<any[]>(this.apiUrl + "/Profesores").pipe(
      map(data => data.map(item => this.mapToProfesorDTO(item)))
    );
  }

  // Obtener todas las entidsdes ext
  getEntidadesExt(): Observable<EntidadExterior[]> {
    return this.http.get<any[]>(this.apiUrl + "/entidades").pipe(
      map(data => data.map(item => this.mapToEntidadExterior(item)))
    );
  }



  // Función para mapear un objeto de la API a una instancia de la clase `Iniciativa`
  private mapToIniciativa(data: any): Iniciativa {
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
        asignaturaData.nombrE_CURSO,
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
        metaData.iD_ODS,
<<<<<<< HEAD
        metaData.iD_META,
        metaData.nombrE_ODS,
        metaData.descripcioN_ODS,
        metaData.dimensioN_ODS,
        metaData.descripcioN_META
=======
        metaData.descripcioN_ODS
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
      )) : []
    );

    return iniciativa;
  }

<<<<<<< HEAD
  private mapToAsignaturaDTO(data: any): AsignaturaDTO {
    const asignatura = new AsignaturaDTO(
=======
  private mapToAsignatura(data: any): Asignatura {
    console.log(data);

    const asignatura = new Asignatura(
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
      data.iD_ASIGNATURA,
      data.iD_CURSO,
      data.nombre
    );
    return asignatura;
  }

  private mapToCurso(data: any): Curso {
<<<<<<< HEAD
=======
    console.log(data);

>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
    const curso = new Curso(
      data.iD_CURSO,
      data.nombrecurso
    );
    return curso;
  }

<<<<<<< HEAD
  private mapToMetaDTO(data: any): MetaDTO {
    const meta = new MetaDTO(
=======
  private mapToMeta(data: any): Meta {
    console.log(data);

    const meta = new Meta(
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
      data.iD_META,
      data.iD_ODS,
      data.descripcion
    );
    return meta;
  }

<<<<<<< HEAD
  private mapToOds(data: any): OdsDTO {
    const ods = new OdsDTO(
=======
  private mapToOds(data: any): Ods {
    console.log(data);

    const ods = new Ods(
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
      data.iD_ODS,
      data.nombre
    );
    return ods;
  }

<<<<<<< HEAD
  private mapToProfesorDTO(data: any): ProfesorDTO {
    const profesor = new ProfesorDTO(
=======
  private mapToProfesor(data: any): Profesor {
    console.log(data);

    const profesor = new Profesor(
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
      data.iD_Profesor,
      data.nombre
    );
    return profesor;
  }

  private mapToEntidadExterior(data: any): EntidadExterior {
<<<<<<< HEAD
=======
    console.log(data);

>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
    const entidadExterior = new EntidadExterior(
      data.iD_ENTIDAD,
      data.nombre,
      data.descripcion
    );
    return entidadExterior;
  }


  // Obtener una iniciativa por ID
  getIniciativaById(id: number): Observable<Iniciativa> {
    return this.http.get<any>(`${this.apiUrl}/iniciativas/${id}`).pipe(
      map(data => this.mapToIniciativa(data))  // Aquí mapeamos la respuesta a una instancia de Iniciativa
    );
  }

  // Crear una nueva iniciativa
  createIniciativa(iniciativa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/iniciativas", iniciativa).pipe(
      tap(res => console.log('Respuesta del backend:', res))
    );
  }

  // Actualizar una iniciativa
  updateIniciativa(id: number, iniciativa: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/iniciativas/${id}`, iniciativa);
  }

  // Eliminar una iniciativa
  deleteIniciativa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/iniciativas/${id}`);
  }

  deleteIniciativaById(id: number): void {
    console.log(id);
    console.log(`localhost:5115/api/iniciativas/${id}`);
    this.http.delete(`${this.apiUrl}/iniciativas/${id}`);
  }
}
