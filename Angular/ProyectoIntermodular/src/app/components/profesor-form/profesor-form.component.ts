import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfesorDTO } from '../../models/profesor-dto';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-profesor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profesor-form.component.html',
  styleUrl: './profesor-form.component.scss'
})
export class ProfesorFormComponent {
  profesoresOpciones: ProfesorDTO[] = [];
  form!: FormGroup;
  idProfesorAEditar: number | null = null;
  mostrarModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private profesorService: ProfesorService
  ) {
    this.profesorService.getProfesores().subscribe((profesores: any) => {
      console.log("Profesores recibidos:", profesores);
      this.profesoresOpciones = profesores;
    });

    this.crearFormulario();
  }

  private crearFormulario(profesor?: ProfesorDTO): void {
    this.form = this.fb.group({
      nombre: [profesor?.Nombre ?? '', [Validators.required]],
    });
  }

  get nombreFrmControl() {
    return this.form.get('nombre');
  }

  formatearFecha(fecha: Date | string): string {
    const date = new Date(fecha);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }

  crearProfesor(): void {
    this.idProfesorAEditar = null;
    this.crearFormulario(); // reinicia el formulario
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  editarProfesor(id: number): void {
    console.log("Editando profesor con id:", id);
    this.idProfesorAEditar = id;
    const profesor = this.profesoresOpciones.find(p => p.Id === id);
    if (profesor) {
      this.crearFormulario(profesor);
      this.mostrarModal = true;
    }
  }

  eliminarProfesor(id: number): void {
    console.log("Borrando profesor con id:", id);
    this.profesorService.deleteProfesorById(id).subscribe(() => {
      this.profesoresOpciones = this.profesoresOpciones.filter(p => p.Id !== id);
    });
  }

  save(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log("Formulario inválido");
      return;
    }

    const datosForm = this.form.value;
    let nuevoProfesor: ProfesorDTO;

    if (this.idProfesorAEditar !== null) {
      nuevoProfesor = new ProfesorDTO(this.idProfesorAEditar, datosForm.nombre);

      this.profesorService.updateProfesor(this.idProfesorAEditar, nuevoProfesor).subscribe(
        (response) => {
          console.log("Profesor actualizado:", response);
          this.actualizarLista();
        },
        (error) => console.error("Error al actualizar el profesor:", error)
      );

    } else {
      // Puedes generar un ID con lógica temporal si no lo proporciona el backend
      nuevoProfesor = new ProfesorDTO(Date.now(), datosForm.nombre);

      this.profesorService.createProfesor(nuevoProfesor).subscribe(
        (response) => {
          console.log("Profesor creado:", response);
          this.actualizarLista();
        },
        (error) => console.error("Error al guardar el profesor:", error)
      );
    }

    this.mostrarModal = false;
  }

  private actualizarLista(): void {
    this.profesorService.getProfesores().subscribe((profesores: any) => {
      this.profesoresOpciones = profesores;
    });
  }
}
