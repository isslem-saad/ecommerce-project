import { Component } from '@angular/core';
import { MakeupComponent } from '../makeup/makeup.component';
import { TypeMakeup } from '../models/type-makeup.enum';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MakeupComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  selectedMakeupType: TypeMakeup | null = null;
  TypeMakeup = TypeMakeup;

  filterMakeupByType(type: TypeMakeup | null) {
    this.selectedMakeupType = type;
  }
}