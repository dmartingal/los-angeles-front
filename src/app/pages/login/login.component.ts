import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  // Importamos FormsModule para usar [(ngModel)] y CommonModule para el *ngIf
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Variables para el formulario
  username = '';
  password = '';
  
  // Para mostrar mensajes de error al usuario
  errorMessage = '';
  isLoading = false;

  private authService = inject(AuthService);

  onLogin() {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.isLoading = false;
        // La redirección ya la hace el AuthService con el router.navigate(['/'])
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error en login:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos. Inténtalo de nuevo.';
      }
    });
  }
}