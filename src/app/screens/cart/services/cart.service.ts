import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:any = new BehaviorSubject(null)
  discount= new BehaviorSubject(0)
 // total=0
  showCopon=false
  coponid= new BehaviorSubject(null)
  constructor(private http:HttpClient) { }
  addToCart(body:any) {
    return this.http.post(`${environment.apiUrl}add_to_cart`,body)
  }
  deleteItemFromCart(body:any) {
    return this.http.post(`${environment.apiUrl}delete_from_cart`,body)
  }
  getCart() {
    return this.http.get(`${environment.apiUrl}my_cart`).subscribe((res:any)=> {
     // this.total=res?.data?.total
      if(res?.data?.cartdetails) this.cartItems.next(res?.data?.cartdetails)
      else this.cartItems.next([])
    })
  }
  getcartProducts() {
    return this.http.get(`${environment.apiUrl}my_cart`)
  }
  getRecomnded() {
    return this.http.get(`${environment.apiUrl}recommed_materials_offers`) 
  }
  verifyCopon(value:string) {
    return this.http.get(`${environment.apiUrl}coupon/${value}`) 
  }
  addOrder(body:any) {
    return this.http.post(`${environment.apiUrl}add_order`,body) 
  }
}
