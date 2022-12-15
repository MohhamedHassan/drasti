import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CartService } from 'src/app/screens/cart/services/cart.service';
import { SubjectsService } from 'src/app/screens/classes/services/subjects.service';
import { ClassDetailsService } from '../../services/class-details.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  classDetails:any={}
  ispaid=false
  loading=true
  lessons:any[]=[]
  units:any[]=[]
  lessonsOrUnis=0
  type=''
  cart=false
  cartitems:any[]=[]
  attachOrClasses=1
  constructor(private classdetailsService:ClassDetailsService,
      private _sanitizer:DomSanitizer,
    private title:Title,
    private cartService:CartService,
    private subjectsService:SubjectsService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.title.setTitle(` دراستي - ادرس وانت متطمن `)
    this.activatedRoute.params.subscribe((value:any) =>  {
      this.type=value?.type
      if(value?.type=='offer') {
        if(value?.spe==-1) {
          this.subjectsService.getOffer(value?.class)?.subscribe(
            (res:any)=> {
              if(res?.data?.length) {
                  if(Array.isArray(res?.data)) {
                    this.classDetails=res?.data.find((item:any) => item?.id==value?.id)
                  }
              }
              this.title.setTitle(this.classDetails?.name) 
              this.getCart()
              this.loading=false
            }
          )
        } else {
          this.subjectsService.getOfferWithSpecialist(value?.class,value?.spe)?.subscribe(
            (res:any)=> {
              if(res?.data?.length) {
                if(Array.isArray(res?.data)) {
                  this.classDetails=res?.data.find((item:any) => item?.id==value?.id)
                }
              }
              this.getCart()
              this.loading=false
            }
          )
        }
      } else {
        this.classdetailsService.getClassDetails(value?.id).subscribe((res:any)=> {
      
 
            this.classDetails=res?.data
            this.ispaid=res?.data?.is_paid
            this.title.setTitle(this.classDetails?.name) 
            if(this.classDetails?.has_units) {
              this.lessonsOrUnis=1
              this.getUnits(this.classDetails?.id)
            } else if(this.classDetails?.has_lessons) {
              this.lessonsOrUnis=2
              this.getLessons(this.classDetails?.id)
            }
          
          this.loading=false
          this.getCart()
        })
      }
    })
    

   
    
  }
  savedYoutube(link:any) {
    return this._sanitizer.bypassSecurityTrustHtml(`<iframe src=${link} class="w-100"></iframe>`)
  }
  savedHtml(content:string) {
    return this._sanitizer.bypassSecurityTrustHtml(content)
  }
  getCart() {
    this.cartService.cartItems.subscribe((res:any)=> {
      if(res) {
        this.cartitems= res
        if(this.type!='offer') {
          this.cartitems.forEach((cartItem:any) => {
            if(this.classDetails?.id==cartItem?.material?.id) {
              this.cart=true
            }
          })
          console.log(this.classDetails?.id)
        } else {
          this.cartitems.forEach((cartItem:any) => {
            if(this.classDetails?.id==cartItem?.offer?.id) {
              this.cart=true
            }
          })
        }

      }
    })
  }
getUnits(id:any) {
  this.classdetailsService.classUnites(id).subscribe(
    (res:any) => {
      this.units=res?.data
    }
  )
}
getLessons(id:any) {
  this.classdetailsService.classLessons(id).subscribe(
    (res:any) => {
      this.lessons=res?.data
    }
  )
}
pushCartIds() {
  if(this.type=='offer') {

    if(!!localStorage.getItem('drastitoken')) {
      this.loading=true
        this.cartService.addToCart({
          offer_ids:[this.classDetails?.id],
          material_ids:[]
        }).subscribe((res:any) => {
          this.cart=true
          this.cartService.getCart()
          this.loading=false
        },err =>  {
        this.loading=false
        })
    } else  {
      let cartItem = {
        has_offer: true,
        offer:this.classDetails
      }
      this.cartitems.push(cartItem)
      this.cartService.cartItems.next(this.cartitems)
      this.cart=true
      this.getCart()
    }
  } else if(this.type=='subject') {
    if(!!localStorage.getItem('drastitoken')) {
      this.loading=true
        this.cartService.addToCart({
          material_ids:[this.classDetails?.id],
          offer_ids:[],
        }).subscribe((res:any) => {
          this.cart=true
          this.cartService.getCart()
          this.loading=false
        },err =>{this.loading=false})
      } else {
        let cartItem = {
          has_material: true,
          material:this.classDetails
        }
        this.cartitems.push(cartItem)
        this.cartService.cartItems.next(this.cartitems)
        this.cart=true
        this.getCart()

    }
  }
}
}
