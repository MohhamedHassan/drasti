import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  password=true
  password2=true
  submitedphonecontrol=false
  phoneControl:FormControl=
  new FormControl('',[Validators.required])
  verificationControl:FormControl=
  new FormControl('',[Validators.required])
  verifyOtbLoading=false
  showVervication=false
  sendotbLoading=false
  showsendcode=true
  savePhoneNumber=''
  counter=180
  enable=true
  setIntervalVariable:any
  showForm=false
  verified=false
  resetloading=false
  resetPasswordForm:FormGroup=new FormGroup({})
  submited=false
  intervalLoading=false
  submitedVerificationControl=false
  constructor(
    private authService:AuthService,
    private title:Title,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.title.setTitle(' اعادة تعيين كلمة المرور - دراستي')
    this.resetPasswordForm = this.fb.group({
      phone:[this.savePhoneNumber],
      password:['',[Validators.required,Validators.minLength(4)]],
      password_confirmation:['',Validators.required]
    })
  }
  resetPassword(value:any) {
    this.submited=true
    if(this.resetPasswordForm.valid&&
      (this.resetPasswordForm.get('password_confirmation')?.value == this.resetPasswordForm.get('password')?.value)&&this.verified) {
      value.phone=this.savePhoneNumber
      this.resetloading=true
      this.authService.resetPassword(value).subscribe(
        (res:any)=> {
          this.toastr.success(res?.message)
          this.resetloading=false
          this.router.navigate(['/auth/login'])
        }, err => {
          this.resetloading=false
        }
      )
    }
  }
  verifyCode() {
    this.submitedVerificationControl=true
    if(this.verificationControl.valid&&!this.verifyOtbLoading) {
     this.verifyOtbLoading=true
     this.submitedVerificationControl=false
     this.authService.verify_otp({
      phone:this.savePhoneNumber,
      for:"reset", 
      code:this.verificationControl.value
      }).subscribe(
         (res:any) =>  {
           this.verifyOtbLoading=false
           this.verificationControl.reset()
           this.toastr.success(res?.message)
           this.verified=true
         } ,err=>{
           this.verifyOtbLoading=false 
         }
      )
   }
 }
sendOtb() {
  this.submitedphonecontrol=true
  if(this.enable&&!this.sendotbLoading) {
    if(this.phoneControl?.errors==null) {
      this.submitedphonecontrol=false
      this.sendotbLoading=true
     this.authService.sent_otp({
      phone:this.phoneControl?.value,
      for:"reset"
     }).subscribe(
        (res:any) =>  {
          this.savePhoneNumber=this.phoneControl.value
          this.showVervication=true
          this.sendotbLoading=false
          this.showsendcode=false
          this.enable=false
          this.counterToEnable()
          this.toastr.success(res?.message)
        } ,err => {
          this.sendotbLoading=false
        }
     )
    }
  }
}
counterToEnable() {
if(this.enable) {
  this.sendOtb()
} else {
  if(!this.intervalLoading) {
    this.counter=180
    this.enable=false
    this.intervalLoading=true
   this.setIntervalVariable = setInterval(() => {
      this.counter-=1
      if(this.counter==0) {
        this.counter=180
        clearInterval(this.setIntervalVariable)
        this.enable=true
        this.intervalLoading=false
      }
    },1000)
  }
}
}
}
