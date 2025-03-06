import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciativaService } from '../../services/iniciativa.service';
import { Iniciativa } from '../../models/iniciativa';


@Component({
  selector: 'app-main-initiatives-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-initiatives-info.component.html',
  styleUrl: './main-initiatives-info.component.scss'
})
export class MainInitiativesInfoComponent {
  iniciativas: Iniciativa[]=[];
  
  constructor(private iniciativaService: IniciativaService) {
  }

  ngOnInit(): void {
    this.iniciativas = this.iniciativaService.Iniciativas;
  }

  edit() {
    console.log("Editando tarjeta");
  }

  delete(id: number) {
    console.log("Borrando tarjeta con id: " + id);
    this.iniciativaService.deleteIniciativaById(Number(id));
    this.iniciativas = this.iniciativaService.Iniciativas;
  }

} 