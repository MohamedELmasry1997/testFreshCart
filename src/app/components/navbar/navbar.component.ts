import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  loggedUserName : string = '' ; 

  constructor(private _AuthService: AuthService , private _Router:Router , private _CartService : CartService) { }
  
  showLinks: boolean = false;

  countItems : number = 0
  ngOnInit(): void {
    this._AuthService.isLogin.subscribe((val) => {
      this.showLinks = val

      this._CartService.cartNum.subscribe({
        next: (data) => {
          this.countItems = data
          
       }
     }) 
    })
    
    this._AuthService.userName.subscribe( ( loggedUser ) => {
      this.loggedUserName = loggedUser;
    });
  }

  signOut() {
    this._Router.navigate(['/login']);
    this.showLinks = false;
    localStorage.removeItem('token')
  }
}
