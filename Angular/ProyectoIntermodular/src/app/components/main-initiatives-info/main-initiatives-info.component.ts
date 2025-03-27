import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciativaService } from '../../services/iniciativa.service';
import { Iniciativa } from '../../models/iniciativa';
import { Asignatura } from '../../models/asignatura';
import { Meta } from '../../models/meta';
import { EntidadExterior } from '../../models/entidad-exterior';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-initiatives-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-initiatives-info.component.html',
  styleUrl: './main-initiatives-info.component.scss'
})
export class MainInitiativesInfoComponent {
  iniciativas: Iniciativa[] = [];
  iniciativasFiltradas: Iniciativa[] = [];
  isDropdownOpen = false; // Estado del menú desplegable
  cursos: string[] = [];
  profesores: string[] = [];
  asignaturas: string[] = [];
  ods: string[] = [];
  metasOds: any;
  filtroInnovador = false;
  
  constructor(private iniciativaService: IniciativaService, private router: Router) {
    
  }

  ngOnInit(): void {
    // Cargar todas las iniciativas
    // this.iniciativaService.getIniciativas().subscribe((data) => {
    //   this.iniciativas = data;
    //   this.iniciativasFiltradas = data;
    //   console.log(this.iniciativas);
    // });
    // this.iniciativas = this.iniciativaService.Iniciativas;


    this.iniciativas = this.iniciativaService.getIniciativasMock();
    this.iniciativasFiltradas = this.iniciativas;
    this.cursos = this.iniciativaService.Cursos;
    this.profesores = this.iniciativaService.Profesores;
    this.asignaturas = this.iniciativaService.Asignaturas;
    this.ods = this.iniciativaService.Ods;
    this.metasOds = this.iniciativaService.MetasOds;
  }


  openDropdownId: string | null = null;
  // Cambia el estado del dropdown según el id de la iniciativa
  toggleDropdown(id: string): void {
    this.openDropdownId = this.openDropdownId === id ? null : id;
  }


  // Mantén un objeto que controle qué dropdown está abierto
  selectedIniciativaId: string = "0";
  selectedIniciativa: any = null;
  
  // Función para manejar la apertura del modal con la iniciativa seleccionada.
  openModalDetailsCard(id: string, iniciativa: any) {
    this.selectedIniciativaId = id; 
    this.selectedIniciativa = iniciativa; // Establecemos los detalles de la iniciativa seleccionada.
    console.log(this.selectedIniciativa);
  }

  // Función para cerrar el modal.
  closeModal() {
    this.selectedIniciativaId = "0";
  }



  toggle() {
    this.filtroInnovador = !this.filtroInnovador;
    this.filtrarIniciativas();
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


  filtroTipoIniciativa: string = 'Todos';
  filtroTitulo: string = '';
  filtroCurso: string = 'Todos';
  filtroProfesor: string = 'Cualquiera';
  filtroAsignatura: string = 'Cualquiera';
  filtroOds: string = "0";
  filtroMeta: string = "0";
  filtrarIniciativas(tipoIniciativa?: string) {

    tipoIniciativa? this.filtroTipoIniciativa = tipoIniciativa : "Todos";

    this.iniciativasFiltradas = this.iniciativas.filter(iniciativa => {
      // Filtrar por tipo de iniciativa
      const coincideTipo = this.filtroTipoIniciativa === 'Todos' || 
                           iniciativa.TipoIniciativa === this.filtroTipoIniciativa;
  
      // Filtrar por título de iniciativa
      const coincideTitulo = this.filtroTitulo.trim() === '' || 
                              iniciativa.Titulo.toLowerCase().includes(this.filtroTitulo.toLowerCase());
  
      // Filtrar por curso dentro de Asignaturas
      const coincideCurso = this.filtroCurso === 'Todos' || 
                            iniciativa.Asignaturas.some(asignatura => asignatura.getNombreCurso === this.filtroCurso);
  
      // Filtrar por profesor dentro de Profesores
      const coincideProfesor = this.filtroProfesor === 'Cualquiera' || 
                               iniciativa.Profesores.some(profesor => profesor.NombreCompleto === this.filtroProfesor);
                               
      // Filtrar por profesor dentro de Profesores
      const coincideAsignatura = this.filtroAsignatura === 'Cualquiera' || 
                              iniciativa.Asignaturas.some(asignatura => asignatura.getNombreAsignatura === this.filtroAsignatura);

      // Filtrar por numero de ods dentro de Metas
      const coincideOds = this.filtroOds === "0" || 
                              iniciativa.Metas.some(meta => meta.NumeroOds.toString() === this.filtroOds);

      // Filtrar por numero de meta dentro de cada ods
      // const coincideMeta = this.filtroOds === "0" || 
      //                         iniciativa.Metas.some(meta => `` === this.filtroMeta);

      // Filtro por innovador (si el toggle está activado)
      const coincideInnovador = !this.filtroInnovador || iniciativa.EsInnovadora == 1;//antes true
  
      return coincideTipo && coincideTitulo && coincideCurso && coincideProfesor && coincideAsignatura && coincideOds && coincideInnovador;
    });
  }


  
  edit(iniciativaId: number) {
    console.log("Editando tarjeta");
    this.router.navigate(['/initiatives-form', iniciativaId]);
  }

  delete(id: number) {
    console.log("Borrando tarjeta con id: " + id);
    // this.iniciativaService.deleteIniciativaById(Number(id));
    // this.iniciativas = this.iniciativaService.Iniciativas;

    // this.iniciativasFiltradas = this.iniciativaService.deleteIniciativa(Number(id));
  }


  getBadgeClase(tipoIniciativa: string): string {

    switch (tipoIniciativa) {
      case 'Charla':
        return 'badge-charla';
        case 'Taller':
        return 'badge-taller';
      case 'Salida':
        return 'badge-salida';
      case 'Proyecto':
        return 'badge-proyecto';
      case 'Acciones Internas':
        return 'badge-acciones-internas';
      case 'Otros':
        return 'badge-otros';
      default:
        return 'badge';
    }
  }
} 