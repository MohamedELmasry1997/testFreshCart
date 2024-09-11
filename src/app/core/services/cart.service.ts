import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) { }

    cartNum:BehaviorSubject<number> = new BehaviorSubject(0)
  
  addToCart(id:string): Observable<any>{
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        'productId': id,
      },
      
    );
  }

  getAllProductsInCart() : Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart', 
      
    );
  }

  deleteItemFromCart(id:string): Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      
    );
  }

  updateItemInCart(id : string , newCount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
      {
        "count": newCount
      },
      
    )
  }


  clearCart(): Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`, 
      
    )
  }
}
