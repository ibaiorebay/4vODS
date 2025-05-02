import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IniciativaService } from '../../services/iniciativa.service';
import { Iniciativa } from '../../models/iniciativa';
import { ProfesorDTO } from '../../models/profesor-dto';
import { AsignaturaDTO } from '../../models/asignatura-dto';
import { EntidadExterior } from '../../models/entidad-exterior';
import { IniciativaDTO } from '../../models/iniciativa-dto';
import { OdsDTO } from '../../models/ods-dto';
import { MetaDTO } from '../../models/meta-dto';
import { CursoEscolar } from '../../models/curso-escolar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-initiatives-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './main-initiatives-form.component.html',
  styleUrl: './main-initiatives-form.component.scss'
})
export class MainInitiativesFormComponent implements OnInit {

  form!: FormGroup;
  idIniciativaAEditar: number | null = null;

  selectedAsignaturasIndex: number[] = [];
  selectedEntidadesExtIndex: number[] = [];
  selectedMetasIndex: number[] = [];
  selectedProfesoresIndex: number[] = [];

  asignaturasOptions: AsignaturaDTO[] = [];
  entidadesOptions: EntidadExterior[] = [];
  profesoresOptions: ProfesorDTO[] = [];//crisComment: uso profesor DTO porque la api solo devuelve nombre y id
  odsOpciones: OdsDTO[] = [];
  todasLasMetasOpciones: MetaDTO[] = [];
  metasSegunOdsOpciones: MetaDTO[] = [];
  cursosEscolaresOpciones: CursoEscolar[] = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private iniciativaService: IniciativaService, private router: Router) {

    this.iniciativaService.getAsignaturas().subscribe((asignaturas: any) => {
      console.log("Asignaturas recibidas:", asignaturas);
      this.asignaturasOptions = asignaturas;
    });

    this.iniciativaService.getEntidadesExt().subscribe((entidadesExt: any) => {
      console.log("entidades ext recibidas:", entidadesExt);
      this.entidadesOptions = entidadesExt;
    });

    this.iniciativaService.getProfesores().subscribe((profesores: ProfesorDTO[]) => {
      console.log("profes recibidas:", profesores);
      this.profesoresOptions = profesores;
    });

    this.iniciativaService.getOds().subscribe((ods: OdsDTO[]) => {
      console.log("ods recibidas:", ods); 
      this.odsOpciones = ods;
    });

    this.iniciativaService.getMetas().subscribe((metas: any) => {
      console.log("metas recibidas:", metas);
      this.todasLasMetasOpciones = metas;
    });

    this.iniciativaService.getCursosEscolares().subscribe((cursosEscolares: any) => {
      console.log("cursos escolares recibidos:", cursosEscolares);
      this.cursosEscolaresOpciones = cursosEscolares;
    });
    
  }


  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.idIniciativaAEditar = parseInt(idParam, 10);

      this.iniciativaService.getIniciativaById(this.idIniciativaAEditar).subscribe(
        (iniciativa) => {
          console.log('Iniciativa cargada:', iniciativa);
          this.crearFormulario(iniciativa);
        },
        (error) => {
          console.error('Error al obtener la iniciativa:', error);
          this.crearFormulario(); // En caso de error, creamos un formulario vacío
        }
      );
      
    } else {
      this.crearFormulario(); // Nuevo formulario sin datos
    }
  }

  private crearFormulario(iniciativa?: Iniciativa): void {

    // Asignamos los IDs para que se muestren preseleccionados
    this.selectedAsignaturasIndex = iniciativa?.Asignaturas?.map((a: any) => a.Id) || [];
    this.selectedEntidadesExtIndex = iniciativa?.EntidadesExteriores?.map((e: any) => e.Id) || [];
    this.selectedProfesoresIndex = iniciativa?.Profesores?.map((p: any) => p.Id) || [];
    this.selectedMetasIndex = iniciativa?.Metas.map((m: any) => m.NumeroMeta) || [];

    const linkedinUrl = iniciativa?.Difusion?.find(url => url.includes("linkedin")) ?? "";
    const facebookUrl = iniciativa?.Difusion?.find(url => url.includes("facebook")) ?? "";
    const twitterUrl = iniciativa?.Difusion?.find(url => url.includes("twitter")) ?? "";
    const instagramUrl = iniciativa?.Difusion?.find(url => url.includes("instagram")) ?? "";

    //validarFechas es un validador de formulario a nivel de grupo, no un validador de campo individual. Le estás diciendo a Angular que cada vez que cualquier campo del formulario cambie, se ejecute el validador. Esto se debe a que los validadores de grupo se ejecutan siempre que el formulario se vuelve a evaluar (lo cual pasa cuando cualquier campo cambia).
    this.form = this.fb.group({
      titulo: [iniciativa?.Titulo ?? '', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      horas: [iniciativa?.Horas ?? '', [Validators.required, Validators.min(1), Validators.max(100)]],
      fechaInicio: [iniciativa?.FechaInicio? this.convertirFecha(iniciativa.FechaInicio) : '', Validators.required],
      fechaFin: [iniciativa?.FechaFin? this.convertirFecha(iniciativa.FechaFin) : '', Validators.required],

      descripcion: [iniciativa?.Descripcion ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      tipoIniciativa: [iniciativa?.TipoIniciativa ?? '', Validators.required],
      productoFinal: [iniciativa?.ProductoFinal ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
      innovador: [iniciativa?.EsInnovadora ?? null, Validators.required],// Será true o false
      difusionLinkedin: [linkedinUrl ?? "", Validators.required],
      difusionFacebook: [facebookUrl ?? ""],
      difusionTwitter: [twitterUrl ?? ""],
      difusionInstagram: [instagramUrl ?? ""],
      cursoEscolar: [iniciativa? this.cursosEscolaresOpciones.find(curso => curso.Descripcion == iniciativa?.CursoEscolar)?.Id : "", Validators.required],

      asignaturas: [this.selectedAsignaturasIndex, [Validators.required, this.validarSeleccionMinima]],
      entidades: [this.selectedEntidadesExtIndex, [Validators.required, this.validarSeleccionMinima]],
      profesores: [this.selectedProfesoresIndex, [Validators.required, this.validarSeleccionMinima]],
      ods: [[]],
      metas: [this.selectedMetasIndex, [Validators.required, this.validarSeleccionMinima]],
    }, {
      validators: this.validarFechas.bind(this)// Vinculamos el validador personalizado al formulario
    });

    (document.getElementById("linkedin") as HTMLInputElement).checked = this.difusionLinkedinFrmControl?.value !== "" ? true : false;
    this.difusionLinkedinFrmControl?.value !== "" ? this.toggleInput("linkedin") : null;

    (document.getElementById("facebook") as HTMLInputElement).checked = this.difusionFacebookFrmControl?.value !== "" ? true : false;
    this.difusionFacebookFrmControl?.value !== "" ? this.toggleInput("facebook") : null;

    (document.getElementById("twitter") as HTMLInputElement).checked = this.difusionTwitterFrmControl?.value !== "" ? true : false;
    this.difusionTwitterFrmControl?.value !== "" ? this.toggleInput("twitter") : null;

    (document.getElementById("instagram") as HTMLInputElement).checked = this.difusionInstagramFrmControl?.value !== "" ? true : false;
    this.difusionInstagramFrmControl?.value !== "" ? this.toggleInput("instagram") : null;
  }
  
  
  //Funcion para el primer input del form, que es seleccionar si es innovador o no
  selectTemplate(tipoIniciativa: string) {
    const valorActual = this.form.value.innovador;
  
    // Alternar entre true, false y null
    if (tipoIniciativa === "innovador") {
      this.form.patchValue({ innovador: valorActual === true ? null : true });//Si valorActual === true (es decir, ya está seleccionado "Innovador"), lo cambiamos a null para deseleccionarlo. Si valorActual !== true (es decir, estaba en false o null), lo cambiamos a true para seleccionarlo.
    } else {
      this.form.patchValue({ innovador: valorActual === false ? null : false });//.patchValue({...}) → Es un método de Angular Forms que actualiza uno o varios campos del formulario SIN AFECTAR los demás.
    }

    this.innovadorFrmControl?.markAsTouched();
    this.innovadorFrmControl?.updateValueAndValidity();
  }

  get innovadorFrmControl() {
    return this.form.get('innovador');
  }

  get tituloFrmControl() {
    return this.form.get('titulo');
  }

  get horasFrmControl() {
    return this.form.get('horas');
  }

  get fechaInicioFrmControl() {
    return this.form.get('fechaInicio');
  }

  get fechaFinFrmControl() {
    return this.form.get('fechaFin');
  }

  get tipoIniciativaFrmControl() {
    return this.form.get('tipoIniciativa');
  }

  get descripcionFrmControl() {
    return this.form.get('descripcion');
  }


  get difusionLinkedinFrmControl() {
    return this.form.get('difusionLinkedin');
  }

  get difusionFacebookFrmControl() {
    return this.form.get('difusionFacebook');
  }

  get difusionTwitterFrmControl() {
    return this.form.get('difusionTwitter');
  }

  get difusionInstagramFrmControl() {
    return this.form.get('difusionInstagram');
  }




  get asignaturasFrmControl() {
    return this.form.get('asignaturas');
  }
  
  get entidadesFrmControl() {
    return this.form.get('entidades');
  }
  
  get profesoresFrmControl() {
    return this.form.get('profesores');
  }
  
  get productoFinalFrmControl() {
    return this.form.get('productoFinal');
  }
  
  get metasFrmControl() {
    return this.form.get('metas')!;
  }
  
  get odsFrmControl() {
    return this.form.get('ods')!;
  }

  //Validador personalizado para fechaFin:
  validarFechas(form: FormGroup) {
    const fechaInicio = form.get('fechaInicio')?.value;
    const fechaFin = form.get('fechaFin')?.value;

    if (fechaInicio && fechaFin && fechaFin < fechaInicio) {
      return { fechaInvalida: true }; // Devuelve un error si la fecha es incorrecta. fechaInvalida seria una propiedad booleana que tiene el form 
    }
    return null; // Todo bien si las fechas son válidas
  }

  // Validador para validar que al menos una opción esté seleccionada
  validarSeleccionMinima(control: FormControl) {
    const valor: any = control.value && control.value.length > 0 ? null : { seleccionRequerida: true };
    return valor;
  }

  private convertirFecha(fecha: string): string {
    const [dia, mes, anio] = fecha.split("-");
    const dateObj = new Date(+anio, +mes, +dia + 1); //En JavaScript, los meses van del 0 (enero) al 11 (diciembre), por eso se pone mes - 1. El símbolo + convierte strings a números.
    console.log(dateObj);
  
    return dateObj.toISOString().split('T')[0]; // te da yyyy-MM-dd
  }
  


  // Funciones para agregar entidades a su lista de entidades correspondientes
  addAsignatura(event: any): void {
    const selectedId = +event.target.value;//todo ver que hace el +

    if (selectedId && !this.selectedAsignaturasIndex.includes(selectedId)) {
      this.selectedAsignaturasIndex.push(selectedId);
  
      // 🔥 Actualizamos el valor del campo 'asignaturas' en el formulario
      this.asignaturasFrmControl?.setValue(this.selectedAsignaturasIndex);
      this.asignaturasFrmControl?.updateValueAndValidity(); // opcional pero recomendable
    }
  
    event.target.value = '';
  }

  addEntidad(event: any): void {
    const selectedId = +event.target.value;

    if (selectedId && !this.selectedEntidadesExtIndex.includes(selectedId)) {
      this.selectedEntidadesExtIndex.push(selectedId);
  
      //Actualizamos el valor del campo 'asignaturas' en el formulario
      this.entidadesFrmControl?.setValue(this.selectedEntidadesExtIndex);
      this.entidadesFrmControl?.updateValueAndValidity(); // opcional pero recomendable
    }
  
    event.target.value = '';
  }

  addMeta(event: any): void {
    const selectedId = +event.target.value;
  
    if (selectedId && !this.selectedMetasIndex.includes(selectedId)) {
      this.selectedMetasIndex.push(selectedId);
  
      this.metasFrmControl?.setValue(this.selectedMetasIndex);
      this.metasFrmControl?.updateValueAndValidity();
    }
  
    event.target.value = '';
  }


  addProfesor(event: any): void { 
    const selectedId = +event.target.value;
  
    if (selectedId && !this.selectedProfesoresIndex.includes(selectedId)) {
      this.selectedProfesoresIndex.push(selectedId);
  
      this.profesoresFrmControl?.setValue(this.selectedProfesoresIndex);
      this.profesoresFrmControl?.updateValueAndValidity();
    }
  
    event.target.value = '';
  }





  //Funciones para pintar el nombre en las badgeseleccionados
  getNombreProfesor(id: number): string {
    const profesor = this.profesoresOptions.find(p => p.Id === id);
    return profesor ? profesor.Nombre : 'Desconocido';
  }

  getNombreAsignatura(id: number): string {
    const asignatura = this.asignaturasOptions.find(asig => asig.Id === id);
    return asignatura ? asignatura.NombreAsignatura : 'Desconocido';
  }
  
  getNombreEntidadExt(id: number): string {
    const entidadExterior = this.entidadesOptions.find(entExt => entExt.Id === id);
    return entidadExterior ? entidadExterior.Nombre : 'Desconocido';
  }

  getNumeroOdsMeta(id: number): string {
    const meta = this.todasLasMetasOpciones.find(meta => meta.NumeroMeta === id);
    return meta ? meta.Id : 'Desconocido';
  }
  


  // Funciones para eliminar de la lista seleccionada
  removeAsignatura(id: number): void {
    this.selectedAsignaturasIndex = this.selectedAsignaturasIndex.filter(asigId => asigId !== id);
  
    this.asignaturasFrmControl?.setValue(this.selectedAsignaturasIndex);
    this.asignaturasFrmControl?.updateValueAndValidity();
  }

  removeEntidad(id: number): void {
    this.selectedEntidadesExtIndex = this.selectedEntidadesExtIndex.filter(entidadId => entidadId !== id);
  
    this.entidadesFrmControl?.setValue(this.selectedEntidadesExtIndex);
    this.entidadesFrmControl?.updateValueAndValidity();
  }

  removeMeta(id: number): void {
    this.selectedMetasIndex = this.selectedMetasIndex.filter(metaId => metaId !== id);
  
    this.metasFrmControl?.setValue(this.selectedMetasIndex);
    this.metasFrmControl?.updateValueAndValidity();
  }

  removeProfesor(id: number): void {
    this.selectedProfesoresIndex = this.selectedProfesoresIndex.filter(pid => pid !== id);
  
    this.profesoresFrmControl?.setValue(this.selectedProfesoresIndex);
    this.profesoresFrmControl?.updateValueAndValidity();
  }

  // Función para mostrar u ocultar los inputs de los checkbox de las redes sociales
  toggleInput(id: string) {
    const input = document.getElementById(id + "-link");
    if (input) {
      input.style.display = input.style.display === "none" ? "block" : "none";
    }
  }


  filtrarMetasSegunOds(): void {
    console.log("ODS seleccionado:", this.odsFrmControl.value);
    // Filtrar metas segun el ODS seleccionado
    this.metasSegunOdsOpciones = this.todasLasMetasOpciones.filter(meta => meta.NumeroOds.toString() == this.odsFrmControl.value.toString());
  }
  

  formatearFecha(fecha: Date | string): string {
    const date = new Date(fecha);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Meses de 0 a 11
    const anio = date.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }


  private obtenerRedesConValor(): string[] {
    const redes = ['Linkedin', 'Facebook', 'Twitter', 'Instagram'];
    return redes
      .map(red => {
        const valor = this.form.get(`difusion${red}`)?.value?.trim();
        return valor ? valor : null;
      })
      .filter((item) => item !== null);
  }

  public LimitarFechas() {
    const fechaInicio = this.form.get('fechaInicio')?.value;
    const fechaFin = this.form.get('fechaFin')?.value;

    if (fechaInicio && fechaFin) {
      const fechaInicioDate = new Date(fechaInicio);
      const fechaFinDate = new Date(fechaFin);

      if (fechaFinDate < fechaInicioDate) {
        this.form.get('fechaFin')?.setValue(fechaInicio); // Establece la fecha de fin como la de inicio si es menor
      }
    }
  }
  

  save() {
    console.log(this.form);
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const datosForm: any = this.form.value;

      const nuevaIniciativa: IniciativaDTO =  new IniciativaDTO(
        this.idIniciativaAEditar ?? 10,
        datosForm.titulo,
        datosForm.horas,
        this.formatearFecha(datosForm.fechaInicio),
        this.formatearFecha(datosForm.fechaFin),
        datosForm.descripcion,
        datosForm.tipoIniciativa,
        datosForm.productoFinal,//text que dice a quien esta dirigido
        datosForm.innovador,
        this.obtenerRedesConValor(),//redes sociales
        datosForm.asignaturas,
        datosForm.entidades,
        datosForm.profesores,
        datosForm.metas,
        datosForm.cursoEscolar
      );

      if(this.idIniciativaAEditar !== null) {
        this.iniciativaService.updateIniciativa(this.idIniciativaAEditar, nuevaIniciativa).subscribe(
          (response) => console.log("Iniciativa actulizada:", response),
          (error) => console.error("Error al guardar la iniciativa:", error)
        );

        return;
      }
      
      console.log(nuevaIniciativa);
      this.iniciativaService.createIniciativa(nuevaIniciativa).subscribe(
        (response) => {console.log("Iniciativa guardada:", response); this.router.navigate(['/initiatives-info']).then(()=> window.location.reload());},
        (error) => console.error("Error al guardar la iniciativa:", error)
      );

    } else {
      console.log("Formulario inválido");
    }
  }
}