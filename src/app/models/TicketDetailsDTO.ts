export class TicketDetailsDTO {
    purchaseDate: Date;  
    cinemaName: string;  
    hallName: string; 
    movieTitle: string;
    showtimeTime: Date;  
    seats: string[];  
  
    constructor(
      purchaseDate: Date,
      cinemaName: string,
      hallName: string,
      movieTitle: string,
      showtimeTime: Date,
      seats: string[],
    ) {
      this.purchaseDate = purchaseDate;
      this.cinemaName = cinemaName;
      this.hallName = hallName;
      this.movieTitle = movieTitle;
      this.showtimeTime = showtimeTime;
      this.seats = seats;  
    }
  }
  