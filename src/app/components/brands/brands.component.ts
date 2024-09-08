import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrands';
import { LoaderComponent } from '../../loader/loader.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  private readonly _BrandsService = inject(BrandsService);
  private readonly _Router = inject(Router);

  allBrands: IBrands[] = [];

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allBrands = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  brandDetailsNav() {
    this._Router.navigate(['/brandDetails']);
  }

  // getBrandInfo(id: string) {
  //   this._BrandsService.getSpecificBrand(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
        
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
