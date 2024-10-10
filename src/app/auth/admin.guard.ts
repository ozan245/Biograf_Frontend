import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    
    if (this.authService.isAuthenticated() && role === 'Admin') {
      return true; 
    } 
    
    if (this.authService.isAuthenticated() && role === 'User') {
      this.router.navigate(['/userlogin']);  
      return false;
    }
    
    this.router.navigate(['/admin/login']);
    return false;
  }
  
}
