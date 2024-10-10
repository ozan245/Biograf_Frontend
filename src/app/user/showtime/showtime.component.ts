import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowtimeService } from '../../services/showtime.service';
import { CinemaService } from '../../services/cinema.service';

@Component({
  selector: 'app-showtime',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './showtime.component.html',
  styleUrl: './showtime.component.css'
})
export class ShowtimeComponent implements OnInit {
  movieId!: number;
  cinemas: any[] = [];
  showtimes: any[] = [];
  selectedCinemaId: number | null = null;
  selectedShowtimeId: number | null = null;
  errorMessage: string = '';

  constructor(
    private cinemaService: CinemaService,
    private showtimeService: ShowtimeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieId = +this.route.snapshot.paramMap.get('movieId')!;
    this.getCinemasByMovie();
  }

  getCinemasByMovie(): void {
    this.cinemaService.getCinemasByMovie(this.movieId).subscribe(
      (cinemas) => {
        this.cinemas = cinemas;
      },
      (error) => {
        this.errorMessage = 'Error fetching cinemas';
      }
    );
  }

  onCinemaChange(event: any): void {
    this.selectedCinemaId = Number(event.target.value);
    console.log('Selected Cinema ID:', this.selectedCinemaId);
    if (!isNaN(this.selectedCinemaId)) {
      this.getShowtimes();
    } else {
      this.errorMessage = 'Invalid cinema selection';
    }
  }

  getShowtimes(): void {
    if (this.selectedCinemaId && this.movieId) {
      this.showtimeService.getShowtimesByMovieAndCinema(this.movieId, this.selectedCinemaId).subscribe(
        (showtimes) => {
          this.showtimes = showtimes;
          console.log('Showtimes:', this.showtimes);
        },
        (error) => {
          this.errorMessage = 'Error fetching showtimes';
        }
      );
    }
  }

  onShowtimeChange(event: any): void {
    this.selectedShowtimeId = Number(event.target.value);
    console.log('Selected Showtime ID:', this.selectedShowtimeId);
  }

  proceedToSeatSelection(): void {
    if (this.selectedShowtimeId) {
      this.router.navigate(['/seat', this.selectedShowtimeId]);
    } else {
      this.errorMessage = 'Please select a showtime';
    }
  }
}
