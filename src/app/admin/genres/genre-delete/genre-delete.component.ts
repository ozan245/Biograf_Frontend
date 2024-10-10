import { Component } from '@angular/core';
import { GenreService } from '../../../services/genre.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-delete',
  standalone: true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './genre-delete.component.html',
  styleUrls: ['./genre-delete.component.css']
})
export class GenreDeleteComponent {
  genres: any[] = [];
  selectedGenre: any = null;
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
    this.message = '';
  }

  deleteGenre() {
    if (this.selectedGenre) {
      this.genreService.deleteGenreByName(this.selectedGenre.name)
        .subscribe(
          () => {
            this.message = `Genre "${this.selectedGenre.name}" has been deleted.`;
            this.isError = false;
            this.genres = this.genres.filter(g => g.name !== this.selectedGenre.name);
            this.selectedGenre = null;
          },
          (error) => {
            this.message = error.message;
            this.isError = true;
          }
        );
    }
  }
}
