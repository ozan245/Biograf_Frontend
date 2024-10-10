import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HallDTO } from '../../../models/HallDTO';
import { HallService } from '../../../services/hall.service';

@Component({
  selector: 'app-hall-update',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './hall-update.component.html',
  styleUrl: './hall-update.component.css'
})
export class HallUpdateComponent {

  halls: HallDTO[] = [];
  selectedHall: HallDTO | null = null;
  message: string = '';
  isError: boolean = false;

  constructor(private hallService: HallService) {}

  ngOnInit(): void {
    this.hallService.getHalls().subscribe(data => {
      this.halls = data;
    });
  }

  selectHall(hall: HallDTO): void {
    this.selectedHall = hall;
  }

  updateHall(): void {
    if (this.selectedHall) {
      this.hallService.updateHallByName(this.selectedHall.name, this.selectedHall).subscribe({
        next: () => {
          this.message = 'Hall updated successfully!';
          this.isError = false;
        },
        error: (err) => {
          this.message = err.message;
          this.isError = true;
        }
      });
    }
  }
}
