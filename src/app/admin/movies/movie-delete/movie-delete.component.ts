import { Component } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-delete',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './movie-delete.component.html',
  styleUrl: './movie-delete.component.css'
})
export class MovieDeleteComponent {
  searchTitle: string = ''; 
  movies: any[] = [];  
  selectedMovie: any = null; 
  errorMessage: string = ''; 
  message: string = '';

  constructor(private movieService: MovieService) {}

  onSearch() {
    this.movieService.searchMoviesByTitle(this.searchTitle)
      .subscribe(
        (movies) => {
          this.movies = movies;
        },
        (error) => {
          this.errorMessage= error.message;
        }
      );
  }

  selectMovie(movie: any) {
    this.selectedMovie = movie;
    this.errorMessage = ''; 
  }

  deleteMovie() {
    if (this.selectedMovie) {
      this.movieService.deleteMovieByTitle(this.selectedMovie.title)
        .subscribe(
          () => {
            this.message = `Movie with title "${this.selectedMovie.title}" has been successfully deleted.`;
            this.errorMessage='';
            this.selectedMovie = null;
            this.movies = [];
          },
          (error) => {
            this.errorMessage= error.message;
          }
        );
    }
  }
}
