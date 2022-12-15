import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../screens/cart/services/cart.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private cartService:CartService,
    private toastr: ToastrService) {
}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err:any) => {
      let errorMessages = err?.error?.errors
      if(Array.isArray(errorMessages)&&errorMessages?.length) {
        for(let i = 0 ; i <errorMessages?.length ; i++) {
         if(errorMessages[i]?.message) {
            this.toastr.error(errorMessages[i]?.message);
         }
        }
      } else if(errorMessages?.message) {
        this.toastr.error(errorMessages?.message);
      }
      if ([401, 403].indexOf(err.status) !== -1) {
        this.cartService.cartItems.next([])
        localStorage.removeItem('drastitoken')
        this.router.navigate(['/'])
      } 
      return throwError(err)
    }))
  }

}
