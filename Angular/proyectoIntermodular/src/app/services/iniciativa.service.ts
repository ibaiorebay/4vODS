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

  metas: Meta[] = [
    new Meta(4, "7", "Garantizar que todos los alumnos adquieran los conocimientos teóricos y prácticos necesarios para promover el desarrollo sostenible."),
    new Meta(11, "6", "Reducir la contaminación y la generación de residuos."),
    new Meta(12, "0", "Fomentar la adopción de prácticas sostenibles."),
    new Meta(1, "1", "Erradicar la pobreza extrema para todas las personas en el mundo."),
    new Meta(2, "2", "Poner fin al hambre y garantizar el acceso a una alimentación segura y nutritiva."),
    new Meta(3, "4", "Reducir en un tercio la mortalidad prematura por enfermedades no transmisibles."),
    new Meta(5, "5", "Asegurar la participación plena y efectiva de las mujeres y la igualdad de oportunidades de liderazgo."),
    new Meta(6, "1", "Lograr el acceso universal y equitativo al agua potable a un precio asequible."),
    new Meta(7, "2", "Aumentar considerablemente la proporción de energía renovable en el conjunto de fuentes energéticas."),
    new Meta(8, "3", "Promover políticas que apoyen el crecimiento económico sostenido y el trabajo decente."),
    new Meta(9, "4", "Modernizar la infraestructura y reconvertir las industrias para que sean sostenibles."),
    new Meta(10, "2", "Potenciar y promover la inclusión social, económica y política de todas las personas."),
    new Meta(13, "1", "Fortalecer la resiliencia y la capacidad de adaptación a los riesgos relacionados con el clima."),
    new Meta(14, "1", "Prevenir y reducir significativamente la contaminación marina de todo tipo."),
    new Meta(15, "2", "Promover la gestión sostenible de todos los tipos de bosques."),
    new Meta(16, "3", "Promover el estado de derecho y garantizar la igualdad de acceso a la justicia."),
    new Meta(17, "1", "Fortalecer la movilización de recursos internos para mejorar la capacidad nacional."),
  ];

  iniciativas : Iniciativa[] = [

    new Iniciativa(1, "Charla/Taller", 100, "Reciclaje Inteligente en Madrid","Reciclaje Inteligente en Madrid optimiza la gestión de residuos con tecnología, promoviendo un reciclaje eficiente y sostenible. ♻️", new Date("2024-09-15"), new Date("2025-06-20"), [this.metas[1]], [new EntidadExterior(1,"Alboan", "Descripcion de alboan blablabala"), new EntidadExterior(1,"Cistek", "Descripcion de cistek blablabala")], [new Profesor(1,"Miguel", "Goyena", "apell2", new Date("1999-02-02"))], [new Asignatura(1, "2ºDAM", "DI"), new Asignatura(1, "2ºDAM", "Acc.Datos")]),
    new Iniciativa(2, "Salida", 200, "Inclusión digital en zonas rurales", "Descripción2", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[2]], [new EntidadExterior(2,"hola", "Chao")], [new Profesor(2,"David", "Noya", "apell2", new Date("1999-02-02"))], [new Asignatura(2, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(3, "Acciones Internas", 300, "Proyecto 3","Descripcion 3", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(3,"hola", "Chao")], [new Profesor(3,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(3, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(4, "Proyecto", 400, "Proyecto 4","Descripcion 4", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(4,"hola", "Chao")], [new Profesor(4,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(4, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(5, "Otros", 100, "Proyecto 5","Descripcion 5", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(5,"hola", "Chao")], [new Profesor(5,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(5, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(6, "Proyecto", 600, "Proyecto 6","Descripcion 6", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(6,"hola", "Chao")], [new Profesor(6,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(6, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(7, "Salida", 700, "Proyecto 7","Descripcion 7", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(7,"hola", "Chao")], [new Profesor(7,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(7, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(8, "Charla/Taller", 800, "Proyecto 8","Descripcion 8", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(8,"hola", "Chao")], [new Profesor(8,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(8, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(9, "Acciones Internas", 900, "Proyecto 9","Descripcion 9", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(9,"hola", "Chao")], [new Profesor(9,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(9, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(10, "Otros", 1000, "Proyecto 10","Descripcion 10", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(10,"hola", "Chao")], [new Profesor(10,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(10, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(11, "Proyecto", 1100, "Proyecto 11","Descripcion 11", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(11,"hola", "Chao")], [new Profesor(11,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(11, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
    new Iniciativa(12, "Proyecto", 1200, "Proyecto 12","Descripcion 12", new Date("2024-11-01"), new Date("2025-04-30"), [this.metas[0]], [new EntidadExterior(12,"hola", "Chao")], [new Profesor(12,"profe", "apell1", "apell2", new Date("1999-02-02"))], [new Asignatura(12, "DAM", "Desarrollo de Aplicaciones Multiplataforma")]),
  ];
  
  get Iniciativas(): Iniciativa[] {
    return this.iniciativas;
  }

  deleteIniciativaById(id: number): void {
    console.log(id);
    this.iniciativas = this.iniciativas.filter(iniciativa => iniciativa.Id !== Number(id));
  }

  filteredInitiatives: Iniciativa[] = [];
  filterInitiatives(selectedTypeInitiative: string): Iniciativa[] {

    if(selectedTypeInitiative === 'Todos') {
      this.filteredInitiatives = this.iniciativas;
    } else {
      this.filteredInitiatives = this.iniciativas.filter(initiative => {
        return initiative.tipoIniciativa == selectedTypeInitiative;
      });
    }
    return this.filteredInitiatives;
    // this.filteredInitiatives = this.iniciativas.filter(initiative => {
      // return (this.selectedTypeInitiative === 'Todos' || initiative.TipoIniciativa === this.selectedTypeInitiative);// &&
            //  (this.selectedGender === 'all' || pet.gender === this.selectedGender) &&
            //  (this.selectedSeason === 'all' || pet.season === this.selectedSeason);
  };
  

  constructor() { 
    
  }
}
