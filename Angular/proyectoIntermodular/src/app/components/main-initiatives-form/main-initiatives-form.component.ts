import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgControl } from '@angular/forms';
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
  form: FormGroup;
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

    this.form = this.fb.group({
      titulo: ['', Validators.required],
      horas: ['', [Validators.required, Validators.min(1)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      asignaturas: ['', Validators.required],
      entidades: ['', Validators.required],
      metas: ['', Validators.required],
      profesores: ['', Validators.required],
    });

    // this.asignaturasOptions = this.iniciativaService.Asignaturas;
    // this.entidadesOptions = this.iniciativaService.EntidadesExternas;
    // this.metasOptions = this.iniciativaService.Ods;
    // this.profesoresOptions = this.iniciativaService.Profesores;
  }


  // ngOnInit(): void {
  //   this.iniciativaId = this.route.snapshot.paramMap.get('id');
  //   console.log('Iniciativa ID:', this.iniciativaId);
  // }

  ngOnInit(): void {
    this.iniciativaId = this.route.snapshot.paramMap.get('id');
    console.log('Iniciativa ID:', this.iniciativaId);
  }
  

  // Funciones para agregar a la lista seleccionada
  addAsignatura(event: any): void {
    const selectedAsignatura = this.asignaturasOptions.find(asignatura => asignatura.id == event.target.value);
    if (selectedAsignatura && !this.selectedAsignaturas.includes(selectedAsignatura)) {
      this.selectedAsignaturas.push(selectedAsignatura);
    }
  }

  addEntidad(event: any): void {
    const selectedEntidad = this.entidadesOptions.find(entidad => entidad.id == event.target.value);
    if (selectedEntidad && !this.selectedEntidades.includes(selectedEntidad)) {
      this.selectedEntidades.push(selectedEntidad);
    }
  }

  addMeta(event: any): void {
    const selectedMeta = this.metasOptions.find(meta => meta.id == event.target.value);
    if (selectedMeta && !this.selectedMetas.includes(selectedMeta)) {
      this.selectedMetas.push(selectedMeta);
    }
  }

  addProfesor(event: any): void {
    const selectedProfesor = this.profesoresOptions.find(profesor => profesor.id == event.target.value);
    if (selectedProfesor && !this.selectedProfesores.includes(selectedProfesor)) {
      this.selectedProfesores.push(selectedProfesor);
    }
  }

  // Funciones para eliminar de la lista seleccionada
  removeAsignatura(asignatura: any): void {
    const index = this.selectedAsignaturas.indexOf(asignatura);
    if (index > -1) {
      this.selectedAsignaturas.splice(index, 1);
    }
  }

  removeEntidad(entidad: any): void {
    const index = this.selectedEntidades.indexOf(entidad);
    if (index > -1) {
      this.selectedEntidades.splice(index, 1);
    }
  }

  removeMeta(meta: any): void {
    const index = this.selectedMetas.indexOf(meta);
    if (index > -1) {
      this.selectedMetas.splice(index, 1);
    }
  }

  removeProfesor(profesor: any): void {
    const index = this.selectedProfesores.indexOf(profesor);
    if (index > -1) {
      this.selectedProfesores.splice(index, 1);
    }
  }


  save() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log("Formulario inválido");
    }
  }

}