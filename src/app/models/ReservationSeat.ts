export class ReservationSeat {
  reservationId?: number; // Opsiyonel, sistem tarafından oluşturulabilir.
  seatId: number; // Seçilen koltuk ID'si, undefined olamaz
  showtimeId: number; // Seçilen gösterim ID'si
  reservationTime: Date; // Rezervasyon zamanı

  constructor(seatId: number, showtimeId: number, reservationTime: Date) {
    this.seatId = seatId;
    this.showtimeId = showtimeId;
    this.reservationTime = reservationTime;
  }
}
