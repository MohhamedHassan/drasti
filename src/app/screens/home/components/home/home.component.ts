import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  constructor(private homeService:HomeServiceService,
    private title:Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle(` دراستي - ادرس وانت متطمن `)
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
    }
  )
}
route(item:any):any {
  if(item?.type==1) return `/stage/${item?.id}`
  else if(item?.type==2) return `/classes/${item?.id}/-1`
}
}
