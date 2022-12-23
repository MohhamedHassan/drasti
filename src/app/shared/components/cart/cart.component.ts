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
  @Input() discount:string=''
  @Input() id:string=''
  @Input() type:string=''
  @Input() classid:any
  @Input() speid:any
  @Input() paid=false
  @Output() cartBtn = new EventEmitter()
  @Input() addeddTocart=false
  @Input() showaddButton=false
  @Input() small=false
  constructor() { }

  ngOnInit(): void {
  }
  emitCartToParent() {
    this.cartBtn.emit({
      type:this.type,
      id:this.id,
      add:this.addeddTocart
    })
    //this.addeddTocart=!this.addeddTocart
  }
}
