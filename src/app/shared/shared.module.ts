import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CartComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  exports:[
    HeaderComponent,
    CartComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule,
    LoadingComponent
  ]
})
export class SharedModule { }
