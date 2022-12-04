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
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService) {
}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err:any) => {
      let errorMessages = err?.error?.errors
      console.log(errorMessages)
      if(Array.isArray(errorMessages)&&errorMessages?.length) {
        for(let i = 0 ; i <errorMessages?.length ; i++) {
          console.log(errorMessages[i]?.message)
         if(errorMessages[i]?.message) {
            this.toastr.error(errorMessages[i]?.message);
         }
        }
      } else if(errorMessages?.message) {
        this.toastr.error(errorMessages?.message);
      }
      // if(!err.url.includes('login') && !err.url.includes('register')) {
      //   if ([401, 403].indexOf(err.status) !== -1) {
      //     // this.router.navigate(["/auth/signin"]);
      //     // localStorage.removeItem("fakebookToken");
      //   } else {
      //     this.router.navigate(["/error"])
      //   }
      // }
      return throwError(err)
    }))
  }

}
