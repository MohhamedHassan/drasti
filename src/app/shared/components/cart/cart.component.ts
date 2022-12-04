import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() imgSrc:string=''
  @Input() name:string=''
  @Input() price:string=''
  constructor() { }

  ngOnInit(): void {
  }

}
