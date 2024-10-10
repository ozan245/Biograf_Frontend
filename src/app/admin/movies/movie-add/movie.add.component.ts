import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../../services/movie.service';
import { Router } from '@angular/router';
import { MovieDTO } from '../../../models/MovieDTO';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie.add',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule],
  templateUrl: './movie.add.component.html',
  styleUrl: './movie.add.component.css'
})

export class MovieAddComponent {
  movieForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = ''; 

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {
    this.movieForm = this.formBuilder.group({
      title: ['' ,Validators.required],
      description: [''],
      duration: ['' ,Validators.required],
      isActive: [true],
      genreIds: ['' ,Validators.required], 
      imageFile: [null] 
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.movieForm.patchValue({ imageFile: file });
  }

  submitForm() {
    const formData = new FormData();
    formData.append('title', this.movieForm.get('title')?.value);
    formData.append('description', this.movieForm.get('description')?.value);
    formData.append('duration', this.movieForm.get('duration')?.value);
    formData.append('isActive', this.movieForm.get('isActive')?.value);

    // Image file ekleme
    if (this.movieForm.get('imageFile')?.value) {
      formData.append('ImageFile', this.movieForm.get('imageFile')?.value);
    }

    const genreIdsString = this.movieForm.get('genreIds')?.value;
    const genreIdsArray = genreIdsString.split(',').map((id: string) => id.trim());
    genreIdsArray.forEach((id: string) => formData.append('GenreIds', id));

    this.movieService.addMovie(formData).subscribe(
      (response) => {
        this.successMessage = 'Movie added successfully!';
        this.errorMessage = '';
        this.movieForm.reset();   
      },
      (error) => {
        this.errorHandler.handleError(error).subscribe(
          (errorMessage: Error) => {
            this.errorMessage = errorMessage.message;
            this.successMessage = '';  
          }
        );
      }
    );
  }
}
