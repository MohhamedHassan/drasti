import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms'
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/screens/cart/services/cart.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() checkout:boolean=false
  @Output() hasAccount = new EventEmitter()
  @Output() login = new EventEmitter()
  registerForm:FormGroup=new FormGroup({})
  cartitems:any[]=[]
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
  emitLogin() {
    this.login.emit(true)
  }
  constructor(private fb:FormBuilder,
    private cartService:CartService,
    private toastr:ToastrService,
    private title:Title,
    private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
    if(!this.checkout) {
      this.title.setTitle(' انشاء حساب - دراستي')
    }
    this.registerForm=this.fb.group({
      fname:['',[Validators.required,Validators.minLength(6)]],
      lname:['',[Validators.required,Validators.minLength(6)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      phone:['',[Validators.required,Validators.pattern(/^5\d{7}$/)]],
      password_confirmation:['',Validators.required],
      agree:['',Validators.required]
    })
    this.cartService.cartItems.subscribe((cart:any) =>  {
      this.cartitems=cart
    })
  }
  register(value:any) {
    this.submited=true
    if(this.registerForm.valid&&this.verified&&
      (this.registerForm.get('password_confirmation')?.value == this.registerForm.get('password')?.value)
      ) {
        value.phone=String(value.phone)
        value.device_type='web'
        this.registerLoading=true
        this.authService.register(value).subscribe(
          (res:any)=> {
            localStorage.setItem('drastitoken',res?.meta?.token)
            if(this.cartitems?.length) {
              console.log(this.cartitems)
              let offer_ids:any[]=[]
              let material_ids:any[]=[]
              this.cartitems.forEach(element => {
                  if(element?.has_offer) offer_ids.push(element?.offer?.id)
                  if(element?.has_material) material_ids.push(element?.material?.id)
              });
              this.cartService.addToCart({
                offer_ids:offer_ids,
                material_ids:material_ids
              }).subscribe((response:any) => {
                this.cartService.getCart()
                this.cartService.cartItems.subscribe((cart:any) =>  {
                  if(this.checkout) {
                    this.hasAccount.emit(true)
                  this.registerLoading=false
                  }
                })
              })
            } else {
              if(this.checkout) {
                this.hasAccount.emit(true)
              this.registerLoading=false
              }
              this.cartService.getCart()
            }
            if(!this.checkout) {
              this.registerLoading=false
              this.router.navigate(['/'])
            } 
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
