import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl} from "@angular/forms"
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/screens/cart/services/cart.service';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  app: FirebaseApp;
  db: Database;
  returnPassword:boolean=false
  loginForm:FormGroup=new FormGroup({})
  submited=false
  loginloading=false
  cartitems:any[]=[]
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
    this.app = initializeApp({
      apiKey: "AIzaSyCrZO0tF5O5Ms8au460-tmGbNS3mJ6QrEc",
      authDomain: "drasti-37a06.firebaseapp.com",
      databaseURL: "https://drasti-37a06-default-rtdb.firebaseio.com",
      projectId: "drasti-37a06",
      storageBucket: "drasti-37a06.appspot.com",
      messagingSenderId: "850147128578",
      appId: "1:850147128578:web:2153add74417b85d4fbe1b",
      measurementId: "G-41JEDDFQT2"
    });
    this.db = getDatabase(this.app);
    if(!this.checkout) {
      this.title.setTitle('تسجل الدخول - دراستي')
    }
    this.loginForm = this.fb.group({
      phone:['',[Validators.required,Validators.pattern(/^5\d{7}$/)]],
      password:['',Validators.required],
    })
    this.cartService.cartItems.subscribe((cart:any) =>  {
      this.cartitems=cart
    })
  }
login(value:any) {
  this.submited=true
  if(this.loginForm.valid) {
     this.loginloading=true
     this.authservice.login(value).subscribe(
      (res:any) => {
   
        localStorage.setItem('drastitoken',res?.meta?.token)
        localStorage.setItem('userid',res?.data?.id)
        localStorage.setItem('username',`${res?.data?.fname} ${res?.data?.lname}`)
        set(ref(this.db, `Auth/${res?.data?.id}`), {
          user_token:res?.meta?.token
        });
        //this.authservice.set_online_offline(1)
        if(this.cartitems?.length) {
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
                  this.loginloading=false
                  }
                
            })
          })
        } else {
          if(this.checkout) {
            this.hasAccount.emit(true)
          this.loginloading=false
          }
          this.cartService.getCart()
        }
        if(!this.checkout) {
          this.loginloading=false
          this.router.navigate(['/'])
        } 
        this.toastr.success('تم تسجيل الدخول بنجاح')
      } , err => {
        this.loginloading=false
      }
     )
  }
}



}
