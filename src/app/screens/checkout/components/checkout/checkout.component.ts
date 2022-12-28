import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/screens/cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  hasAccount=false
  registerOrLogin=1
  cartItems:any[]=[]
  loading=true
  checkoutLoading=false
  copontype=''
  coponamount=0
  coponid=null
  total=0
  discount
  constructor(private title:Title,
    private router:Router,
    public cartService:CartService,
    private activatedroute:ActivatedRoute,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.title.setTitle('    اتمام الطلب - دراستي')
    if(!!localStorage.getItem('drastitoken')) {
      this.hasAccount=true
    } 

    this.cartService.coponid.subscribe(res =>  {
        if(res)   {
          this.copontype=res?.copontype
          this.coponamount=Number(res?.coponamount)
          this.coponid=res?.coponid
        }
        console.log(res)
        this.getCart()
    })
  }

  getCart() {
    // if(!!localStorage.getItem('drastitoken')) {
    //   this.cartService.getCart()
    // }
    this.cartService.cartItems.subscribe(
      (res:any) =>  {
        if(res) {
          this.cartItems=res 
          if(!this.cartItems?.length) {
            this.router.navigate(['/cart'])
          } else {
            let price = 0
            this.cartItems.forEach(item => {
              if(item?.has_material) price+=item?.material?.discount||item?.material?.price
              if(item?.has_offer) price+=item?.offer?.discount||item?.offer?.price
            })
            this.total=price
            // if(this.total) {
            //   if(this.copontype=='percentage') {
            //     this.total = this.total -  (this.total*this.coponamount/100) 
            //   }
            //   else if (this.copontype=='fixed') {
            //     this.total = this.total -  this.coponamount
            //   }
            // }
          }

        }
       if(!!localStorage.getItem('drastitoken')) {
          if(res) this.loading=false
       } else {
        this.loading=false
       }
      }
    )
  }
checkout()  {
  if(!!localStorage.getItem('drastitoken')&&! this.checkoutLoading) {
    this.checkoutLoading=true
    this.cartService.getCart()
    this.cartService.cartItems.subscribe((res:any) =>  {
      let cart = res
      let ids:any = []
      cart.forEach((element:any) => {
          ids.push(element?.id)
      });
      if(!!localStorage.getItem('drastitoken')) {
        this.cartService.addOrder({cartdetail_ids:ids,coupon_id:this.coponid}).subscribe((res:any) =>  {
          window.open(res?.data, '_blank');
          this.router.navigate(['/'])
        })
      }
    })
  }
}
}
