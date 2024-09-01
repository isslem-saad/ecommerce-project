// import { Component, OnInit } from '@angular/core';
// import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
// import { NavbarComponent } from './navbar/navbar.component';
// import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
// import { Product } from './models/product.model';
// import { CommonModule } from '@angular/common';
// import { AdminComponent } from './admin/admin.component';
// import { LoginComponent } from "./login/login.component";
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet, NavbarComponent, RouterLink, AdminComponent, LoginComponent, BrowserModule,
//     FormsModule,
//     HttpClientModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent implements OnInit {
//   ngOnInit(): void {
    
//   }
//   // public products?: Product[];


//   // constructor(private ecommerceService: EcommerceService) {}

//   // ngOnInit(): void {
//   //   console.log("test:");
//   //   this.getProducts();
//   //   console.log("test:",this.products)
//   // }

//   // public getProducts(): void {
//   //   this.ecommerceService.getProducts().subscribe(
//   //     (response: Product[]) => {
//   //       this.products = response;
//   //     },
//   //     (error: HttpErrorResponse) => {
//   //       alert(error.message);
//   //     }
//   //   );
//   // }
// }
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, FormsModule,CommonModule,
    HttpClientModule,
    ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAdminRoute: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.updateAuthStatus();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isAdminRoute = this.router.url.startsWith('/admin');
      this.updateAuthStatus();
    });
  }

  updateAuthStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.getUserRole() === 'ADMIN';
  }
}