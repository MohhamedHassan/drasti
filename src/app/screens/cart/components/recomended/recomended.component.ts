import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import SwiperCore, { Navigation,Pagination } from 'swiper';
import { Subscription } from 'rxjs';
import { SubjectsService } from 'src/app/screens/classes/services/subjects.service';
SwiperCore.use([Navigation,Pagination]);
@Component({
  selector: 'app-recomended',
  templateUrl: './recomended.component.html',
  styleUrls: ['./recomended.component.scss']
})
export class RecomendedComponent implements OnInit {
  recomended:any[]=[]
  loading=false
  cart:any[]=[]
  tounsubscribe:Subscription
  swpieroptions: any = {
    slidesPerView: 3,
    spaceBetween: "50",
    pagination: false,
    navigation: "true",
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
    }
  
  }
  constructor(public cartService:CartService,
    private subjectsService:SubjectsService) { }

  ngOnInit(): void {
    
    if(!!localStorage.getItem('drastitoken')) {
      this.cartService.getRecomnded().subscribe((res:any) =>  {
        this.recomended=res?.data?.materials
        if(Array.isArray(this.recomended)){
          this.recomended.map((item:any)=> {
            item.cart=false
          })
        } 
        this.getCart()
      })
    } else {
      this.getCart()
    }

  }
  pushCartIds(event:any) {
    if(event?.type=='subject') {
      if(!!localStorage.getItem('drastitoken')) {
        this.loading=true
          this.cartService.addToCart({
            material_ids:[event?.id],
            offer_ids:[],
          }).subscribe((res:any) => {
            this.cartService.getCart()
            this.loading=false
          },err =>{this.loading=false})
        } else {
          let cartItem = {
            has_material: true,
            material:this.recomended[this.recomended.findIndex(item=>item?.id==event?.id)]
          }
          this.cart.push(cartItem)
          this.cartService.cartItems.next(this.cart)
      }
    }
  }
  getCart() {
   this.tounsubscribe= this.cartService.cartItems.subscribe((res:any)=> {
      if(res) {
        this.cart= res
        if(!!localStorage.getItem('drastitoken')==false) {
          let materials = this.cart.filter(i=>i.has_material)
          if (materials?.length) {
            if(materials[0]?.material?.speid==-1) {
              this.subjectsService.getSubjects(materials[0]?.material?.class_id,1).subscribe(
                (res:any)=> {
                    if(res?.data?.length) {
                      this.recomended=res?.data
                      this.recomended.forEach((element:any) => {
                        element.cart=false
                          this.cart.forEach((cartItem:any) => {
                            if(element?.id==cartItem?.material?.id) {
                              element.cart=true
                            }
                          })
                      });
                      if(this.cart?.length && this.recomended?.length) {
                        for(let i = 0 ; i < this.cart.length;i++) {
                          for(let j = 0 ; j < this.recomended.length;j++) {
                            if(this.cart[i]?.has_material && this.cart[i]?.material?.id == this.recomended[j]?.id) {
                              this.recomended[j].display='none'
                            }
                            if(this.cart[i]?.has_offer) {
                              for (let y = 0 ; y < this.cart[i]?.offer?.materials?.length;y++) {
                                if( this.cart[i]?.offer?.materials[y]?.id == this.recomended[j]?.id) {
                                  this.recomended[j].display='none'
                                }
                              }
                             
                            }
                          }
                        }
                      }
                      this.recomended = this.recomended.filter(i => i?.display!='none')
                    }
                }
              )
            } else {
              this.subjectsService.getSubjectsWithSpecialist(materials[0]?.material?.class_id,materials[0]?.material?.speid,1).subscribe(
                (res:any)=> {
                    if(res?.data?.length) {
                      this.recomended=res?.data
                      this.recomended.forEach((element:any) => {
                        element.cart=false
                          this.cart.forEach((cartItem:any) => {
                            if(element?.id==cartItem?.material?.id) {
                              element.cart=true
                            }
                          })
                      });
                      if(this.cart?.length && this.recomended?.length) {
                        for(let i = 0 ; i < this.cart.length;i++) {
                          for(let j = 0 ; j < this.recomended.length;j++) {
                            if(this.cart[i]?.has_material && this.cart[i]?.material?.id == this.recomended[j]?.id) {
                              this.recomended[j].display='none'
                            }
                            if(this.cart[i]?.has_offer) {
                              for (let y = 0 ; y < this.cart[i]?.offer?.materials?.length;y++) {
                                if( this.cart[i]?.offer?.materials[y]?.id == this.recomended[j]?.id) {
                                  this.recomended[j].display='none'
                                }
                              }
                             
                            }
                          }
                        }
                      }
                      this.recomended = this.recomended.filter(i => i?.display!='none')
                    }
                }
              )
            }
           
          } else {
            let offers = this.cart.filter(i=>i.has_offer)
            if(offers?.length) {
              this.subjectsService.getSubjects(offers[0]?.offer?.class_id,1).subscribe(
                (res:any)=> {
                    if(res?.data?.length) {
                      this.recomended=res?.data
                      this.recomended.forEach((element:any) => {
                        element.cart=false
                          this.cart.forEach((cartItem:any) => {
                            if(element?.id==cartItem?.material?.id) {
                              element.cart=true
                            }
                          })
                      });
                      if(this.cart?.length && this.recomended?.length) {
                        for(let i = 0 ; i < this.cart.length;i++) {
                          for(let j = 0 ; j < this.recomended.length;j++) {
                            if(this.cart[i]?.has_material && this.cart[i]?.material?.id == this.recomended[j]?.id) {
                              this.recomended[j].display='none'
                            }
                            if(this.cart[i]?.has_offer) {
                              for (let y = 0 ; y < this.cart[i]?.offer?.materials?.length;y++) {
                                if( this.cart[i]?.offer?.materials[y]?.id == this.recomended[j]?.id) {
                                  this.recomended[j].display='none'
                                }
                              }
                             
                            }
                          }
                        }
                      }
                      this.recomended = this.recomended.filter(i => i?.display!='none')
                    }
                }
              )
            }
          }
          // here
        } 
        this.recomended.forEach((element:any) => {
          element.cart=false
            this.cart.forEach((cartItem:any) => {
              if(element?.id==cartItem?.material?.id) {
                element.cart=true
              }
            })
        });
       

      }
    })
 
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.tounsubscribe.unsubscribe()
  }
}
