import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-principal.component.html',
  styleUrl: './main-principal.component.scss'
})
export class MainPrincipalComponent {
  listaFotos: string[] = [
    "../../assets/ods/S-WEB-Goal-01.png",
    "../../assets/ods/S-WEB-Goal-02.png",
    "../../assets/ods/S-WEB-Goal-03.png",
    "../../assets/ods/S-WEB-Goal-04.png",
    "../../assets/ods/S-WEB-Goal-05.png",
    "../../assets/ods/S-WEB-Goal-06.png",
    "../../assets/ods/S-WEB-Goal-07.png",
    "../../assets/ods/S-WEB-Goal-08.png",
    "../../assets/ods/S-WEB-Goal-09.png",
    "../../assets/ods/S-WEB-Goal-10.png",
    "../../assets/ods/S-WEB-Goal-11.png",
    "../../assets/ods/S-WEB-Goal-12.png",
    "../../assets/ods/S-WEB-Goal-13.png",
    "../../assets/ods/S-WEB-Goal-14.png",
    "../../assets/ods/S-WEB-Goal-15.png",
    "../../assets/ods/S-WEB-Goal-16.png",
    "../../assets/ods/S-WEB-Goal-17.png",    
  ];
}
