import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-initiatives-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main-initiatives-form.component.html',
  styleUrl: './main-initiatives-form.component.scss'
})
export class MainInitiativesFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      horas: ['', [Validators.required, Validators.min(1)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log("Formulario inválido");
    }
  }

}