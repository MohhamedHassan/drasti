import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl} from "@angular/forms"
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
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


  constructor(private fb:FormBuilder,
    private router:Router,
    private toastr:ToastrService,
    private authservice:AuthService) { }

  ngOnInit(): void {
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
        this.router.navigate(['/'])
        this.toastr.success('تم تسجيل الدخول بنجاح')
      } , err => {
        this.loginloading=false
      }
     )
  }
}

}
