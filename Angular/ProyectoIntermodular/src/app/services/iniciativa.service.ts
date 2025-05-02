import { Injectable } from '@angular/core';
import { Iniciativa } from '../models/iniciativa';
import { Meta } from '../models/meta';
import { EntidadExterior } from '../models/entidad-exterior';
import { Profesor } from '../models/profesor';
import { Asignatura } from '../models/asignatura';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Curso } from '../models/curso';
import { ProfesorDTO } from '../models/profesor-dto';
import { AsignaturaDTO } from '../models/asignatura-dto';
import { OdsDTO } from '../models/ods-dto';
import { MetaDTO } from '../models/meta-dto';
import { CursoEscolar } from '../models/curso-escolar';


@Injectable({
  providedIn: 'root'
})
export class IniciativaService {
  
  private apiUrl = 'http://localhost:5115/api';
  constructor(private http: HttpClient) { 
    
  }
  
  getIniciativas(): Observable<Iniciativa[]> {
    return this.http.get<any[]>(this.apiUrl + "/iniciativas").pipe(
      map(data => data.map(item => this.mapToIniciativa(item)))  // Aquí mapeamos la respuesta a instancias de Iniciativa
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

  getCursosEscolares(): Observable<CursoEscolar[]> {
    return this.http.get<CursoEscolar[]>(this.apiUrl + "/CursoEscolar").pipe(
      map(data => data.map(item => this.mapToCursoEscolar(item))) 
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
      data.iD_ENTIDADs.length > 0 ? data.iD_ENTIDADs.map((entidadData: any) => new EntidadExterior(entidadData.nombre, entidadData.descripcion, entidadData.iD_ENTIDAD,)) : [],
      data.iD_PROFESORs.length > 0 ? data.iD_PROFESORs.map((profesorData: any) => new Profesor(
          profesorData.iD_PROFESOR,
          profesorData.nombre,
          profesorData.apellidO1,
          profesorData.apellid02 ?? "",
          profesorData.fechA_NACIMIENTO
      )) : [],
      data.iD_METAs.length > 0 ? data.iD_METAs.map((metaData: any) => new Meta(
        metaData.iD_ODS,
        metaData.iD_META,
        metaData.nombrE_ODS,
        metaData.descripcioN_ODS,
        metaData.dimensioN_ODS,
        metaData.descripcioN_META
      )) : [],
      data.cursoescolar
    );

    return iniciativa;
  }

  private mapToAsignaturaDTO(data: any): AsignaturaDTO {
    const asignatura = new AsignaturaDTO(
      data.iD_CURSO,
      data.nombre,
      data.iD_ASIGNATURA
    );
    return asignatura;
  }

  private mapToCurso(data: any): Curso {
    const curso = new Curso(
      data.iD_CURSO,
      data.nombrecurso
    );
    return curso;
  }

  private mapToMetaDTO(data: any): MetaDTO {
    const meta = new MetaDTO(
      data.iD_META,
      data.iD_ODS,
      data.descripcion
    );
    return meta;
  }

  private mapToOds(data: any): OdsDTO {
    const ods = new OdsDTO(
      data.iD_ODS,
      data.nombre
    );
    return ods;
  }

  private mapToProfesorDTO(data: any): ProfesorDTO {
    const profesor = new ProfesorDTO(
      data.iD_Profesor,
      data.nombre
    );
    return profesor;
  }

  private mapToEntidadExterior(data: any): EntidadExterior {
    const entidadExterior = new EntidadExterior(
      data.nombre,
      data.descripcion,
      data.iD_ENTIDAD
    );
    return entidadExterior;
  }

  private mapToCursoEscolar(data: any): CursoEscolar {
    const cursoEscolar = new CursoEscolar(
      data.descripcion,
      data.iD_CURSOESCOLAR
    );
    return cursoEscolar;
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
