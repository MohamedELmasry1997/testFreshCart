import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../loader/loader.component';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);

  cartData: ICart = {} as ICart;
  apiResponse!: object | number;
  ngOnInit(): void {

    

    this._CartService.getAllProductsInCart().subscribe({
      next: (res) => {
        console.log(res);
        this.apiResponse = res.numOfCartItems;
        this.cartData = res.data;
        
        // console.log(this.cartData._id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteItem(id: string) {
    this._CartService.deleteItemFromCart(id).subscribe({
      next: (res) => {
        console.log(res);

        this.cartData = res.data;

        this._ToastrService.error(res.status);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCount(id: string, count: number) {
    this._CartService.updateItemInCart(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res.data;
        this._ToastrService.success(res.status);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearAllCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.cartData = {} as ICart;
          this.apiResponse = 0;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
