import { Routes } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AdminComponent } from './admin/admin.component';
import { ShopComponent } from './shop/shop.component';
import { SkincareShopComponent } from './skincare-shop/skincare-shop.component';
import { SkincareComponent } from './skincare/skincare.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { RegisterComponent } from './register/register.component';

import { RoleGuard } from './guards/role.guard';


export const routes: Routes = [
  
        { 
        path: 'admin', 
        component: AdminComponent, 
        canActivate: [RoleGuard],
        data: { expectedRole: 'ADMIN' },

      
    children: [
      { path: "admin-product", component: AdminProductComponent },
      { path: "", component: AdminProductComponent },

    ]},
    {path:'mainpage', component : MainpageComponent},
    {path:'shop', component : ShopComponent},
    {path:'skincare-shop', component : SkincareShopComponent},
    {path:'', component : MainpageComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:'skincare', component : SkincareComponent},
    {path:'admin-product', component : AdminProductComponent},
];
