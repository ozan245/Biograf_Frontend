import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Router , ActivatedRoute} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ShowtimeService } from '../../services/showtime.service';
import { PaymentService } from '../../services/payment.service';
import { TicketService } from '../../services/ticket.service';
import { TicketDTO } from '../../models/TicketDTO';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit{
  selectedSeats: number[] = [];
  showtimeId!: number;
  errorMessage: string = '';
  userId!: number; 
  showtimeDetails: any; 
  cardNumber: string = ''; 

  constructor(private router: Router, 
    private reservationService: ReservationService,
    private route: ActivatedRoute, 
    private authService: AuthService,
    private showtimeService: ShowtimeService,
    private paymentService: PaymentService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
      this.showtimeId = +params['showtimeId'] || 0;

      const selectedSeatsString = params['selectedSeats'];
      this.selectedSeats = selectedSeatsString ? JSON.parse(selectedSeatsString) : [];
    
      const storedUserId = this.authService.getUserId();
      if(storedUserId != null)
      this.userId=storedUserId
      console.log('Showtime ID:', this.showtimeId);
      console.log('Selected Seats:', this.selectedSeats);
      console.log('User ID:', this.userId);

      this.showtimeService.getShowtimeDetails(this.showtimeId).subscribe(
        (details) => {
          this.showtimeDetails = details;
        },
        (error) => {
          this.errorMessage = 'Error fetching showtime details.';
        }
      );
    });
  }

  processPayment() {
    const paymentData = {
      amount: this.selectedSeats.length * 110, 
      userId: this.userId,
      paymentDate: new Date()
    };

    this.paymentService.processPayment(paymentData).subscribe(
      (paymentResponse) => {
        console.log('Payment Response:', paymentResponse);
        if (!paymentResponse || !paymentResponse.id) {
          
          this.errorMessage = 'Invalid payment response.';
          return;
        
        }

        const reservation = {
          userId: this.userId,
          seatIds: this.selectedSeats,
          showtimeId: this.showtimeId,
          reservationTime: new Date()
        };

        this.reservationService.addReservationWithSeats(reservation).subscribe(
          (reservationResponse) => {
            console.log('Reservation Response:', reservationResponse)
            if (!reservationResponse) {
              
              this.errorMessage = 'Invalid reservation response.';
              return;
            }
          
            const ticketData = {
              seatIds: this.selectedSeats,
              showtimeId: this.showtimeId,
              paymentId: paymentResponse.id,
              reservationId: reservationResponse.reservationId,
              purchaseDate: new Date() 
            };

            console.log('Ticket Data:', ticketData);
            this.ticketService.addTicket(ticketData).subscribe(
              (ticketResponse) => {
                if (!ticketResponse) {
                  this.errorMessage = 'Ticket creation failed.';
                  return;
                }
               
                this.router.navigate(['/ticket', paymentResponse.id]);
              },
              (ticketError) => {
                this.errorMessage = 'Ticket creation failed.';
                console.error('Ticket creation error:', ticketError);
                console.error('Ticket creation error:', JSON.stringify(ticketError));
              }
            );
          },
          (reservationError) => {
            this.errorMessage = 'Reservation failed.';
            console.error('Reservation error:', reservationError);
          }
        );
      },
      (paymentError) => {
        this.errorMessage = 'Payment failed.';
        console.error('Payment error:', paymentError);
      }
    );
  }
}