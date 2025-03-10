import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciativaService } from '../../services/iniciativa.service';
import { Iniciativa } from '../../models/iniciativa';
import { Asignatura } from '../../models/asignatura';
import { Meta } from '../../models/meta';
import { EntidadExterior } from '../../models/entidad-exterior';


@Component({
  selector: 'app-main-initiatives-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-initiatives-info.component.html',
  styleUrl: './main-initiatives-info.component.scss'
})
export class MainInitiativesInfoComponent {
  iniciativas: Iniciativa[]=[];
  isDropdownOpen = false; // Estado del menú desplegable
  
  constructor(private iniciativaService: IniciativaService) {
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Alternar el estado del menú
  }

  obtenerNombresCursos(asignaturas: Asignatura[]): string {
    const repetidos: string[] = [];
    const result = asignaturas && asignaturas.length > 0
      ? asignaturas.map(asignatura => asignatura.getNombreCurso).filter(curso => {
        if (repetidos.includes(curso)) {
          return false;
        } else {
          repetidos.push(curso);
          return true;
        }
      }).join(', ')
      : 'Sin Asignaturas';
    // let result = asignaturas && asignaturas.length > 0
    //   ? asignaturas.filter(asignatura => ).map(asignatura => asignatura.getNombreCurso).join(', ')
    //   : 'Sin Asignaturas';

    return result;
  }

  obtenerModulosYCursos(asignaturas: Asignatura[]): string {
    let result = asignaturas && asignaturas.length > 0
      ? asignaturas.map(asignatura => `${asignatura.getNombreAsignatura} de ${asignatura.getNombreCurso}`).join(', ')
      : 'Sin Asignaturas';
    
    return result;
  }

  obtenerODS(metas: Meta[]): string {
    const odsRepetidos: number[] = [];
    const result = metas.map(metas => metas.NumeroOds).filter(numeroOds => {
        if (odsRepetidos.includes(numeroOds)) {
          return false;
        } else {
          odsRepetidos.push(numeroOds);
          return true;
        }
      }).join(', ');

    return result;
  }

  obtenerMetas(metas: Meta[]): string {
    let result = metas.map(meta => `${meta.NumeroOds}.${meta.CaracterMeta}`).join(', ');
    return result;
  }

  obtenerEntidades(EntidadesExteriores: EntidadExterior[]): String {
    let result = EntidadesExteriores.map(entidadExt => entidadExt.Nombre).join(', ');
    return result;
  }

  ngOnInit(): void {
    this.iniciativas = this.iniciativaService.Iniciativas;
  }

  edit() {
    console.log("Editando tarjeta");
  }

  delete(id: number) {
    console.log("Borrando tarjeta con id: " + id);
    this.iniciativaService.deleteIniciativaById(Number(id));
    this.iniciativas = this.iniciativaService.Iniciativas;
  }

} 