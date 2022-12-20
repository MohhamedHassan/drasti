import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/screens/cart/services/cart.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
settings:any
  constructor(private settingsService:SettingsService,
    private cartService:CartService) { }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(
      (res:any) => {
        this.settings=res?.data
        if(res?.data?.show_coupon==1) this.cartService.showCopon=true
      }
    )
  }

}
