import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ClassDetailsService } from '../../services/class-details.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  classDetails:any={}
  loading=true
  lessons:any[]=[]
  units:any[]=[]
  lessonsOrUnis=0
  constructor(private classdetailsService:ClassDetailsService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap((value:any) => {
        return this.classdetailsService.getClassDetails(value?.id)
      })
    ).subscribe((res:any)=> {
      console.log(res)
      this.loading=false
      this.classDetails=res?.data
      if(this.classDetails?.has_units) {
        this.lessonsOrUnis=1
        this.getUnits(this.classDetails?.id)
      } else if(this.classDetails?.has_lessons) {
        this.lessonsOrUnis=2
        this.getLessons(this.classDetails?.id)
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
}
