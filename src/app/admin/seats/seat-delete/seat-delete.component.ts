import { Component } from '@angular/core';
import { SeatDTO } from '../../../models/SeatDTO';
import { SeatService } from '../../../services/seat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-seat-delete',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './seat-delete.component.html',
  styleUrl: './seat-delete.component.css'
})
export class SeatDeleteComponent {
  seats: SeatDTO[] = [];
  selectedSeat: SeatDTO | null = null;
  message: string = '';
  isError: boolean = false;

  constructor(private seatService: SeatService) {}

  ngOnInit(): void {
    this.seatService.getSeats().subscribe({
      next: (data) => {
        this.seats = data;
      },
      error: (err) => {
        this.message = `Error: ${err.message}`;
        this.isError = true;
      }
    });
  }

  selectSeat(seat: SeatDTO): void {
    this.selectedSeat = seat;
    this.message = ''; 
    this.isError = false;
  }

  // Koltuğu silme
  deleteSeat(): void {
    if (this.selectedSeat) {
      this.seatService.deleteSeat(this.selectedSeat.row, this.selectedSeat.number).subscribe({
        next: () => {
          this.message = 'Seat deleted successfully!';
          this.isError = false;
          this.seats = this.seats.filter(s => !(s.row === this.selectedSeat!.row && s.number === this.selectedSeat!.number));
          this.selectedSeat = null;
        },
        error: (err) => {
          this.message = `Error: ${err.message}`;
          this.isError = true;
        }
      });
    }
  }
}
