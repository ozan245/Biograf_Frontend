import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const role = this.authService.getRole();
      if (role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else if (role === 'user') {
        this.router.navigate(['/home']);
      }
      return false;
    }
    
    return true;
  }

}
