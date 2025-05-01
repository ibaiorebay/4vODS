import { Component } from '@angular/core';
import { AsignaturaService } from '../../services/asignatura.service';
import { AsignaturaDTO } from '../../models/asignatura-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Curso } from '../../models/curso';

@Component({
  selector: 'app-asignatura-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asignatura-form.component.html',
  styleUrl: './asignatura-form.component.scss'
})
export class AsignaturaFormComponent {

  asignaturasOpciones: AsignaturaDTO[] = [];
  cursosOpciones: Curso[] = [];
  form!: FormGroup;
  idAsignaturaAEditar: number | null = null;
  mostrarModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private asignaturaService: AsignaturaService
  ) {
    this.asignaturaService.getAsignaturas().subscribe((asignaturas: any) => {
      console.log("Asignaturas recibidos:", asignaturas);
      this.asignaturasOpciones = asignaturas;
    });

    this.asignaturaService.getCursos().subscribe((cursos: any) => {
      console.log("cursos recibidos:", cursos);
      this.cursosOpciones = cursos;
    });

    this.crearFormulario();
  }

  private crearFormulario(asignatura?: AsignaturaDTO): void {
    this.form = this.fb.group({
      nombre: [asignatura?.NombreAsignatura ?? '', [Validators.required]],
      curso: [asignatura?.IdCurso ?? '', [Validators.required]]
    });
  }

  get nombreFrmControl() {
    return this.form.get('nombre');
  }
  
  get cursoFrmControl() {
    return this.form.get('curso');
  }

  crearAsignatura(): void {
    this.idAsignaturaAEditar = null;
    this.crearFormulario(); // reinicia el formulario
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  obtenerNombreCurso(id: number): string {
    const curso = this.cursosOpciones.find(curso => curso.Id === id);
    let nombreCurso: string = curso? curso.Nombre : "Sin curso";
    return nombreCurso;
  }

  editarAsignatura(id: number | undefined): void {

    if (id === undefined) {
      console.warn("ID no válido para editar asignatura");
      return;
    }

    console.log("Editando asignatura con id:", id);
    this.idAsignaturaAEditar = id;
    const asignaturaAEditar = this.asignaturasOpciones.find(asignatura => asignatura.Id === id);
    
    if (asignaturaAEditar) {
      this.crearFormulario(asignaturaAEditar);
      this.mostrarModal = true;
    }
  }

  eliminarAsignatura(id: number | undefined): void {

    if (id === undefined) {
      console.warn("ID no válido para eliminar asignatura");
      return;
    }

    console.log("Borrando asignatura con id:", id);
    this.asignaturaService.deleteAsignatura(id).subscribe(() => {
      this.asignaturasOpciones = this.asignaturasOpciones.filter(asig => asig.Id !== id);
    });
  }

  save(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log("Formulario inválido");
      return;
    }

    const datosForm = this.form.value;
    let nuevaAsignatura: AsignaturaDTO;

    if (this.idAsignaturaAEditar !== null) {
      nuevaAsignatura = new AsignaturaDTO(datosForm.curso, datosForm.nombre, this.idAsignaturaAEditar);

      console.log("Actualizando asignatura:", nuevaAsignatura);
      this.asignaturaService.updateAsignatura(this.idAsignaturaAEditar, nuevaAsignatura).subscribe(
        (response) => {
          console.log("asignatura actualizado:", response);
          this.actualizarLista();
        },
        (error) => console.error("Error al actualizar la asignatura:", error)
      );

    } else {
      // Puedes generar un ID con lógica temporal si no lo proporciona el backend
      nuevaAsignatura = new AsignaturaDTO(parseInt(datosForm.curso), datosForm.nombre);

      console.log("Creando nueva asignatura:", nuevaAsignatura);
      this.asignaturaService.createAsignatura(nuevaAsignatura).subscribe(
        (response) => {
          console.log("asignatura creado:", response);
          this.actualizarLista();
        },
        (error) => console.error("Error al guardar la asignatura:", error)
      );
    }

    this.mostrarModal = false;
  }

  private actualizarLista(): void {
    this.asignaturaService.getAsignaturas().subscribe((asignaturas: any) => {
      this.asignaturasOpciones = asignaturas;
    });
  }
    
}
