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
    new Iniciativa(3, 300, "Proyecto 3","Descripcion 3", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(3,"hola", "Chao")], [new Profesor(3,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(3, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(4, 400, "Proyecto 4","Descripcion 4", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(4,"hola", "Chao")], [new Profesor(4,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(4, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(5, 500, "Proyecto 5","Descripcion 5", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(5,"hola", "Chao")], [new Profesor(5,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(5, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(6, 600, "Proyecto 6","Descripcion 6", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(6,"hola", "Chao")], [new Profesor(6,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(6, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(7, 700, "Proyecto 7","Descripcion 7", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(7,"hola", "Chao")], [new Profesor(7,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(7, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(8, 800, "Proyecto 8","Descripcion 8", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(8,"hola", "Chao")], [new Profesor(8,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(8, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(9, 900, "Proyecto 9","Descripcion 9", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(9,"hola", "Chao")], [new Profesor(9,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(9, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(10, 1000, "Proyecto 10","Descripcion 10", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(10,"hola", "Chao")], [new Profesor(10,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(10, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(11, 1100, "Proyecto 11","Descripcion 11", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(11,"hola", "Chao")], [new Profesor(11,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(11, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(12, 1200, "Proyecto 12","Descripcion 12", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(12,"hola", "Chao")], [new Profesor(12,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(12, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
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
