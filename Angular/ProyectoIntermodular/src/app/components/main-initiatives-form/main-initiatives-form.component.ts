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

  selectedAsignaturasIndex: number[] = [];
  selectedEntidadesExtIndex: number[] = [];
  selectedMetas: any[] = [];
  selectedProfesoresIndex: number[] = [];

  asignaturasOptions: AsignaturaDTO[] = [];
  entidadesOptions: EntidadExterior[] = [];
  // metasOptions: string[] = [];
  profesoresOptions: ProfesorDTO[] = [];//crisComment: uso profesor DTO porque la api solo devuelve nombre y id


  metasOptions = [
    { id: 1, nombre: 'Meta 1' },
    { id: 2, nombre: 'Meta 2' },
    { id: 3, nombre: 'Meta 3' }
  ];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private iniciativaService: IniciativaService, private router: Router) {

    // this.metasOptions = this.iniciativaService.Ods;
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
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.idIniciativaAEditar = parseInt(idParam, 10);
      console.log('Iniciativa ID:', this.idIniciativaAEditar);

      this.iniciativaService.getIniciativaById(this.idIniciativaAEditar).subscribe(
        (iniciativa) => {
          console.log('Iniciativa cargada:', iniciativa);
          console.log(typeof(iniciativa));
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

      asignaturas: [[], [Validators.required, this.validarSeleccionMinima]],
      entidades: [[], [Validators.required, this.validarSeleccionMinima]],
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
    const selectedId = +event.target.value;//todo ver que hace el +

    if (selectedId && !this.selectedEntidadesExtIndex.includes(selectedId)) {
      this.selectedEntidadesExtIndex.push(selectedId);
  
      // 🔥 Actualizamos el valor del campo 'asignaturas' en el formulario
      this.entidadesFrmControl?.setValue(this.selectedEntidadesExtIndex);
      this.entidadesFrmControl?.updateValueAndValidity(); // opcional pero recomendable
    }
  
    event.target.value = '';
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
    const selectedId = +event.target.value;//todo ver que hace el +
  
    if (selectedId && !this.selectedProfesoresIndex.includes(selectedId)) {
      this.selectedProfesoresIndex.push(selectedId);
  
      this.profesoresFrmControl?.setValue(this.selectedProfesoresIndex);
      this.profesoresFrmControl?.updateValueAndValidity();
    }
  
    event.target.value = '';
  }





  //Funcion para pintar el nombre de profesor en las badges de los profes seleccionados
  getNombreProfesor(id: number): string {
    const profesor = this.profesoresOptions.find(p => p.Id === id);
    return profesor ? profesor.Nombre : 'Desconocido';
  }

  //Funcion para pintar el nombre de profesor en las badges de los profes seleccionados
  getNombreAsignatura(id: number): string {
    const asignatura = this.asignaturasOptions.find(asig => asig.Id === id);
    return asignatura ? asignatura.NombreAsignatura : 'Desconocido';
  }
  
  //Funcion para pintar el nombre de profesor en las badges de los profes seleccionados
  getNombreEntidadExt(id: number): string {
    const entidadExterior = this.entidadesOptions.find(entExt => entExt.Id === id);
    return entidadExterior ? entidadExterior.Nombre : 'Desconocido';
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

  removeMeta(meta: any): void {
    const index = this.selectedMetas.indexOf(meta);
    if (index > -1) {
      this.selectedMetas.splice(index, 1);
      this.metasFrmControl?.setValue(this.selectedMetas);
      this.metasFrmControl?.updateValueAndValidity();
    }
  }

  removeProfesor(id: number): void {
    this.selectedProfesoresIndex = this.selectedProfesoresIndex.filter(pid => pid !== id);
  
    this.profesoresFrmControl?.setValue(this.selectedProfesoresIndex);
    this.profesoresFrmControl?.updateValueAndValidity();
  }

  // Función para mostrar u ocultar los inputs de los checkbox de las redes sociales
  // toggleInput(id: string) {
  //   const input = document.getElementById(id + "-link");
  //   if (input) {
  //     input.style.display = input.style.display === "none" ? "block" : "none";
  //   }
  // }

  formatearFecha(fecha: Date | string): string {
    const date = new Date(fecha);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Meses de 0 a 11
    const anio = date.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }

  save() {
    console.log(this.form);
    console.log(this.form.value.fechaInicio);
    console.log(typeof(this.form.value.fechaInicio));
    this.form.markAllAsTouched();

    console.log(this.selectedAsignaturasIndex);
    console.log(this.selectedEntidadesExtIndex);
    console.log(this.selectedProfesoresIndex);
    // console.log(this.selectedMetas);


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
        
        datosForm.difusion,//redes sociales
        
        datosForm.asignaturas,
        datosForm.entidades,
        datosForm.profesores,
        // datosForm.metas,
        [1],
        // [1],
        // [1],
        // [1]
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