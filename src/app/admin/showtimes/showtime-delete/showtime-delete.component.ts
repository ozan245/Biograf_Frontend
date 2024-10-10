import { Component } from '@angular/core';
import { ShowtimeDTO } from '../../../models/ShowtimeDTO';
import { ShowtimeService } from '../../../services/showtime.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showtime-delete',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './showtime-delete.component.html',
  styleUrl: './showtime-delete.component.css'
})
export class ShowtimeDeleteComponent {
  showtimeId: number = 0;
  message: string = '';
  isError: boolean = false;

  constructor(private showtimeService: ShowtimeService) {}

  deleteShowtime(): void {
    if (this.showtimeId > 0) {
      this.showtimeService.deleteShowtime(this.showtimeId).subscribe({
        next: (response) => {
          this.message = 'Showtime deleted successfully!';
          this.isError = false;
        },
        error: (error) => {
          this.message = error.message;
          this.isError = true;
        }
      });
    } else {
      this.message = 'Invalid Showtime ID.';
      this.isError = true;
    }
  }
}
