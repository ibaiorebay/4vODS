import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  cards = [
    { title: 'Proyecto 1', description: 'Descripción del proyecto 1' },
    { title: 'Proyecto 2', description: 'Descripción del proyecto 2' },
    { title: 'Proyecto 3', description: 'Descripción del proyecto 3' }
  ];
}
