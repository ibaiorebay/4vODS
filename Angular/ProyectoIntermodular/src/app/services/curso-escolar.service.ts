import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CursoEscolar } from '../models/curso-escolar';

@Injectable({
  providedIn: 'root'
})
export class CursoEscolarService {

  private apiUrl = 'http://localhost:5115/api';
    
  constructor(private http: HttpClient) {
    
  }

  getCursosEscolares(): Observable<CursoEscolar[]> {
    return this.http.get<CursoEscolar[]>(this.apiUrl + "/CursoEscolar").pipe(
      map(data => data.map(item => this.mapToCursoEscolar(item))) 
    );
  }

  private mapToCursoEscolar(data: any): CursoEscolar {
    const cursoEscolar = new CursoEscolar(
      data.descripcion,
      data.iD_CURSOESCOLAR
    );
    return cursoEscolar;
  }

  // Crear una nueva CursoEscolar
  createCursoEscolar(cursoEscolar: CursoEscolar): Observable<CursoEscolar> {
    return this.http.post<CursoEscolar>(this.apiUrl + "/CursoEscolar", cursoEscolar).pipe(
      tap(res => console.log('Respuesta del backend:', res))
    );
  }

  // Actualizar una CursoEscolar
  updateCursoEscolar(id: number, cursoEscolar: CursoEscolar): Observable<CursoEscolar> {
    return this.http.put<CursoEscolar>(`${this.apiUrl}/CursoEscolar/${id}`, cursoEscolar);
  }

  // Eliminar una CursoEscolar
  deleteCursoEscolar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/CursoEscolar/${id}`);
  }
}
