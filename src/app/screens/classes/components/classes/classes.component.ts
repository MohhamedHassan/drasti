import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs';
import { CartService } from 'src/app/screens/cart/services/cart.service';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  classes:any
  offer:any
  loadingOffer=true
  loadingsubjects=true
  offer_ids:any[]=[]
  material_ids:any[]=[]
  constructor(private activatedroute:ActivatedRoute,
    private toastr:ToastrService,
    private cartService:CartService,
    private subjectsService:SubjectsService) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((value:any) => {
      if(value?.spe==-1) {
        this.subjectsService.getSubjects(value?.id,1).subscribe(
          (res:any)=> {
            this.classes=res?.data
            this.loadingsubjects=false
          }
        )
        this.subjectsService.getOffer(value?.id)?.subscribe(
          (res:any)=> {
            if(res?.data?.length) {
              this.offer=res?.data
            }
            this.loadingOffer=false
          }
        )
      }
      else {
        this.subjectsService.getSubjectsWithSpecialist(value?.id,value?.spe,1).subscribe(
          (res:any)=> {
            this.classes=res?.data
            this.loadingsubjects=false
          }
        )
        this.subjectsService.getOfferWithSpecialist(value?.id,value?.spe)?.subscribe(
          (res:any)=> {
            if(res?.data?.length) {
              this.offer=res?.data
            }
            this.loadingOffer=false
          }
        )
      }

    })
  }
  pushCartIds(event:any) {
    if(event?.type=='offer') {
      if(!this.offer_ids.includes(event?.id)) this.offer_ids.push(event?.id)
      else {
        this.offer_ids.splice(this.offer_ids.indexOf(event?.id),1)
      }
    } else if(event?.type=='subject') {
      if(!this.material_ids.includes(event?.id)) this.material_ids.push(event?.id)
      else {
        this.material_ids.splice(this.material_ids.indexOf(event?.id),1)
      }
    }
  }
  ngOnDestroy() {
    this.cartService.addToCart({
      offer_ids:this.offer_ids,
      material_ids:this.material_ids
    }).subscribe((res:any) => {
      console.log(res)
     // this.toastr.success(res?.message)
    })
  }
}
