import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/screens/cart/services/cart.service';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  classes:any[]=[]
  offer:any[]=[]
  loadingOffer=true
  loadingsubjects=true
  offer_ids:any[]=[]
  material_ids:any[]=[]
  cart:any[]=[]
  loading=false
  showMoreButton=false
  classId=-1
  specialistId=-1
  page=1
  banner:any
  stagename=''
  spename=''
  constructor(private activatedroute:ActivatedRoute,
    private title:Title,
    private cartService:CartService,
    private subjectsService:SubjectsService) { }

  ngOnInit(): void {
    this.title.setTitle(` دراستي - ادرس وانت متطمن `)
    this.activatedroute.params.subscribe((value:any) => {
      this.classId=value?.id
      this.specialistId=value?.spe
      if(value?.spe==-1) {
        this.subjectsService.getSubjects(value?.id,1).subscribe(
          (res:any)=> {
              if(res?.data?.length) {
                this.classes=res?.data
                this.classes.map((item:any)=> {
                  item.cart=false
                })
                if(this.classes?.length) {
                  this.stagename = `
                    ${this.classes[0]?.class?.name}
                  `
                }
                this.banner=this.classes[0]?.class?.header_image
                this.getCart()
              }
              this.loadingsubjects=false
              this.showMoreButton=res?.pagination
          }
        )
        this.subjectsService.getOffer(value?.id)?.subscribe(
          (res:any)=> {
            if(res?.data?.length) {
              this.offer=res?.data
              this.offer.map((item:any)=> {
                item.cart=false
              })
              this.getCart()
            }
            this.loadingOffer=false
          }
        )
      }
      else {
        this.subjectsService.getSubjectsWithSpecialist(value?.id,value?.spe,1).subscribe(
          (res:any)=> {
            if(res?.data?.length) {
            this.classes=res?.data
            if(this.classes?.length) {
              this.stagename = `
                ${this.classes[0]?.class?.name} ${this.classes[0]?.class?.has_specialties[this.classes[0]?.class?.has_specialties.findIndex((ite:any) => ite?.id==this.specialistId)]?.name}
              `
            }
            this.classes.map((item:any)=> {
              item.cart=false
            })
            this.banner=this.classes[0]?.class?.header_image
            this.getCart()
          }
          this.loadingsubjects=false
          this.showMoreButton=res?.pagination
          }
        )
        this.subjectsService.getOfferWithSpecialist(value?.id,value?.spe)?.subscribe(
          (res:any)=> {
            if(res?.data?.length) {
              this.offer=res?.data
              this.offer.map((item:any)=> {
                item.cart=false
              })
              this.getCart()
            }
            this.loadingOffer=false
          }
        )
      }

    })
    this.getCart()
  }
  showMooreClasses() {
    this.page+=1
    this.loadingsubjects=true
    if(this.specialistId==-1) {
      this.subjectsService.getSubjects(this.classId,this.page).subscribe(
        (res:any)=> {
            if(res?.data?.length) {
              res?.data.map((item:any)=> {
                item.cart=false
              })
              this.classes=[...this.classes,...res?.data]
              this.getCart()
            }
            this.loadingsubjects=false
            this.showMoreButton=res?.pagination
        }
      )
    }
    else {
      this.subjectsService.getSubjectsWithSpecialist(this.classId,this.specialistId,this.page).subscribe(
        (res:any)=> {
          if(res?.data?.length) {
            res?.data.map((item:any)=> {
              item.cart=false
            })
            this.classes=[...this.classes,...res?.data]
            this.getCart()
          }
        this.loadingsubjects=false
        this.showMoreButton=res?.pagination
        }
      )
    }
  }
  getCart() {
    this.cartService.cartItems.subscribe((res:any)=> {
      if(res) {
        this.cart= res
        this.classes.forEach((element:any) => {
            this.cart.forEach((cartItem:any) => {
              if(element?.id==cartItem?.material?.id) {
                element.cart=true
              }
            })
        });
        this.offer.forEach((element:any) => {
          this.cart.forEach((cartItem:any) => {
            if(element?.id==cartItem?.offer?.id) {
              element.cart=true
            }
          })
      });
      }
    })
 
  }
  pushCartIds(event:any) {
    if(event?.type=='offer') {

      if(!!localStorage.getItem('drastitoken')) {
        this.loading=true
          this.cartService.addToCart({
            offer_ids:[event?.id],
            material_ids:[]
          }).subscribe((res:any) => {
            this.cartService.getCart()
            this.loading=false
          },err =>  {
          this.loading=false
          })
      } else {
        let cartItem = {
          has_offer: true,
          offer:this.offer[this.offer.findIndex(item=>item?.id==event?.id)]
        }
        this.cart.push(cartItem)
        this.cartService.cartItems.next(this.cart)
      }
    } else if(event?.type=='subject') {
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
            material:this.classes[this.classes.findIndex(item=>item?.id==event?.id)]
          }
          this.cart.push(cartItem)
          this.cartService.cartItems.next(this.cart)
      }
    }
  }
}
