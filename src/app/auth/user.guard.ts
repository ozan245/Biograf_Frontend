import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    if (this.authService.isAuthenticated() && role === 'User') {
      return true;
    } else {
      this.router.navigate(['/userlogin']);
      return false;
    }
  }
}
