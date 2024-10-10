import { Component } from '@angular/core';
import { CinemaService } from '../../../services/cinema.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cinema-delete',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './cinema-delete.component.html',
  styleUrl: './cinema-delete.component.css'
})
export class CinemaDeleteComponent {

  cinemas: any[] = [];
  selectedCinema: any = null;
  message: string = '';
  isError: boolean = false;

  constructor(private cinemaService: CinemaService) {
    this.loadCinemas();
  }

  loadCinemas() {
    this.cinemaService.getCinemas()
      .subscribe(
        (cinemas) => {
          this.cinemas = cinemas;
        },
        (error) => {
          this.message = error.message;
          this.isError = true;
        }
      );
  }

  selectCinema(cinema: any) {
    this.selectedCinema = cinema;
    this.message = ''; 
  }

  deleteCinema() {
    if (this.selectedCinema) {
      this.cinemaService.deleteCinemaByName(this.selectedCinema.name)
        .subscribe(
          () => {
            this.message = `Cinema "${this.selectedCinema.name}" has been deleted.`;
            this.isError = false;
            this.cinemas = this.cinemas.filter(c => c.name !== this.selectedCinema.name);
            this.selectedCinema = null; 
          },
          (error) => {
            this.message = error.message;
            this.isError = true;
          }
        );
    }
  }
}
