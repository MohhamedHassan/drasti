import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() imgSrc:string=''
  @Input() name:string=''
  @Input() price:string=''
  @Input() id:string=''
  @Input() type:string=''
  @Output() cartBtn = new EventEmitter()
  addeddTocart=false
  constructor() { }

  ngOnInit(): void {
  }
  emitCartToParent() {
    this.addeddTocart=!this.addeddTocart
    this.cartBtn.emit({
      type:this.type,
      id:this.id
    })
  }
}
