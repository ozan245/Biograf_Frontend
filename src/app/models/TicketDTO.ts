export class TicketDTO {
  seatIds!: number[]; // Koltuk ID'si
  showtimeId!: number;  // Gösterim ID'si
  paymentId!: number;  // Ödeme ID'si
  purchaseDate!: Date;  // Satın alma tarihi
}
