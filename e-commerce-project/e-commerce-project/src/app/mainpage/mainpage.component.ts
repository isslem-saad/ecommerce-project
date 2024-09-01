import { OnInit, Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ShopComponent } from '../shop/shop.component';
import { SkincareShopComponent } from '../skincare-shop/skincare-shop.component';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VideoGalleryComponent } from '../video-gallery/video-gallery.component';
//import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [FooterComponent, ShopComponent, SkincareShopComponent, NavbarComponent,RouterLink,RouterLinkActive,RouterOutlet,VideoGalleryComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss'
})
export class MainpageComponent  implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
}