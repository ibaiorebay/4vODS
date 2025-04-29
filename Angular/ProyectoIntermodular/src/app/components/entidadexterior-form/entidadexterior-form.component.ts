import { Component } from '@angular/core';
import { EntidadExterior } from '../../models/entidad-exterior';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EntidadExteriorService } from '../../services/entidad-exterior.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-entidadexterior-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entidadexterior-form.component.html',
  styleUrl: './entidadexterior-form.component.scss'
})
export class EntidadexteriorFormComponent {

  entidadexterioresOpciones: EntidadExterior[] = [];
    form!: FormGroup;
    idEntidadeExtAEditar: number | null = null;
    mostrarModal: boolean = false;
  
    constructor(
      private fb: FormBuilder,
      private entidadExteriorService: EntidadExteriorService
    ) {
      this.entidadExteriorService.getEntidadesExt().subscribe((entidadesExt: any) => {
        console.log("Entidades ext recibidos:", entidadesExt);
        this.entidadexterioresOpciones = entidadesExt;
      });
  
      this.crearFormulario();
    }
  
    private crearFormulario(entidadExt?: EntidadExterior): void {
      this.form = this.fb.group({
        nombre: [entidadExt?.Nombre ?? '', [Validators.required]],
        descripcion: [entidadExt?.Descripcion ?? '', [Validators.required]],
      });
    }
  
    get nombreFrmControl() {
      return this.form.get('nombre');
    }
    
    get descripcionFrmControl() {
      return this.form.get('descripcion');
    }

    crearEntidadExterior(): void {
      this.idEntidadeExtAEditar = null;
      this.crearFormulario(); // reinicia el formulario
      this.mostrarModal = true;
    }
  
    cerrarModal(): void {
      this.mostrarModal = false;
    }
  
    editarEntidadExt(id: number): void {
      console.log("Editando entidadExt con id:", id);
      this.idEntidadeExtAEditar = id;
      const entidadExterior = this.entidadexterioresOpciones.find(entidadExt => entidadExt.Id === id);
      
      if (entidadExterior) {
        this.crearFormulario(entidadExterior);
        this.mostrarModal = true;
      }
    }
  
    eliminarEntidadExt(id: number): void {
      console.log("Borrando entidadExt con id:", id);
      this.entidadExteriorService.deleteEntidadExt(id).subscribe(() => {
        this.entidadexterioresOpciones = this.entidadexterioresOpciones.filter(p => p.Id !== id);
      });
    }
  
    save(): void {
      this.form.markAllAsTouched();
  
      if (!this.form.valid) {
        console.log("Formulario inválido");
        return;
      }
  
      const datosForm = this.form.value;
      let nuevaEntidadExt: EntidadExterior;
  
      if (this.idEntidadeExtAEditar !== null) {
        nuevaEntidadExt = new EntidadExterior(this.idEntidadeExtAEditar, datosForm.nombre, datosForm.descripcion);
  
        console.log("Actualizando entidadExt:", nuevaEntidadExt);
        this.entidadExteriorService.updateEntidadExt(this.idEntidadeExtAEditar, nuevaEntidadExt).subscribe(
          (response) => {
            console.log("entidadExt actualizado:", response);
            this.actualizarLista();
          },
          (error) => console.error("Error al actualizar la entidadExt:", error)
        );
  
      } else {
        // Puedes generar un ID con lógica temporal si no lo proporciona el backend
        nuevaEntidadExt = new EntidadExterior(Date.now(), datosForm.nombre, datosForm.descripcion);
  
        console.log("Creando nueva entidadExt:", nuevaEntidadExt);
        this.entidadExteriorService.createEntidadExt(nuevaEntidadExt).subscribe(
          (response) => {
            console.log("entidadExt creado:", response);
            this.actualizarLista();
          },
          (error) => console.error("Error al guardar la entidadExt:", error)
        );
      }
  
      this.mostrarModal = false;
    }
  
    private actualizarLista(): void {
      this.entidadExteriorService.getEntidadesExt().subscribe((entidadesExt: any) => {
        this.entidadexterioresOpciones = entidadesExt;
      });
    }
  
  
}
