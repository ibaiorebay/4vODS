import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main-initiatives-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-initiatives-info.component.html',
  styleUrl: './main-initiatives-info.component.scss'
})
export class MainInitiativesInfoComponent {
  cards = [
    { title: 'Proyecto 1', description: 'Descripción del proyecto 1' },
    { title: 'Proyecto 2', description: 'Descripción del proyecto 2' },
    { title: 'Proyecto 3', description: 'Descripción del proyecto 3' }
  ];

  //Datos de prueba
  dataTest = [
    {
      "tipo_iniciativa": "Proyecto",
      "titulo": "Reciclaje Inteligente en Madrid",
      "curso": "24-25",
      "lider_proyecto": "Laura R.",
      "fecha_inicio": "2024-09-15",
      "fecha_fin": "2025-06-20",
      "clases": ["2ºDAW", "1ºASIR"],
      "modulos": ["Desarrollo Web de 2ºDAW", "Redes de 1ºASIR"],
      "agente_externo": "Ecoembes",
      "linkedin_publicado": "http://linkedin.com/proyecto-reciclaje",
      "otras_redes_sociales": ["Twitter (@ReciclajeMadrid)", "Instagram (@ecoMadrid)"],
      "explicacion": "El alumnado desarrollará una aplicación para mejorar la gestión del reciclaje en la ciudad.",
      "ubicacion": "Ayuntamiento de Madrid",
      "ods": [4, 11, 12],
      "meta": ["4.7", "11.6"],
      "accion_nueva": true,
      "mas_comentarios": "Se prevé colaboración con colegios.",
      "dimensiones": {
        "social": true,
        "economica": false,
        "ambiental": true
      }
    },
    {
      "tipo_iniciativa": "Proyecto",
      "titulo": "Inclusión digital en zonas rurales",
      "curso": "24-25",
      "lider_proyecto": "Juan C.",
      "fecha_inicio": "2024-11-01",
      "fecha_fin": "2025-04-30",
      "clases": ["1ºDAM", "2ºSMR"],
      "modulos": ["Programación de 1ºDAM", "Sistemas Operativos de 2ºSMR"],
      "agente_externo": "Fundación Telefónica",
      "linkedin_publicado": "http://linkedin.com/inclusion-digital",
      "otras_redes_sociales": ["Facebook (/InclusiónRural)", "TikTok (@digitalRural)"],
      "explicacion": "Estudiantes capacitan a personas mayores en el uso de tecnología.",
      "ubicacion": "Municipios rurales de Castilla y León",
      "ods": [4, 9],
      "meta": ["4.7", "9.c"],
      "accion_nueva": false,
      "mas_comentarios": "Se ampliará a más municipios en el futuro.",
      "dimensiones": {
        "social": true,
        "economica": true,
        "ambiental": false
      }
    },
    {
      "tipo_iniciativa": "Proyecto",
      "titulo": "Huerto Urbano Sostenible",
      "curso": "24-25",
      "lider_proyecto": "Sofía M.",
      "fecha_inicio": "2024-10-10",
      "fecha_fin": "2025-07-15",
      "clases": ["1ºBACH", "2ºESO"],
      "modulos": ["Biología de 1ºBACH", "Ciencias Naturales de 2ºESO"],
      "agente_externo": null,
      "linkedin_publicado": "http://linkedin.com/huerto-sostenible",
      "otras_redes_sociales": ["Instagram (@huertoeco)", "YouTube (/HuertoVerde)"],
      "explicacion": "Creación de un huerto ecológico en el centro educativo para fomentar la sostenibilidad.",
      "ubicacion": "Colegio San José",
      "ods": [4, 13, 15],
      "meta": ["4.7", "15.3"],
      "accion_nueva": true,
      "mas_comentarios": "Se incluirán talleres educativos.",
      "dimensiones": {
        "social": true,
        "economica": false,
        "ambiental": true
      }
    }
  ];


  edit() {
    console.log("Editando tarjeta");
  }

  delete() {
    console.log("Borrando tarjeta");
  }
  
}
