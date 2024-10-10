import { Component } from '@angular/core';
import { ShowtimeDTO } from '../../../models/ShowtimeDTO';
import { ShowtimeService } from '../../../services/showtime.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showtime-update',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './showtime-update.component.html',
  styleUrl: './showtime-update.component.css'
})
export class ShowtimeUpdateComponent {
  showtime: ShowtimeDTO = new ShowtimeDTO('', 0, 0);
  message: string = '';
  isError: boolean = false;
  showtimeId: number = 0;

  constructor(private showtimeService: ShowtimeService) {}

  updateShowtime(): void {
    if (this.showtimeId > 0) {
      this.showtimeService.updateShowtime(this.showtimeId, this.showtime).subscribe({
        next: (response) => {
          this.message = 'Showtime updated successfully!';
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
