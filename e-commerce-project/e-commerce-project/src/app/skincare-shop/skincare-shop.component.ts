import { Component } from '@angular/core';
import { AdminComponent } from "../admin/admin.component";
import { SkincareComponent } from '../skincare/skincare.component';

@Component({
  selector: 'app-skincare-shop',
  standalone: true,
  imports: [AdminComponent,SkincareComponent],
  templateUrl: './skincare-shop.component.html',
  styleUrl: './skincare-shop.component.scss'
})
export class SkincareShopComponent {

}
