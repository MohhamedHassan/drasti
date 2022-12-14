import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoadingComponent } from './components/loading/loading.component';
import { PricePipe } from '../pipes/price.pipe';
import { SwiperModule } from 'swiper/angular';
import { IframeDirective } from './directive/iframe.directive';
import { DirecifraneDirective } from './directive/direcifrane.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    CartComponent,
    LoadingComponent,
    PricePipe,
    IframeDirective,
    DirecifraneDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SwiperModule,
  ],
  exports:[
    SwiperModule,
    HeaderComponent,
    CartComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule,
    LoadingComponent,
    PricePipe,
    IframeDirective,
    DirecifraneDirective
  ]
})
export class SharedModule { }
