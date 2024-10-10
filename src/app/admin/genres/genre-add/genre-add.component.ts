import { Component } from '@angular/core';
import { GenreService } from '../../../services/genre.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-add',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './genre-add.component.html',
  styleUrls: ['./genre-add.component.css']
})
export class GenreAddComponent {
  genreName: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(private genreService: GenreService) {}

  addGenre() {
    this.genreService.addGenre(this.genreName)
      .subscribe(
        () => {
          this.message = `Genre "${this.genreName}" has been added successfully.`;
          this.isError = false;
          this.genreName = ''; 
        },
        (error) => {
          this.message = error.message;
          this.isError = true;
        }
      );
  }
}
