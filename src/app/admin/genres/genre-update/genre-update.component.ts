import { Component } from '@angular/core';
import { GenreService } from '../../../services/genre.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-update',
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './genre-update.component.html',
  styleUrls: ['./genre-update.component.css']
})
export class GenreUpdateComponent {
  genres: any[] = [];
  selectedGenre: any = null;
  newName: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(private genreService: GenreService) {
    this.loadGenres();
  }

  loadGenres() {
    this.genreService.getGenres()
      .subscribe(
        (genres) => {
          this.genres = genres;
        },
        (error) => {
          this.message = error.message;
          this.isError = true;
        }
      );
  }

  selectGenre(genre: any) {
    this.selectedGenre = genre;
    this.newName = genre.name; 
    this.message = ''; 
  }

  updateGenre() {
    if (this.selectedGenre) {
      this.genreService.updateGenreByName(this.selectedGenre.name, this.newName)
        .subscribe(
          () => {
            this.message = `Genre "${this.selectedGenre.name}" has been updated to "${this.newName}".`;
            this.isError = false;
            this.selectedGenre.name = this.newName;
          },
          (error) => {
            this.message = error.message;
            this.isError = true;
          }
        );
    }
  }
}
