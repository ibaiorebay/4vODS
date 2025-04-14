import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IniciativaService } from '../../services/iniciativa.service';
import { Iniciativa } from '../../models/iniciativa';


@Component({
  selector: 'app-main-initiatives-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main-initiatives-form.component.html',
  styleUrl: './main-initiatives-form.component.scss'
})
export class MainInitiativesFormComponent implements OnInit {

  form!: FormGroup;
  idIniciativaAEditar: number | null = null;

  selectedAsignaturas: any[] = [];
  selectedEntidades: any[] = [];
  selectedMetas: any[] = [];
  selectedProfesores: number[] = [];

  // asignaturasOptions: string[] = [];
  // entidadesOptions: string[] = [];
  // metasOptions: string[] = [];
  // profesoresOptions: string[] = [];

  asignaturasOptions = [
    { id: 1, nombre: 'Matemáticas' },
    { id: 2, nombre: 'Historia' },
    { id: 3, nombre: 'Ciencias' },
    { id: 4, nombre: 'Literatura' }
  ];

  entidadesOptions = [
    { id: 1, nombre: 'Entidad A' },
    { id: 2, nombre: 'Entidad B' },
    { id: 3, nombre: 'Entidad C' }
  ];

  metasOptions = [
    { id: 1, nombre: 'Meta 1' },
    { id: 2, nombre: 'Meta 2' },
    { id: 3, nombre: 'Meta 3' }
  ];

