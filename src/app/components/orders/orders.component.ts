import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),

    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),

    city: new FormControl(null, [Validators.required]),
  });

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);

  cartId: string | null = '';

  

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.cartId = p.get('cartID');
      },
    });
  }

  
// status
// : 
// "success
  submitOrder() {
    this._OrdersService.checkOut(this.cartId, this.orders.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          window.open(res.session.url , '_self')
        }
      },
      
    });
  }
}
