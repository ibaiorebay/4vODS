import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntidadExterior } from '../models/entidad-exterior';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntidadExteriorService {

   private apiUrl = 'http://localhost:5115/api';
  
    constructor(private http: HttpClient) { 
      
    }
  
    getEntidadesExt(): Observable<EntidadExterior[]> {
      return this.http.get<any[]>(this.apiUrl + "/entidades").pipe(
        map(data => data.map(item => this.mapToEntidadExterior(item)))  // Aquí mapeamos la respuesta a instancias de Iniciativa
      );
    }
  
    private mapToEntidadExterior(data: any): EntidadExterior {
      const entidadExterior = new EntidadExterior(
        data.iD_ENTIDAD,
        data.nombre,
        data.descripcion
      );
      return entidadExterior;
    }

    // Crear una nueva Entidad Exterior
    createEntidadExt(entidadExt: any): Observable<any> {
      return this.http.post<any>(this.apiUrl + "/entidades", entidadExt).pipe(
        tap(res => console.log('Respuesta del backend:', res))
      );
    }
  
    // Actualizar una Entidad Exterior
    updateEntidadExt(id: number, entidadExt: EntidadExterior): Observable<EntidadExterior> {
      return this.http.put<EntidadExterior>(`${this.apiUrl}/entidades/${id}`, entidadExt);
    }
  
    // Eliminar una Entidad Exterior
    deleteEntidadExt(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/entidades/${id}`);
    }
}
