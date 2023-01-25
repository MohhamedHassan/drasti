import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  loading=true
  cartItems:any[]=[]
  total=0
  verifyCoponLoading=false
  disablecopon=false
  copontype=''
  coponamount=-1
  coponid=null
  discount=0
  discountPersintg=0
  constructor(
    private title:Title,
    private toastr:ToastrService,
    public cartService:CartService) { }
    deleteCartItem(id:any,index:any) {
      if(!!localStorage.getItem('drastitoken')) {
        this.loading=true
        this.cartService.deleteItemFromCart({
          cartdetail_ids:[id]
        }).subscribe(res => {
         this.getCart()
          
        })
      } else {
        this.cartItems.splice(index,1)
        this.cartService.cartItems.next(this.cartItems)
      }

    }
  ngOnInit(): void {
    this.cartService.coponid.next(null)
//  this.cartService.discount.subscribe(res =>  {
//   this.discount=res
//  })
    this.title.setTitle('سلة المشتريات - دراستي')
this.getCart()
  }

getCart() {
  if(!!localStorage.getItem('drastitoken')) {
    this.cartService.getCart()
  }
  this.cartService.cartItems.subscribe(
    (res:any) =>  {
      if(res) {
        this.cartItems=res 
        let price = 0
        this.cartItems.forEach(item => {
          if(item?.has_material) price+=Number(item?.material?.discount)||Number(item?.material?.price)
          if(item?.has_offer) price+=Number(item?.offer?.discount)||Number(item?.offer?.price)
        })
        this.total=price
      }
      if(this.discountPersintg) {
        this.discount=this.total * this.discountPersintg/100
      }
    

     if(!!localStorage.getItem('drastitoken')) {
        if(res) this.loading=false
     } else {
      this.loading=false
     }
    }
  )
}
checkcoponinput(value:string):boolean {
  if(value.trim().length==0) {
    return true
  }
  else return false 
}
verifyCopon(value:string) {
  if(value.trim().length>0) {
    this.verifyCoponLoading=true
    this.cartService.verifyCopon(value).subscribe((res:any) =>  {
      let numberamount = Number(res?.data?.amount)
      this.verifyCoponLoading=false
      this.toastr.success(`  
      تهانينا لك حصلت علي  
      ${res?.data?.amount}
      ${res?.data?.type=='percentage' ? '%' : 'دينار'}
      ` )
      this.disablecopon=true
      //cartService.total
      if(this.total) {
        if(res?.data?.type=='percentage') {
          this.discount=this.total * numberamount/100
          this.discountPersintg=numberamount
        }
        else     {
          this.discount = numberamount
          this.discountPersintg=0
        }
    
      } else {
        if(res?.data?.type=='percentage') {
          this.discount=this.total * numberamount/100
          this.discountPersintg=numberamount
        }
        else     {
          this.discount = numberamount
        this.discountPersintg=0
        }
      }
      this.coponamount=numberamount
      this.copontype=res?.data?.type
      this.coponid=res?.data?.id

    },err =>  {
      this.verifyCoponLoading=false
    })
  }
}
coponidnext() {
  this.cartService.coponid.next({
    coponamount:this.discount,
    coponid:this.coponid
  })
}
}
