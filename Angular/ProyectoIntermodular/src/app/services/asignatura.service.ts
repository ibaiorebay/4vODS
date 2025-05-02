import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignaturaDTO } from '../models/asignatura-dto';
import { map, Observable, tap } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private apiUrl = 'http://localhost:5115/api';
  
    constructor(private http: HttpClient) {
      
    }
  
    getAsignaturas(): Observable<AsignaturaDTO[]> {
      return this.http.get<AsignaturaDTO[]>(this.apiUrl + "/Asignaturas").pipe(
        map(data => data.map(item => this.mapToAsignaturaDTO(item))) 
      );
    }

    // Obtener todas los cursos
    getCursos(): Observable<Curso[]> {
      return this.http.get<any[]>(this.apiUrl + "/Cursos").pipe(
        map(data => data.map(item => this.mapToCurso(item)))
      );
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
  
    // Crear una nueva Asignatura
    createAsignatura(asignatura: AsignaturaDTO): Observable<AsignaturaDTO> {
      return this.http.post<AsignaturaDTO>(this.apiUrl + "/Asignaturas", asignatura).pipe(
        tap(res => console.log('Respuesta del backend:', res))
      );
    }
  
    // Actualizar una Asignatura
    updateAsignatura(id: number, asignatura: AsignaturaDTO): Observable<AsignaturaDTO> {
      return this.http.put<AsignaturaDTO>(`${this.apiUrl}/Asignaturas/${id}`, asignatura);
    }
  
    // Eliminar una Asignatura
    deleteAsignatura(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/Asignaturas/${id}`);
    }
}
