import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule,Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-userlogin',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterModule,FormsModule,HttpClientModule,CommonModule],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe(
      (response) => {
        this.authService.saveToken(response.token);
        this.authService.saveEmail(credentials.email)  
        this.router.navigate(['/home']);
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Wrong mail or password.';
        } else {
          this.errorMessage = 'Login error.';
        }
      }
    );
  }
}
