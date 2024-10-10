import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketDetailsDTO } from '../../models/TicketDetailsDTO';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  ticketDetails!: TicketDetailsDTO;

  constructor(private ticketService: TicketService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const paymentId = +this.route.snapshot.paramMap.get('paymentId')!;
    this.ticketService.getTicketDetailsByPaymentId(paymentId).subscribe(ticket => {
      this.ticketDetails = ticket;
    });
  }

  sendTicketToEmail(): void {
    alert(`Ticket details sent to your email! 
           Cinema: ${this.ticketDetails.cinemaName} 
           Hall: ${this.ticketDetails.hallName} 
           Showtime: ${this.ticketDetails.showtimeTime}`);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
