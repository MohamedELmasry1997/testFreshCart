
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { pathGuard } from './path.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { MyBrandDetailsComponent } from './components/my-brand-details/my-brand-details.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetPasswordComponent },

  { path: 'home', component: HomeComponent, canActivate: [pathGuard] },
  { path: 'cart', component: CartComponent, canActivate: [pathGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [pathGuard] },
  { path: 'brands', component: BrandsComponent, canActivate: [pathGuard] },
  { path: 'brandDetails/:id', component: MyBrandDetailsComponent, canActivate: [pathGuard] },
  
  
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [pathGuard],
  },

  {
    path: 'details/:id',
    component: ProductDetailsComponent,
    canActivate: [pathGuard],
  },

  { path: '**', component: NotfoundComponent },
];
