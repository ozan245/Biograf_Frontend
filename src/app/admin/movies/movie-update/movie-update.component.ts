import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../../services/movie.service';
import { CommonModule } from '@angular/common';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit {
  movieForm: FormGroup;
  searchTitle: string = '';
  movieTitle: string = '';
  movies: any[] = [];
  selectedMovie: any;
  errorMessage: string = ''; 

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {
    this.movieForm = this.formBuilder.group({
      title: [''],
      description: [''],
      duration: [''],
      isActive: [true],
      genreIds: [[]],
      imageFile: [null]
    });
  }

  ngOnInit(): void {
    this.movieTitle = this.route.snapshot.paramMap.get('title') || '';
    if (this.movieTitle) {
      this.movieService.searchMoviesByTitle(this.movieTitle).subscribe(
        (movies) => {
          if (movies.length > 0) {
            this.selectedMovie = movies[0];
            this.movieForm.patchValue({
              title: this.selectedMovie.title,
              description: this.selectedMovie.description,
              duration: this.selectedMovie.duration,
              isActive: this.selectedMovie.isActive,
              genreIds: this.selectedMovie.genreIds
            });
          }
        },
        (error) => {
          this.errorMessage = `Error: ${error.message}`;
        }
      );
    }
  }

  onSearch() {
    if (this.searchTitle.length > 2) {
      this.movieService.searchMoviesByTitle(this.searchTitle).subscribe(
        (response) => {
          this.movies = response;
          this.errorMessage = '';
        },
        (error) => {
          console.log(error);
          this.errorMessage= error.message;
        }
      );
    } else {
      this.movies = [];
    }
  }

  selectMovie(movie: any) {
    this.selectedMovie = movie;
    this.movieForm.patchValue({
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      isActive: movie.isActive,
      genreIds: movie.genreIds
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

    if (this.movieForm.get('imageFile')?.value) {
      formData.append('ImageFile', this.movieForm.get('imageFile')?.value);
    }

    const genreIdsString = this.movieForm.get('genreIds')?.value;
    const genreIdsArray = genreIdsString.split(',').map((id: string) => id.trim());
    genreIdsArray.forEach((id: string) => formData.append('GenreIds', id));

    this.movieService.updateMovieByName(this.selectedMovie.title, formData).subscribe(
      (response) => {
        console.log('Movie updated successfully');
        this.errorMessage = ''; 
        this.selectedMovie = null;
        this.movies = []; 
        this.searchTitle = '';
      },
      (error) => {
        this.errorMessage= `Error: ${error}`;
      }
    );
  }
}
