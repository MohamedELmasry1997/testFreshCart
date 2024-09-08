import { Component, inject } from '@angular/core';
import { IBDetails } from '../../core/interfaces/ibdetails';
import { BrandsService } from '../../core/services/brands.service';
import { BrandsComponent } from '../brands/brands.component';
import { ActivatedRoute } from '@angular/router';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-my-brand-details',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl:'./my-brand-details.component.html',
  styleUrl: './my-brand-details.component.scss',
})
export class MyBrandDetailsComponent {
  private readonly _BrandsService = inject(BrandsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  //
  brandDetails!: IBDetails;

  ngOnInit(id: string): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let brandID = p.get('id')
        this._BrandsService.getSpecificBrand(brandID).subscribe({
          next: (res) => {
            console.log(res);
            this.brandDetails = res.data
          },
          error: (err) => {
            console.log(err);
          },
        });
        
      }
    })
  }

  // getBrandID() {
  //   this._BrandsService.getSpecificBrand().subscribe({
  //     next: (res) => {
  //       this.brandDetails = res.data;

  //       console.log(this.brandDetails);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}

