import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieDTO } from '../../models/MovieDTO';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-dasharea',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './dasharea.html',
  styleUrl: './dasharea.css'
})
export class DashAreaComponent {
movies: MovieDTO[] = [];
  selectedMovie?: MovieDTO;
  message: string = '';
  isError: boolean = false;
  imageFile?: File;

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (error) => {
        this.message = error.message;
        this.isError = true;
      }
    });
  }

  onUpdateMovie(title: string): void {
    this.router.navigate(['moviesupdate', title]); 
  }

}