import { Injectable } from '@angular/core';
import { Iniciativa } from '../models/iniciativa';
import { Meta } from '../models/meta';
import { EntidadExterior } from '../models/entidad-exterior';
import { Profesor } from '../models/profesor';
import { Asignatura } from '../models/asignatura';


@Injectable({
  providedIn: 'root'
})
export class IniciativaService {

  metas : Meta[] = [
    new Meta(4, "7", "Garantizar que todos los alumnos adquieran los conocimientos teóricos y prácticos necesarios para promover el desarrollo sostenible."),
    new Meta(11, "6", "Reducir la contaminación y la generación de residuos."),
    new Meta(12, "0", "Fomentar la adopción de prácticas sostenibles."),];

  iniciativas : Iniciativa[] = [

    new Iniciativa(1, 100, "Reciclaje Inteligente en Madrid","Descripcion1", new Date("2024-09-15"), new Date("2025-06-20"), [this.metas[1]], [new EntidadExterior(1,"hola", "Chao")], [new Profesor(1,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(1, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(2, 200, "Inclusión digital en zonas rurales", "Descripción2", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[2]], [new EntidadExterior(2,"hola", "Chao")], [new Profesor(2,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(2, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(3, 300, "Proyecto 3","Descripcion 3", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(3,"hola", "Chao")], [new Profesor(3,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(3, "DAM", "Desarrollo de Aplicaciones Multiplataforma")])
  ];
  
  get Iniciativas(): Iniciativa[] {
    return this.iniciativas;
  }

  deleteIniciativaById(id: number): void {
    console.log(id);
    this.iniciativas = this.iniciativas.filter(iniciativa => iniciativa.Id !== Number(id));
  }

  constructor() { 
    
  }
}
