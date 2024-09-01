import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Product } from '../models/product.model';
import { AuthService } from '../services/auth.service';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterModule, RouterOutlet,AdminProductComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateAuthStatus();
  }

  updateAuthStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.getUserRole() === 'ADMIN';
  }

 
logout() {
  this.authService.logout();
  this.updateAuthStatus();
  this.router.navigate(['/login']);
}

  }