import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MovieDTO } from '../../models/MovieDTO';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { GenreService } from '../../services/genre.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  activeMovies: MovieDTO[] = [];
  filteredMovies: MovieDTO[] = [];
  genres: { id: number; name: string }[] = [];
  selectedGenre: number = 0;
  searchTitle: string = '';
  errorMessage: string = '';
  email: string | null = '';

  constructor(
    private movieService: MovieService,
    private genreService: GenreService,
    private router: Router,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadGenres();
    this.email=this.authService.getEmail();
  }

  loadMovies(): void {
    this.movieService.getActiveMovies().subscribe(
      (movies) => {
        this.activeMovies = movies;
        this.filteredMovies = movies;
        this.errorMessage = '';
        console.log(movies);
      },
      (error) => {
        this.errorMessage = 'Error loading active movies.';
        console.error('Error loading movies:', error);
      }
    );
  }

  loadGenres(): void {
    this.genreService.getGenres().subscribe(
      (genres) => {
        this.genres = genres;
      },
      (error) => {
        this.errorMessage = 'Error loading genres.';
      }
    );
  }

  filterMovies(): void {
    let filtered = this.activeMovies;

  if (Number(this.selectedGenre) === 0) {
    filtered = this.activeMovies;
  } 
  
  else if (this.selectedGenre !== 0) {
    filtered = filtered.filter((movie) => {
      return movie.genreIds && movie.genreIds.includes(Number(this.selectedGenre));
    });
  }
  
    if (this.searchTitle && this.searchTitle.trim() !== '') {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(this.searchTitle.toLowerCase())
      );
    }
  
    this.filteredMovies = filtered;
  
    console.log('Filtered Movies:', this.filteredMovies);
  
    if (this.filteredMovies.length === 0) {
      this.errorMessage = 'No movies found for the selected filters.';
    } else {
      this.errorMessage = '';
    }
    this.cdr.detectChanges();
  }
  
  bookMovie(movieId: number | undefined): void {
    if (movieId) {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/showtime', movieId]);
      } else {
        alert('You are not logged in. Please log in or sign up to book a movie.');
        this.router.navigate(['/userlogin']);
      }
    } else {
      this.errorMessage = 'Invalid movie ID';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  login(): void {
    this.router.navigate(['/userlogin']);
  }

  signup(): void {
    this.router.navigate(['/usersignup']);
  }
}
