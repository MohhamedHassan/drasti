import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { StageDetailsService } from 'src/app/screens/stage-details/services/stage-details.service';

@Component({
  selector: 'app-has-specialist',
  templateUrl: './has-specialist.component.html',
  styleUrls: ['./has-specialist.component.scss']
})
export class HasSpecialistComponent implements OnInit {
  loading=true
  stages:any
  banner:any
  id:any
  constructor(private activatedRoute:ActivatedRoute,
    private stageService:StageDetailsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap((params:any) => {
        this.id=params?.specialist
         return this.stageService.getHomeStages(params?.id)
      })
    ).subscribe(
      (res:any)=> {
        this.stages= res?.data?.classes.find((item:any) => {         
            return item?.id==this.id
          })?.has_specialties
          //this.banner=res?.data[0].media
        this.loading=false
        console.log(this.stages)
      }
    )
  }

}
