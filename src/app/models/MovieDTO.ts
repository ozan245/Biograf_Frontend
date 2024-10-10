export class MovieDTO {
  id?: number;
  title: string;
  description?: string;
  duration: number;
  isActive: boolean;
  genreIds: number[]; 
  imageFile?: File; 
  imagePath?: string; 

  constructor() {
    this.title = '';
    this.description = '';
    this.duration = 0;
    this.isActive = true;
    this.genreIds = [];
    this.imagePath = ''; 
  }
}
