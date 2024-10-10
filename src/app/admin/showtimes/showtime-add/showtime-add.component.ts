import { Component } from '@angular/core';
import { ShowtimeDTO } from '../../../models/ShowtimeDTO';
import { ShowtimeService } from '../../../services/showtime.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showtime-add',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './showtime-add.component.html',
  styleUrl: './showtime-add.component.css'
})
export class ShowtimeAddComponent {
  showtime: ShowtimeDTO = new ShowtimeDTO('', 0, 0);
  message: string = '';
  isError: boolean = false;

  constructor(private showtimeService: ShowtimeService) {}

  addShowtime(): void {
    this.showtimeService.addShowtime(this.showtime).subscribe({
      next: (response) => {
        this.message = 'Showtime added successfully!';
        this.isError = false;
      },
      error: (error) => {
        this.message = error.message;
        this.isError = true;
      }
    });
  }
}
