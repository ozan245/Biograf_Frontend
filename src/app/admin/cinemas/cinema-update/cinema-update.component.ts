import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CinemaDTO } from '../../../models/CinemaDTO';
import { CinemaService } from '../../../services/cinema.service';

@Component({
  selector: 'app-cinema-update',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cinema-update.component.html',
  styleUrl: './cinema-update.component.css'
})
export class CinemaUpdateComponent {

  cinemas: CinemaDTO[] = [];
  selectedCinema: any = null;
  newName: string = '';
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
    this.selectedCinema = { ...cinema }; 
    this.newName = cinema.name; 
    this.message = ''; 
  }

  updateCinema() {
    if (this.selectedCinema) {
      this.cinemaService.updateCinemaByName(this.selectedCinema.name, { name: this.newName, location: this.selectedCinema.location })
        .subscribe(
          () => {
            this.message = `Cinema "${this.selectedCinema.name}" has been updated to "${this.newName}".`;
            this.isError = false;
            this.selectedCinema.name = this.newName;
          },
          (error) => {
            this.message = error.message;
            this.isError = true;
          }
        );
    }
  }
}
