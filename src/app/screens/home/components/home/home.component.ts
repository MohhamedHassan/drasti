import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../../services/home-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stages:any[]=[]
  classes:any[]=[]
  all:any[]=[]
  loading=true
  constructor(private homeService:HomeServiceService) { }

  ngOnInit(): void {
    this.getHomeStages()
  }
getHomeStages() {
  this.homeService.getHomeStages().subscribe(
    (res:any)=> {
      this.stages=res?.data?.stages
      this.stages.map((item:any) => item.type=1)
      this.classes=res?.data?.classes
      this.classes.map((item:any) => item.type=2)
      this.all=[...this.stages,...this.classes]
      this.loading=false
      console.log(this.stages)
    }
  )
}
route(item:any):any {
  if(item?.type==1) return `/stage/${item?.id}`
  else if(item?.type==2) return `/classes/${item?.id}/-1`
}
}
