import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/screens/auth/services/auth.service';
import { CartService } from 'src/app/screens/cart/services/cart.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cartLength = 0;
  constructor(
    private router: Router,
    public cartService: CartService,
    public authService: AuthService,
    public settingsService: SettingsService
  ) {}
  hideLink = false;
  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.hideLink = this.router.url.includes('class-details');
      });
    if (!!localStorage.getItem('drastitoken')) {
      this.cartService.getCart();
    } else {
      this.cartService.cartItems.next([]);
    }
    this.cartService.cartItems.subscribe((res: any) => {
      if (res) {
        this.cartLength = res?.length;
      }
    });
  }
  islogin() {
    return !!localStorage.getItem('drastitoken');
  }
}
