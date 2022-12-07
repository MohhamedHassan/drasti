import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  stages:number[]=[]
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://code-pirates.com/Drasti-Backend/public/api/material_units/my_cart').subscribe(
      res =>  {
        console.log(res)
      }
    )
  this.stages.length=4
  }


}
