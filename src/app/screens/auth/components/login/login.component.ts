import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl} from "@angular/forms"
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/screens/cart/services/cart.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnPassword:boolean=false
  loginForm:FormGroup=new FormGroup({})
  submited=false
  loginloading=false
  @Input() checkout:boolean=false
  @Output() hasAccount = new EventEmitter()
  @Output() register = new EventEmitter()
  emitRegister() {
    this.register.emit(true)
  }
  constructor(private fb:FormBuilder,
    private title:Title,
    private router:Router,
    private toastr:ToastrService,
    private cartService:CartService,
    private authservice:AuthService) { }

  ngOnInit(): void {
    this.title.setTitle('تسجل الدخول - دراستي')
    this.loginForm = this.fb.group({
      phone:['',[Validators.required,Validators.pattern(/^5\d{7}$/)]],
      password:['',Validators.required],
    })
  }
login(value:any) {
  this.submited=true
  if(this.loginForm.valid) {
     this.loginloading=true
     this.authservice.login(value).subscribe(
      (res:any) => {
        this.loginloading=false
        localStorage.setItem('drastitoken',res?.meta?.token)
        this.cartService.getCart()
        if(!this.checkout) {
          this.router.navigate(['/'])
        } else {
          this.hasAccount.emit(true)
        }
        this.toastr.success('تم تسجيل الدخول بنجاح')
      } , err => {
        this.loginloading=false
      }
     )
  }
}

}
