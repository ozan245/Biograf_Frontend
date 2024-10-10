export class ShowtimeDTO {
    time: string;
    movieId: number;
    hallId: number;
  
    constructor(time: string, movieId: number, hallId: number) {
      this.time = time;
      this.movieId = movieId;
      this.hallId = hallId;
    }
  }
  