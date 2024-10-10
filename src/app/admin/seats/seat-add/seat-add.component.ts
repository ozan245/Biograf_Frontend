import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeatDTO } from '../../../models/SeatDTO';
import { SeatService } from '../../../services/seat.service';

@Component({
  selector: 'app-seat-add',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './seat-add.component.html',
  styleUrl: './seat-add.component.css'
})
export class SeatAddComponent {
  seat: SeatDTO = new SeatDTO('', 0, false, 0); 
  message: string = '';
  isError: boolean = false;

  constructor(private seatService: SeatService) {}

  addSeat(): void {
    this.seatService.addSeat(this.seat).subscribe({
      next: () => {
        this.message = 'Seat added successfully!';
        this.isError = false;
      },
      error: (err) => {
        this.message = `Error: ${err.message}`;
        this.isError = true;
      }
    });
  }
}
