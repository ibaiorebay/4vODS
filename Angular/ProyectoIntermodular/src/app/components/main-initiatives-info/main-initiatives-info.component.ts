import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciativaService } from '../../services/iniciativa.service';
import { Iniciativa } from '../../models/iniciativa';
import { Asignatura } from '../../models/asignatura';
import { Meta } from '../../models/meta';
import { EntidadExterior } from '../../models/entidad-exterior';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Curso } from '../../models/curso';
import { ProfesorDTO } from '../../models/profesor-dto';
import { AsignaturaDTO } from '../../models/asignatura-dto';
import { OdsDTO } from '../../models/ods-dto';
import { MetaDTO } from '../../models/meta-dto';
import { Profesor } from '../../models/profesor';


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
  isDropdownOpen = false;//Estado del menú desplegable de editar y eliminar

  cursosOpciones: Curso[] = [];
  profesoresOpciones: ProfesorDTO[] = [];
  asignaturasOpciones: AsignaturaDTO[] = [];
  odsOpciones: OdsDTO[] = [];
  todasLasMetasOpciones: MetaDTO[] = [];
  metasSegunOdsOpciones: MetaDTO[] = [];
  filtroInnovador = false;
  
  constructor(private iniciativaService: IniciativaService, private router: Router, private cd: ChangeDetectorRef) {
    
  }

  ngOnInit(): void {
    // Cargamos todas las iniciativas
    this.iniciativaService.getIniciativas().subscribe((data) => {
      this.iniciativas = data;
      this.iniciativasFiltradas = data;
      console.log(this.iniciativas);
    });

    this.iniciativaService.getAsignaturas().subscribe((asignaturas: any) => {
      console.log("Asignaturas recibidas:", asignaturas);
      this.asignaturasOpciones = asignaturas;
    });

    this.iniciativaService.getMetas().subscribe((metas: any) => {
      console.log("metas recibidas:", metas);
      this.todasLasMetasOpciones = metas;
    });

    this.iniciativaService.getCursos().subscribe((cursos: any) => {
      console.log("cursos recibidas:", cursos);
      this.cursosOpciones = cursos;
    });

    this.iniciativaService.getOds().subscribe((ods: OdsDTO[]) => {
      console.log("ods recibidas:", ods); 
      this.odsOpciones = ods;
    });

    this.iniciativaService.getProfesores().subscribe((profesores: any) => {
      console.log("profes recibidas:", profesores);
      this.profesoresOpciones = profesores;
    });

  }

  // Función para cerrar el modal.
  closeModal() {
    this.selectedIniciativaId = "0";
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
    this.selectedIniciativa = iniciativa;
    console.log(this.selectedIniciativa);
  }


  toggle() {
    this.filtroInnovador = !this.filtroInnovador;
    this.filtrarIniciativas();
  }

  obtenerNombreProfesores(profesores: Profesor[]): string {
    return profesores.map(profesor => profesor.Nombre).join(", ");
  }

  obtenerNombresCursos(asignaturas: Asignatura[]): string {
    const repetidos: string[] = [];

    const result2 = asignaturas.map(asignatura => {
      const cursoObj = this.cursosOpciones.find(curso => curso.Id == asignatura.IdCurso);

      if (!cursoObj || repetidos.includes(cursoObj.Nombre)) {
        return;
      }

      repetidos.push(cursoObj.Nombre);
      return cursoObj.Nombre;
    }).filter(Boolean).join(", ");//.filter(Boolean) Es una forma abreviada de decir: .filter(valor => Boolean(valor)) Filtrar (dejar pasar) solo los valores que sean "truthy", o sea, que no sean:undefined null false 0 '' (string vacío) NaN
        
    return result2;
  }

  obtenerModulosYCursos(asignaturas: Asignatura[]): string {
    let result = asignaturas && asignaturas.length > 0
      ? asignaturas.map(asignatura => `${asignatura.NombreAsignatura} de ${asignatura.NombreCurso}`).join(', ')
      : 'Sin Módulos/Asignaturas';
    
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
    let result = metas.map(meta => `${meta.NumeroOds}.${meta.NumeroMeta}`).join(', ');
    return result;
  }

  obtenerEntidades(EntidadesExteriores: EntidadExterior[]): String {
    let result = EntidadesExteriores.map(entidadExt => entidadExt.Nombre).join(', ');
    return result;
  }

  getDifusionIcons(difusiones: string[]): { url: string, icon: string, alt: string }[] {
    const redes = [
      { nombre: 'linkedin', icon: 'linkedin.svg', alt: 'linkedin-icon' },
      { nombre: 'facebook', icon: 'face.svg', alt: 'facebook-icon' },
      { nombre: 'twitter', icon: 'twitter-x.svg', alt: 'twitter-icon' },
      { nombre: 'instagram', icon: 'instagram.svg', alt: 'instagram-icon' }
    ];
  
    return difusiones.map(link => {
      const red = redes.find(r => link.toLowerCase().includes(r.nombre));
      return red
        ? { url: link, icon: `../../../assets/${red.icon}`, alt: red.alt }
        : { url: link, icon: '../../../assets/enlace.svg', alt: 'enlace-icon' }; // fallback genérico
    });
  }
  


  filtroTipoIniciativa: string = 'Todos';
  filtroTitulo: string = '';
  filtroCurso: string = 'Todos';
  filtroProfesor: string = 'Cualquiera';
  filtroAsignatura: string = 'Cualquiera';
  filtroOds: string = "0";
  filtroMeta: string = "0";
  filtroDimension: string = "Cualquiera";
  filtrarIniciativas(tipoIniciativa?: string) {

    // Filtrar metas segun el ODS seleccionado
    this.metasSegunOdsOpciones = this.todasLasMetasOpciones.filter(meta => meta.NumeroOds.toString() == this.filtroOds);

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
                            iniciativa.Asignaturas.some(asignatura => asignatura.NombreCurso === this.filtroCurso);
  
      // Filtrar por profesor dentro de Profesores
      const coincideProfesor = this.filtroProfesor === 'Cualquiera' || 
                               iniciativa.Profesores.some(profesor => profesor.Nombre === this.filtroProfesor);
                               console.log(this.filtroProfesor);
                               console.log(coincideProfesor);
                               console.log();
                               
      // Filtrar por profesor dentro de Profesores
      const coincideAsignatura = this.filtroAsignatura === 'Cualquiera' || 
                              iniciativa.Asignaturas.some(asignatura => asignatura.NombreAsignatura === this.filtroAsignatura);

      // Filtrar por numero de ods dentro de Metas
      const coincideOds = this.filtroOds === "0" || 
                              iniciativa.Metas.some(meta => meta.NumeroOds.toString() === this.filtroOds);

      // Filtrar por numero de meta dentro de cada ods
      // const coincideMeta = this.filtroOds === "0" || 
      //                         iniciativa.Metas.some(meta => `` === this.filtroMeta);

      //Filtrar por dimensión
      const coincideDimension = this.filtroDimension === "Cualquiera" ||
                                  iniciativa.Metas.some(meta => meta.DimensionODS.toLowerCase() === this.filtroDimension.toLowerCase())

      // Filtro por innovador (si el toggle está activado)
      const coincideInnovador = !this.filtroInnovador || iniciativa.EsInnovadora == 1;//antes true
  
      return coincideTipo && coincideTitulo && coincideCurso && coincideProfesor && coincideAsignatura && coincideOds && coincideDimension && coincideInnovador;
    });
  }


  
  edit(idIniciativaAEditar: number) {
    console.log("Editando tarjeta");
    this.router.navigate(['/initiatives-form', idIniciativaAEditar]);
  }

  delete(id: number) {
    console.log("Borrando tarjeta con id: " + id);
    this.iniciativaService.deleteIniciativa(id).subscribe(() => {
      this.iniciativas = this.iniciativas.filter(i => i.Id !== id);
      this.iniciativasFiltradas = this.iniciativasFiltradas.filter(i => i.Id !== id);
      this.cd.detectChanges();
    });
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
  limpiarFiltros(){
  this.filtroTipoIniciativa = 'Todos';
  this.filtroTitulo = '';
  this.filtroCurso = 'Todos';
  this.filtroProfesor = 'Cualquiera';
  this.filtroAsignatura = 'Cualquiera';
  this.filtroOds = "0";
  this.filtroMeta = "0";
  this.filtroDimension = "Cualquiera";
  this.filtrarIniciativas();
  if (this.filtroInnovador === true){
    document.getElementById("innovador")?.click();
  }
  }
} 