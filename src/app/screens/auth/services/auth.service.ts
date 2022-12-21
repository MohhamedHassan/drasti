import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CartService } from '../../cart/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logoutloading=false
  constructor(private http:HttpClient,
    private router:Router,
    public cartService:CartService) { }
  login(body:any) {
    return this.http.post(`${environment.apiUrl}login`,body)
  }
  register(body:any) {
    return this.http.post(`${environment.apiUrl}register`,body)
  }
  sent_otp(body:any) {
    return this.http.post(`${environment.apiUrl}sent_otp`,body)
  }
  verify_otp(body:any) {
    return this.http.post(`${environment.apiUrl}verify_otp`,body)
  }
  resetPassword(body:any) {
    return this.http.post(`${environment.apiUrl}reset_password`,body)
  }
  logout():any {
    this.logoutloading=true
      return this.http.post(`${environment.apiUrl}logout`,{}).subscribe(
        res => { 
          this.cartService.cartItems.next([])
          localStorage.removeItem('drastitoken')
          this.router.navigate(['/'])
          this.logoutloading=false
        }
      )
    }
}
