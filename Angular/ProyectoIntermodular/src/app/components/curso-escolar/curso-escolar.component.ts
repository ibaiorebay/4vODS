import { Component } from '@angular/core';
import { CursoEscolar } from '../../models/curso-escolar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoEscolarService } from '../../services/curso-escolar.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curso-escolar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './curso-escolar.component.html',
  styleUrl: './curso-escolar.component.scss'
})
export class CursoEscolarComponent {
  
    cursosEscolaresOpciones: CursoEscolar[] = [];
    form!: FormGroup;
    idCursoEscolarAEditar: number | null = null;
    mostrarModal: boolean = false;
  
    constructor(
      private fb: FormBuilder,
      private cursosEscolarService: CursoEscolarService
    ) {
      this.cursosEscolarService.getCursosEscolares().subscribe((cursosEscolares: any) => {
        console.log("cursosEscolares recibidos:", cursosEscolares);
        this.cursosEscolaresOpciones = cursosEscolares;
      });

      this.crearFormulario();
    }
  
    private crearFormulario(cursosEscolar?: CursoEscolar): void {
      this.form = this.fb.group({
        descripcion: [cursosEscolar?.Descripcion ?? '', [Validators.required]],
      });
    }
  
    get descripcionFrmControl() {
      return this.form.get('descripcion');
    }

  
    crearCursoEscolar(): void {
      this.idCursoEscolarAEditar = null;
      this.crearFormulario(); // reinicia el formulario
      this.mostrarModal = true;
    }
  
    cerrarModal(): void {
      this.mostrarModal = false;
    }
  
    editarCursoEscolar(id: number | undefined): void {
  
      if (id === undefined) {
        console.warn("ID no válido para editar CursoEscolar");
        return;
      }
  
      console.log("Editando CursoEscolar con id:", id);
      this.idCursoEscolarAEditar = id;
      const cursoEscolarAEditar = this.cursosEscolaresOpciones.find(cursoEscolar => cursoEscolar.Id === id);
      
      if (cursoEscolarAEditar) {
        this.crearFormulario(cursoEscolarAEditar);
        this.mostrarModal = true;
      }
    }
  
    eliminarCursoEscolar(id: number | undefined): void {
  
      if (id === undefined) {
        console.warn("ID no válido para eliminar CursoEscolar");
        return;
      }
  
      console.log("Borrando CursoEscolar con id:", id);
      this.cursosEscolarService.deleteCursoEscolar(id).subscribe(() => {
        this.cursosEscolaresOpciones = this.cursosEscolaresOpciones.filter(cursoEscolar => cursoEscolar.Id !== id);
      });
    }
  
    save(): void {
      this.form.markAllAsTouched();
  
      if (!this.form.valid) {
        console.log("Formulario inválido");
        return;
      }
  
      const datosForm = this.form.value;
      let nuevoCursoEscolar: CursoEscolar;
  
      if (this.idCursoEscolarAEditar !== null) {
        nuevoCursoEscolar = new CursoEscolar(datosForm.descripcion, this.idCursoEscolarAEditar);
  
        console.log("Actualizando cursoEscolar:", nuevoCursoEscolar);
        this.cursosEscolarService.updateCursoEscolar(this.idCursoEscolarAEditar, nuevoCursoEscolar).subscribe(
          (response) => {
            console.log("cursoEscolar actualizado:", response);
            this.actualizarLista();
          },
          (error) => console.error("Error al actualizar la cursoEscolar:", error)
        );
  
      } else {
        nuevoCursoEscolar = new CursoEscolar(datosForm.descripcion, 10);
  
        console.log("Creando CursoEscolar:", nuevoCursoEscolar);
        this.cursosEscolarService.createCursoEscolar(nuevoCursoEscolar).subscribe(
          (response) => {
            console.log("CursoEscolar creado:", response);
            this.actualizarLista();
          },
          (error) => console.error("Error al guardar la CursoEscolar:", error)
        );
      }
  
      this.mostrarModal = false;
    }
  
    private actualizarLista(): void {
      this.cursosEscolarService.getCursosEscolares().subscribe((cursosEscolares: any) => {
        this.cursosEscolaresOpciones = cursosEscolares;
      });
    }
}
