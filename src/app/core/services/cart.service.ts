import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) { }

   myHeader : any = { token : localStorage.getItem('token')}
  
  addToCart(id:string): Observable<any>{
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        'productId': id,
      },
      {
        headers : this.myHeader 
      }
    );
  }

  getAllProductsInCart() : Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart', 
      {
        headers : this.myHeader
      }
    );
  }

  deleteItemFromCart(id:string): Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers : this.myHeader
      }
    );
  }

  updateItemInCart(id : string , newCount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
      {
        "count": newCount
      },
      {
        headers : this.myHeader
      }
    )
  }


  clearCart(): Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`, 
      {
        headers : this.myHeader
      }
    )
  }
}
