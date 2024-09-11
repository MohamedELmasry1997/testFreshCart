import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  afterNextRender,
  afterRender,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { LoaderComponent } from '../../loader/loader.component';
import { CategoreisService } from '../../core/services/categoreis.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TextcutPipe } from '../../core/pipes/textcut.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoaderComponent,
    CarouselModule,
    RouterLink,
    TextcutPipe,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  productList: IProduct[] = [];
  categoryList: ICategory[] = [];
  constructor(
    private _ProductsService: ProductsService,
    private _CategoreisService: CategoreisService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _NgxSpinnerService: NgxSpinnerService
  ) {}

  searchText: string = '';
  // owl-carousel options

  customOptionsCategory: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid mx-auto px-2 text-main  w-100 fs-3 fa-circle-chevron-left"></i>',
      '<i class="fa-solid mx-auto px-2 text-main  w-100 fs-3 fa-circle-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  // owl-carousel end

  // static slider

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
  // end static slider

  ngOnInit(): void {
    
    this._CategoreisService.getAllCategoreis().subscribe({
      next: (res) => {
        console.log(res);
        this.categoryList = res.data;
        
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.productList = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addCart(proID: string) {
    this._CartService.addToCart(proID).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
        this._CartService.cartNum.next(res.numOfCartItems);
        console.log(this._CartService.cartNum);
        

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
