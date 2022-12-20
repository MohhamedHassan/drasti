import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    AuthModule,
    SharedModule
  ]
})
export class CheckoutModule { }
