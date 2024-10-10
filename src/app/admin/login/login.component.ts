import { Component, NgModule } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule,RouterLink,RouterModule,FormsModule,HttpClientModule,CommonModule]
})

export class LoginComponent {
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
        this.router.navigate(['/admin/dashboard/dasharea']);
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Wrong email or password.';
        } else {
          this.errorMessage = 'Error login.';
        }
      }
    );
  }
}