import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  linkItems: { label: string; routerLink: string; icon: string; }[] = [
    {
      label: 'Inicio',
      routerLink: 'home',
      icon: '',
    },
    {
      label: 'Estudiantes',
      routerLink: 'students',
      icon: '',
    },
    {
      label: 'Cursos',
      routerLink: 'courses',
      icon: '',
    },
    {
      label: 'Usuarios',
      routerLink: 'users',
      icon: '',
    },
  ];

  constructor(private authService: AuthService) {}
  logout(): void {
    this.authService.logout();
  }
}
