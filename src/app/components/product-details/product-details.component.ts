import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { LoaderComponent } from '../../loader/loader.component';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  productData: IProduct | null = null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let productID = p.get('id');

        // call api here
        this._ProductsService.getSpecificProduct(productID).subscribe({
          next: (res) => {
            this.productData = res.data;
            console.log(this.productData?.images);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }

  addCart(proID: string) {
    this._CartService.addToCart(proID).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
