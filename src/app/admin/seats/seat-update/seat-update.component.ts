import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeatDTO } from '../../../models/SeatDTO';
import { SeatService } from '../../../services/seat.service';

@Component({
  selector: 'app-seat-update',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './seat-update.component.html',
  styleUrl: './seat-update.component.css'
})
export class SeatUpdateComponent {
  seats: SeatDTO[] = [];
  selectedSeat: SeatDTO | null = null;
  message: string = '';
  isError: boolean = false;

  constructor(private seatService: SeatService) {}

  ngOnInit(): void {
    this.seatService.getSeats().subscribe(data => {
      this.seats = data;
    }, error => {
      this.message = `Error: ${error.message}`;
      this.isError = true;
    });
  }

  selectSeat(seat: SeatDTO): void {
    this.selectedSeat = seat;
    this.message = '';
    this.isError = false;
  }

  updateSeat(): void {
    if (this.selectedSeat) {
      this.seatService.updateSeatById(this.selectedSeat.hallId, this.selectedSeat).subscribe({
        next: () => {
          this.message = 'Seat updated successfully!';
          this.isError = false;
        },
        error: (err) => {
          this.message = `Error: ${err.message}`;
          this.isError = true;
        }
      });
    }
  }
}
