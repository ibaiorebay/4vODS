import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IniciativaService } from '../../services/iniciativa.service';
import { Asignatura } from '../../models/asignatura';
import { EntidadExterior } from '../../models/entidad-exterior';


@Component({
  selector: 'app-main-initiatives-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main-initiatives-form.component.html',
  styleUrl: './main-initiatives-form.component.scss'
})
export class MainInitiativesFormComponent implements OnInit {

  form!: FormGroup;
  iniciativaId: string | null = null;

  selectedAsignaturas: any[] = [];
  selectedEntidades: any[] = [];
  selectedMetas: any[] = [];
  selectedProfesores: any[] = [];

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
    this.iniciativaId = this.route.snapshot.paramMap.get('id');
    // console.log('Iniciativa ID:', this.iniciativaId);

    //validarFechas es un validador de formulario a nivel de grupo, no un validador de campo individual. Le estás diciendo a Angular que cada vez que cualquier campo del formulario cambie, se ejecute el validador. Esto se debe a que los validadores de grupo se ejecutan siempre que el formulario se vuelve a evaluar (lo cual pasa cuando cualquier campo cambia).
    this.form = this.fb.group({
      innovador: [null, Validators.required], // Será true o false
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      horas: ['', [Validators.required, Validators.min(1), Validators.max(100)]], 
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      asignaturas: [this.selectedAsignaturas, [Validators.required, this.validarSeleccionMinima]],
      entidades: [this.selectedEntidades, [Validators.required, this.validarSeleccionMinima]],
      metas: [this.selectedMetas, [Validators.required, this.validarSeleccionMinima]],
      profesores: [this.selectedProfesores, [Validators.required, this.validarSeleccionMinima]],
    }, { validators: this.validarFechas.bind(this) }); // Vinculamos el validador personalizado al formulario

    // console.log(this.form);
    // console.log(this.form.get('asignaturas')?.value);
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
    console.log("dentrode validarSeleccionMinima ------------------");
    console.log(control);

    // console.log(this.form ?? "No hay form");
    const valor: any = control.value && control.value.length > 0 ? null : { seleccionRequerida: true };
    console.log(valor);
    console.log("------------------");
    return valor;
  }

  // Funciones para agregar entidades a su lista de entidades correspondientes
  addAsignatura(event: any): void {
    const selectedAsignatura = this.asignaturasOptions.find(asignatura => asignatura.id == event.target.value);
    // console.log(selectedAsignatura);
    if (selectedAsignatura && !this.selectedAsignaturas.includes(selectedAsignatura)) {
      this.selectedAsignaturas.push(selectedAsignatura);
      
      // 🔥 Actualizamos el valor del campo 'asignaturas' en el formulario
      this.asignaturasFrmControl?.setValue(this.selectedAsignaturas);
      this.asignaturasFrmControl?.updateValueAndValidity(); // opcional pero recomendable
    }
  }

  addEntidad(event: any): void {
    const selectedEntidad = this.entidadesOptions.find(entidad => entidad.id == event.target.value);
    if (selectedEntidad && !this.selectedEntidades.includes(selectedEntidad)) {
      this.selectedEntidades.push(selectedEntidad);

      // 🔥 Actualizamos el valor del campo 'entidades exteriores' en el formulario
      this.entidadesFrmControl?.setValue(this.selectedEntidades);
      this.entidadesFrmControl?.updateValueAndValidity(); // opcional pero recomendable
    }
  }

  addMeta(event: any): void {
    const selectedMeta = this.metasOptions.find(meta => meta.id == event.target.value);
    if (selectedMeta && !this.selectedMetas.includes(selectedMeta)) {
      this.selectedMetas.push(selectedMeta);

      // 🔥 Actualizamos el valor del campo 'metas' en el formulario
      this.metasFrmControl?.setValue(this.selectedMetas);
      this.metasFrmControl?.updateValueAndValidity(); // opcional pero recomendable
    }
  }

  addProfesor(event: any): void {
    const selectedProfesor = this.profesoresOptions.find(profesor => profesor.id == event.target.value);
    if (selectedProfesor && !this.selectedProfesores.includes(selectedProfesor)) {
      this.selectedProfesores.push(selectedProfesor);

      // 🔥 Actualizamos el valor del campo 'profesores' en el formulario
      this.profesoresFrmControl?.setValue(this.selectedProfesores);
      this.profesoresFrmControl?.updateValueAndValidity(); // opcional pero recomendable
    }
  }

  // Funciones para eliminar de la lista seleccionada
  removeAsignatura(asignatura: any): void {
    const index = this.selectedAsignaturas.indexOf(asignatura);
    // console.log(this.selectedAsignaturas);//cris cuando se imprime esta log, no entiendo porque luego se ejecuta dos veces la funcion validarSeleccionMinima, y luego recien se imprime el ultimo log de esta funcion

    if (index > -1) {
      this.selectedAsignaturas.splice(index, 1);

      // 🔥 Actualizamos el valor del campo 'asignaturas' en el formulario
      this.asignaturasFrmControl?.setValue(this.selectedAsignaturas);
      this.asignaturasFrmControl?.updateValueAndValidity(); // opcional pero recomendable
    }
  }

  removeEntidad(entidad: any): void {
    const index = this.selectedEntidades.indexOf(entidad);
    if (index > -1) {
      this.selectedEntidades.splice(index, 1);

      // 🔥 Actualizamos el valor del campo 'entidades exteriores' en el formulario
      this.entidadesFrmControl?.setValue(this.selectedEntidades);
      this.entidadesFrmControl?.updateValueAndValidity(); // opcional pero recomendable
    }
  }

  removeMeta(meta: any): void {
    const index = this.selectedMetas.indexOf(meta);
    if (index > -1) {
      this.selectedMetas.splice(index, 1);

      // 🔥 Actualizamos el valor del campo 'metas' en el formulario
      this.metasFrmControl?.setValue(this.selectedMetas);
      this.metasFrmControl?.updateValueAndValidity(); // opcional pero recomendable
    }
  }

  removeProfesor(profesor: any): void {
    const index = this.selectedProfesores.indexOf(profesor);
    if (index > -1) {
      this.selectedProfesores.splice(index, 1);

      // 🔥 Actualizamos el valor del campo 'profesores' en el formulario
      this.profesoresFrmControl?.setValue(this.selectedProfesores);
      this.profesoresFrmControl?.updateValueAndValidity(); // opcional pero recomendable
    }
  }

  // Función para mostrar u ocultar los inputs de los checkbox de las redes sociales
  toggleInput(id: string) {
    const input = document.getElementById(id + "-link");
    if (input) {
      input.style.display = input.style.display === "none" ? "block" : "none";
    }
  }


  save() {
    // console.log(this.form);
    this.form.markAllAsTouched(); // 👈 Marca todos los campos como tocados

    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log("Formulario inválido");
    }
  }

}