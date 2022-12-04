import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
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
}
