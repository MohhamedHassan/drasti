import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  loading=true
  cartItems:any[]=[]
  total:any
  constructor(
    private title:Title,
    public cartService:CartService) { }
    deleteCartItem(id:any) {
      if(!!localStorage.getItem('drastitoken')) {
        this.loading=true
        this.cartService.deleteItemFromCart({
          cartdetail_ids:[id]
        }).subscribe(res => {
         this.getCart()
          
        })
      } else {
        this.cartItems.splice(this.cartItems.findIndex(item=>item?.id==id),1)
        this.cartService.cartItems.next(this.cartItems)
      }

    }
  ngOnInit(): void {
 
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
        if(!!localStorage.getItem('drastitoken')==false) {
          let price = 0
          this.cartItems.forEach(item => {
            if(item?.has_material) price+=item?.material?.discount||item?.material?.price
            if(item?.has_offer) price+=item?.offer?.discount||item?.offer?.price
          })
          this.cartService.total=price
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
}