  profesoresOptions = [
    { id: 1, nombre: 'Profesor 1' },
    { id: 2, nombre: 'Profesor 2' },
    { id: 3, nombre: 'Profesor 3' }
  ];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private iniciativaService: IniciativaService) {

    // this.asignaturasOptions = this.iniciativaService.Asignaturas;
    // this.entidadesOptions = this.iniciativaService.EntidadesExternas;
    // this.metasOptions = this.iniciativaService.Ods;
    // this.profesoresOptions = this.iniciativaService.Profesores;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.idIniciativaAEditar = parseInt(idParam, 10);
      console.log('Iniciativa ID:', this.idIniciativaAEditar);

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

  private crearFormulario(iniciativa?: any): void {
    //validarFechas es un validador de formulario a nivel de grupo, no un validador de campo individual. Le estás diciendo a Angular que cada vez que cualquier campo del formulario cambie, se ejecute el validador. Esto se debe a que los validadores de grupo se ejecutan siempre que el formulario se vuelve a evaluar (lo cual pasa cuando cualquier campo cambia).
    this.form = this.fb.group({
      titulo: [iniciativa?.Titulo ?? '', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      horas: [iniciativa?.Horas ?? '', [Validators.required, Validators.min(1), Validators.max(100)]],
      fechaInicio: [iniciativa?.FechaInicio ?? '', Validators.required],
      fechaFin: [iniciativa?.FechaFin ?? '', Validators.required],

      descripcion: [iniciativa?.Descripcion ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      tipoIniciativa: [iniciativa?.TipoIniciativa ?? '', Validators.required],
      productoFinal: [iniciativa?.ProductoFinal ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
      innovador: [iniciativa?.EsInnovadora ?? null, Validators.required],// Será true o false
      difusion: [iniciativa?.Difusion ?? '', Validators.required],

      asignaturas: [this.selectedAsignaturas, [Validators.required, this.validarSeleccionMinima]],
      entidades: [this.selectedEntidades, [Validators.required, this.validarSeleccionMinima]],
      metas: [this.selectedMetas, [Validators.required, this.validarSeleccionMinima]],
      profesores: [[], [Validators.required, this.validarSeleccionMinima]],
    }, {
      validators: this.validarFechas.bind(this)// Vinculamos el validador personalizado al formulario
    });
  }
  
  
  //funcion para el primer input del form, que es seleccionar si es innovador o no
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


  get difusionFrmControl() {
    return this.form.get('difusion');
  }

  get asignaturasFrmControl() {
    return this.form.get('asignaturas');
  }
  
  get entidadesFrmControl() {
    return this.form.get('entidades');
  }

  get metasFrmControl() {
    return this.form.get('metas');
  }

  get profesoresFrmControl() {
    return this.form.get('profesores');
  }

  get productoFinalFrmControl() {
    return this.form.get('productoFinal');
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

  // Funciones para agregar entidades a su lista de entidades correspondientes
  addAsignatura(event: any): void {
    const selectedAsignatura = this.asignaturasOptions.find(asignatura => asignatura.id == event.target.value);
    if (selectedAsignatura && !this.selectedAsignaturas.includes(selectedAsignatura)) {
      this.selectedAsignaturas.push(selectedAsignatura);
      
      this.asignaturasFrmControl?.setValue(this.selectedAsignaturas);
      this.asignaturasFrmControl?.updateValueAndValidity(); 
    }
  }

  addEntidad(event: any): void {
    const selectedEntidad = this.entidadesOptions.find(entidad => entidad.id == event.target.value);
    if (selectedEntidad && !this.selectedEntidades.includes(selectedEntidad)) {
      this.selectedEntidades.push(selectedEntidad);

      this.entidadesFrmControl?.setValue(this.selectedEntidades);
      this.entidadesFrmControl?.updateValueAndValidity();
    }
  }

  addMeta(event: any): void {
    const selectedMeta = this.metasOptions.find(meta => meta.id == event.target.value);
    if (selectedMeta && !this.selectedMetas.includes(selectedMeta)) {
      this.selectedMetas.push(selectedMeta);

      this.metasFrmControl?.setValue(this.selectedMetas);
      this.metasFrmControl?.updateValueAndValidity(); 
    }
  }

  addProfesor(event: any): void { 
    const selectedId = +event.target.value;
  
    if (selectedId && !this.selectedProfesores.includes(selectedId)) {
      this.selectedProfesores.push(selectedId);
  
      this.profesoresFrmControl?.setValue(this.selectedProfesores);
      this.profesoresFrmControl?.updateValueAndValidity();
    }
  
    event.target.value = '';
  }

  getNombreProfesor(id: number): string {
    const profesor = this.profesoresOptions.find(p => p.id === id);
    return profesor ? profesor.nombre : 'Desconocido';
  }
  
  

  // Funciones para eliminar de la lista seleccionada
  removeAsignatura(asignatura: any): void {
    const index = this.selectedAsignaturas.indexOf(asignatura);

    if (index > -1) {
      this.selectedAsignaturas.splice(index, 1);
      this.asignaturasFrmControl?.setValue(this.selectedAsignaturas);
      this.asignaturasFrmControl?.updateValueAndValidity();
    }
  }

  removeEntidad(entidad: any): void {
    const index = this.selectedEntidades.indexOf(entidad);
    if (index > -1) {
      this.selectedEntidades.splice(index, 1);
      this.entidadesFrmControl?.setValue(this.selectedEntidades);
      this.entidadesFrmControl?.updateValueAndValidity();
    }
  }

  removeMeta(meta: any): void {
    const index = this.selectedMetas.indexOf(meta);
    if (index > -1) {
      this.selectedMetas.splice(index, 1);
      this.metasFrmControl?.setValue(this.selectedMetas);
      this.metasFrmControl?.updateValueAndValidity();
    }
  }


  removeProfesor(id: number): void {
    this.selectedProfesores = this.selectedProfesores.filter(pid => pid !== id);
  
    this.profesoresFrmControl?.setValue(this.selectedProfesores);
    this.profesoresFrmControl?.updateValueAndValidity();
  }



  formatearFecha(fecha: Date | string): string {
    const date = new Date(fecha);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Meses de 0 a 11
    const anio = date.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }
  

  save() {
    console.log(this.form);
    this.form.markAllAsTouched();

    if (this.form.valid) {
      // console.log(this.form.value);
      
      const datosForm: any = this.form.value;

      const nuevaIniciativa: Iniciativa =  new Iniciativa(
        this.idIniciativaAEditar ?? 0,
        datosForm.titulo,
        datosForm.horas,
        this.formatearFecha(datosForm.fechaInicio),
        this.formatearFecha(datosForm.fechaFin),
        
        datosForm.descripcion,
        datosForm.tipoIniciativa,
        datosForm.productoFinal,//text que dice a quien esta dirigido
        
        datosForm.innovador,
        
        datosForm.difusion,//redes sociales
        
        datosForm.asignaturas,
        datosForm.entidades,
        datosForm.profesores,
        datosForm.metas,
      );

      console.log(nuevaIniciativa);

      this.iniciativaService.createIniciativa(nuevaIniciativa).subscribe(
        (response) => console.log("Iniciativa guardada:", response),
        (error) => console.error("Error al guardar la iniciativa:", error)
      );;

    } else {
      console.log("Formulario inválido");
    }
  }
}