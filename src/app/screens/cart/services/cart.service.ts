import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  addToCart(body:any) {
    return this.http.post(`${environment.apiUrl}add_to_cart`,body)
  }
  getCart() {
    return this.http.get(`${environment.apiUrl}my_cart`)
  }
}
