// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoleGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     const role = this.authService.getUserRole();
//     if (role === 'ADMIN') {
//       return true;
//     }
//     this.router.navigate(['/']);
//     return false;
//   }
// }
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = this.authService.getUserRole();

    if (!userRole || userRole !== expectedRole) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}