export class SeatDTO {
    id?: number;
    row: string;
    number: number;
    isReserved: boolean;
    hallId: number; 
  
    constructor(row: string, number: number, isReserved: boolean, hallId: number) {
      this.row = row;
      this.number = number;
      this.isReserved = isReserved;
      this.hallId = hallId;
    }
  }
  