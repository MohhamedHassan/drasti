import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup=new FormGroup({})
  verified=false
  submited=false
  showVervication=false
  showsendcode=true
  enable=true
  counter=60
  setIntervalVariable:any
  sendotbLoading=false
  verifyOtbLoading=false
  registerLoading=false
  intervalLoading=false
  verificationControl:FormControl=
  new FormControl('',[Validators.required])
  constructor(private fb:FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      fname:['',Validators.required],
      lname:['',Validators.required],
      password:['',Validators.required],
      phone:['',[Validators.required,Validators.pattern(/^5\d{7}$/)]],
      password_confirmation:['',Validators.required],
      agree:['',Validators.required]
    })
  }
  register(value:any) {
    this.submited=true
    console.log(this.registerForm)
    if(this.registerForm.valid&&this.verified&&
      (this.registerForm.get('password_confirmation')?.value == this.registerForm.get('password')?.value)
      ) {
        value.device_type='web'
        this.registerLoading=true
        this.authService.register(value).subscribe(
          (res:any)=> {
            this.registerLoading=false
            localStorage.setItem('drastitoken',res?.meta?.token)
            this.router.navigate(['/'])
            this.toastr.success('تم تسجيل الدخول بنجاح')
          } , err =>  {
            this.registerLoading=false
          }
        )
    }
  }
  sendOtb() {
    if(this.enable&&!this.sendotbLoading) {
      if(this.registerForm.get('phone')?.errors==null) {
        this.sendotbLoading=true
        this.authService.sent_otp({
         phone:this.registerForm.get('phone')?.value,
         for:"verify"
        }).subscribe(
           (res:any) =>  {
            this.sendotbLoading=false
             this.showVervication=true
             this.showsendcode=false
             this.enable=false
             this.counterToEnable()
             this.toastr.success(res?.message)
           },err => {
            this.sendotbLoading=false
          }
        )
       }
    }

  }
  verifyCode() {
    if(this.verificationControl.valid&&this.registerForm.get('phone')?.valid&&!this.verifyOtbLoading) {
     this.verifyOtbLoading=true
     this.authService.verify_otp({
      phone:this.registerForm.get('phone')?.value,
      for:"verify", 
      code:this.verificationControl.value
      }).subscribe(
         (res:any) =>  {
           this.verifyOtbLoading=false
           this.verificationControl.reset()
           this.toastr.success(res?.message)
           this.verified=true
           this.showVervication=false
           this.register(this.registerForm.value)
         } ,err=>{
           this.verifyOtbLoading=false 
         }
      )
   }
 }

counterToEnable() {
  if(this.enable) {
    this.sendOtb()
  } else {
    if(!this.intervalLoading) {
      this.counter=60
      this.enable=false
      this.intervalLoading=true
     this.setIntervalVariable = setInterval(() => {
        this.counter-=1
        if(this.counter==0) {
          this.counter=60
          clearInterval(this.setIntervalVariable)
          this.enable=true
          this.intervalLoading=false
        }
      },1000)
    }
  }
}
}
