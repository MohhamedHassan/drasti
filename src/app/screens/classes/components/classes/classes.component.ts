import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  classes:any
  offer:any
  constructor(private activatedroute:ActivatedRoute,
    private subjectsService:SubjectsService) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((value:any) => {
      if(value?.spe==-1) {
        this.subjectsService.getSubjects(value?.id,1).subscribe(
          (res:any)=> this.classes=res?.data
        )
      }
      else {
        this.subjectsService.getSubjectsWithSpecialist(value?.id,value?.spe,1).subscribe(
          (res:any)=> this.classes=res?.data
        )
      }
      this.subjectsService.getOffer(value?.id)?.subscribe(
        (res:any)=> {
          if(res?.data?.length) {
            this.offer=res?.data[0]
          }
        }
      )
    })
  }

}
