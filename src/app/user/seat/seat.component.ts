import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeatDTO } from '../../models/SeatDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatService } from '../../services/seat.service';
import { HallService } from '../../services/hall.service';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  seats: SeatDTO[] = [];
  selectedSeats: number[] = [];
  showtimeId!: number;
  hallId!: number; 
  errorMessage: string = '';

  constructor(
    private seatService: SeatService,
    private hallService: HallService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showtimeId = +this.route.snapshot.paramMap.get('selectedShowtimeId')!;
    this.getHallIdByShowtime();
  }

  getHallIdByShowtime(): void {
    this.hallService.getHallIdByShowtimeId(this.showtimeId).subscribe(
      (hallId) => {
        this.hallId = hallId;
        this.getSeats();
      },
      (error) => {
        this.errorMessage = 'Error fetching hall information';
      }
    );
  }

  getSeats(): void {
    this.seatService.getSeatsByHallAndShowtime(this.hallId, this.showtimeId).subscribe(
      (seats) => {
        this.seats = seats;
      },
      (error) => {
        this.errorMessage = 'Error fetching seats';
      }
    );
  }

  uniqueRows(): string[] {
    const rows = this.seats.map(seat => seat.row);
    return Array.from(new Set(rows));
  }
  
  toggleSeatSelection(seatId: number): void {
    const index = this.selectedSeats.indexOf(seatId);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);  
    } else {
      this.selectedSeats.push(seatId);  
    }
    console.log(this.selectedSeats);
  }

  proceedToReservation(): void {
    if (this.selectedSeats.length === 0) {
      this.errorMessage = 'Please select at least one seat.';
      return;
    }
    const selectedSeatsString = JSON.stringify(this.selectedSeats);
    this.router.navigate(['/reservation'], {
      queryParams: {
        showtimeId: this.showtimeId,
        selectedSeats: selectedSeatsString
      }
    });
  }
}
