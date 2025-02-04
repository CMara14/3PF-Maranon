import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  linkItems: { label: string; routerLink: string }[] = [
    {
      label: 'Inicio',
      routerLink: 'home',
    },
    {
      label: 'Estudiantes',
      routerLink: 'students',
    },
    {
      label: 'Cursos',
      routerLink: 'courses',
    },
  ];

}
