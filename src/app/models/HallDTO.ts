import { SeatDTO } from "./SeatDTO";

export class HallDTO {
    name: string;
    capacity: number;
    cinemaId: number;  
    seats?: SeatDTO[];  
  
    constructor(name: string, capacity: number, cinemaId: number, seats?: SeatDTO[]) {
      this.name = name;
      this.capacity = capacity;
      this.cinemaId = cinemaId;
      this.seats = seats;
    }
  }