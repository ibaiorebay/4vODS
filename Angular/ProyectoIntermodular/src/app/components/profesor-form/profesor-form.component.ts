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
  

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private profesorService: ProfesorService) {
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
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Meses de 0 a 11
    const anio = date.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }


  crearProfesor() {
    
  }

  editarProfesor(idIniciativaAEditar: number) {
    console.log("Editando tarjeta");
  }

  eliminarProfesor(id: number) {
    console.log("Borrando tarjeta con id: " + id);
    // this.profesorService.deleteProfesorById(id);
  }

  save() {
    console.log(this.form);
    this.form.markAllAsTouched();

    if (this.form.valid) {
      console.log(this.form.value);
      
      const datosForm: any = this.form.value;
      let nuevoProfesor: ProfesorDTO;

      if(this.idProfesorAEditar !== null) {
        nuevoProfesor = new ProfesorDTO(this.idProfesorAEditar, datosForm.nombre);

        console.log(nuevoProfesor);

        this.profesorService.updateProfesor(this.idProfesorAEditar, nuevoProfesor).subscribe(
          (response) => console.log("Profesor actualizado:", response),
          (error) => console.error("Error al guardar el profesor:", error)
        );

        return;
      }

      nuevoProfesor = new ProfesorDTO(3, datosForm.nombre);
      console.log(nuevoProfesor);

      this.profesorService.createProfesor(nuevoProfesor).subscribe(
        (response) => console.log("Profesor creado:", response),
        (error) => console.error("Error al guardar el profesor:", error)
      );


    } else {
      console.log("Formulario inválido");
    }
  }

}
