import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  activeSection: string = 'addMovie'; 
  

  showSection(section: string) {
    this.activeSection = section;
  }

  private openMenu: number | null = null;

  toggleMenu(menuId: number) {
    if (this.openMenu === menuId) {
      this.openMenu = null;  
    } else {
      this.openMenu = menuId; 
    }
  }

  isMenuOpen(menuId: number): boolean {
    return this.openMenu === menuId;
  }

  email: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.email = this.authService.getEmail(); 
  }

  logout(): void {
    this.authService.logout();
  }

}
  
