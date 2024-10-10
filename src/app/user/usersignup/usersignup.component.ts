import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/UserDTO';

@Component({
  selector: 'app-usersignup',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './usersignup.component.html',
  styleUrl: './usersignup.component.css'
})
export class UsersignupComponent implements OnInit{
  signupForm!: FormGroup;
  signupSuccess: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const userDto = new UserDTO(
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password
      );

      this.userService.addUser(userDto).subscribe(
        (response) => {
          console.log('Signup successful:', response);
          this.signupSuccess = true;
          this.router.navigate(['/userlogin']);
        },
        (error) => {
          console.error('Signup failed:', error);
          this.errorMessage = 'Signup failed. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
