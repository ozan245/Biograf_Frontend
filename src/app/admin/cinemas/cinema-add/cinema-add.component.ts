import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CinemaDTO } from '../../../models/CinemaDTO';
import { CinemaService } from '../../../services/cinema.service';

@Component({
  selector: 'app-cinema-add',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './cinema-add.component.html',
  styleUrl: './cinema-add.component.css'
})
export class CinemaAddComponent {

  cinema: CinemaDTO = { name: '', location: '' };
  message: string = '';
  isError: boolean = false;

  constructor(private cinemaService: CinemaService) {}

  addCinema() {
    this.cinemaService.addCinema(this.cinema)
      .subscribe(
        () => {
          this.message = `Cinema "${this.cinema.name}" has been added successfully.`;
          this.isError = false;
          this.cinema = { name: '', location: '' };
        },
        (error) => {
          this.message = error.message;
          this.isError = true;
        }
      );
  }
}
