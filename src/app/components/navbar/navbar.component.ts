import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/screens/auth/services/auth.service';
import { CartService } from 'src/app/screens/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartLength=0
  constructor(public cartService:CartService,
    public authService:AuthService) { }

  ngOnInit(): void {
    if(!!localStorage.getItem('drastitoken')) {
      this.cartService.getCart()
    } else {
      this.cartService.cartItems.next([])
    } 
    this.cartService.cartItems.subscribe((res:any) =>  {
      if(res) {
        this.cartLength = res?.length
      }
    })
  }
  islogin() {
    return !!localStorage.getItem('drastitoken')
  }

}
