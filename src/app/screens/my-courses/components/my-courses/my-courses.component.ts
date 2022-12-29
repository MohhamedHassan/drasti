import { Component, OnInit } from '@angular/core';
import { MyCoursesService } from '../../services/my-courses.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  loading=true
  offer:any[]=[]
  classes:any[]=[]
  constructor(private myCoursesService:MyCoursesService) { }

  ngOnInit(): void {
    this.myCoursesService.getMyCourses().subscribe(
      res =>  {
       
        this.loading=false
      }
    )
  }

}
