import { Component } from '@angular/core';
import { HallDTO } from '../../../models/HallDTO';
import { HallService } from '../../../services/hall.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hall-add',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './hall-add.component.html',
  styleUrl: './hall-add.component.css'
})
export class HallAddComponent {
  hall: HallDTO = {
    name: '',
    capacity: 0,
    cinemaId: 0
  };
  message: string = '';
  isError: boolean = false;

  constructor(private hallService: HallService) {}

  addHall(): void {
    this.hallService.addHall(this.hall).subscribe({
      next: () => {
        this.message = 'Hall added successfully!';
        this.isError = false;
      },
      error: (err) => {
        this.message = err.message;
        this.isError = true;
      }
    });
  }
}
