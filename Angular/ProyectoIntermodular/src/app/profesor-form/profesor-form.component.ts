import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Profesor } from '../models/profesor';


@Component({
  selector: 'app-profesor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profesor-form.component.html',
  styleUrl: './profesor-form.component.scss'
})
export class ProfesorFormComponent {

  form!: FormGroup;
  idProfesorAEditar: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
  
  }

  private crearFormulario(profesor?: any): void {
      
    this.form = this.fb.group({
      innovador: [profesor?.EsInnovadora ?? null, Validators.required],// Será true o false
      nombre: [profesor?.Titulo ?? '', [Validators.required, Validators.minLength(5)]],
      primerApellido: [profesor?.Titulo ?? '', [Validators.required, Validators.minLength(5)]],
      segundoApellido: [profesor?.Apellido2 ?? '', [Validators.required, Validators.minLength(5)]],
      fechaNacimiento: [profesor?.FechaNacimiento ?? '', Validators.required]
    });
  }

  get nombreFrmControl() {
    return this.form.get('nombre');
  }
  
  get primerApellidoFrmControl() {
    return this.form.get('primerApellido');
  }

  get segundoApellidoFrmControl() {
    return this.form.get('segundoApellido');
  }

  get fechaNacimientoFrmControl() {
    return this.form.get('fechaNacimiento');
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
      console.log(this.form.value);
      
      const datosForm: any = this.form.value;

      const nuevoProfesor: Profesor =  new Profesor(
        this.idProfesorAEditar ?? 0,
        datosForm.nombre,
        datosForm.primerApellido,
        datosForm.segundoApellido,
        this.formatearFecha(datosForm.fechaNacimiento),
      );

      console.log(nuevoProfesor);

      // this.iniciativaService.createIniciativa(nuevoProfesor);

    } else {
      console.log("Formulario inválido");
    }
  }

}
