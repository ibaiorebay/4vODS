import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfesorDTO } from '../models/profesor-dto';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private apiUrl = 'http://localhost:5115/api';

  constructor(private http: HttpClient) { 
    
  }

  getProfesores(): Observable<ProfesorDTO[]> {
    return this.http.get<any[]>(this.apiUrl + "/profesores").pipe(
      map(data => data.map(item => this.mapToProfesorDTO(item)))  // Aquí mapeamos la respuesta a instancias de Iniciativa
    );
  }

  private mapToProfesorDTO(data: any): ProfesorDTO {
    const profesor = new ProfesorDTO(
      data.iD_Profesor,
      data.nombre
    );
    return profesor;
  }
  

  // Obtener una Profesor por ID
  getProfesorById(id: number): Observable<ProfesorDTO> {
    return this.http.get<ProfesorDTO>(`${this.apiUrl}/Profesores/${id}`).pipe(
      map(data => this.mapToProfesorDTO(data))  // Aquí mapeamos la respuesta a una instancia de ProfesorDTO
    );
  }

  // Crear una nueva Profesor
  createProfesor(iniciativa: any): Observable<ProfesorDTO> {
    return this.http.post<any>(this.apiUrl + "/Profesores", iniciativa).pipe(
      tap(res => console.log('Respuesta del backend:', res))
    );
  }

  // Actualizar una Profesor
  updateProfesor(id: number, iniciativa: any): Observable<ProfesorDTO> {
    return this.http.put<any>(`${this.apiUrl}/Profesores/${id}`, iniciativa);
  }

  // Eliminar un Profesor
  deleteProfesor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Profesores/${id}`);
  }

  deleteProfesorById(id: number): void {
    console.log(id);
    this.http.delete(`${this.apiUrl}/Profesores/${id}`);
  }
}
