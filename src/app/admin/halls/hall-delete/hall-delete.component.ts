import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HallDTO } from '../../../models/HallDTO';
import { HallService } from '../../../services/hall.service';

@Component({
  selector: 'app-hall-delete',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './hall-delete.component.html',
  styleUrl: './hall-delete.component.css'
})
export class HallDeleteComponent {

  halls: HallDTO[] = [];
  selectedHall: HallDTO | null = null;
  message: string = '';
  isError: boolean = false;

  constructor(private hallService: HallService) {}

  ngOnInit(): void {
    this.hallService.getHalls().subscribe(data => {
      this.halls = data;
    }, error => {
      this.message = 'Error fetching halls';
      this.isError = true;
    });
  }

  selectHall(hall: HallDTO): void {
    this.selectedHall = hall;
    this.message = '';
    this.isError = false;
  }

  deleteHall(): void {
    if (this.selectedHall) {
      this.hallService.deleteHallByName(this.selectedHall.name).subscribe({
        next: () => {
          this.message = 'Hall deleted successfully!';
          this.isError = false;
          this.halls = this.halls.filter(h => h.name !== this.selectedHall!.name); 
          this.selectedHall = null;
        },
        error: (err) => {
          this.message = `Error: ${err.message}`;
          this.isError = true;
        }
      });
    }
  }
}
