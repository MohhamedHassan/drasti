import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../../services/home-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stages:any
  loading=true
  constructor(private homeService:HomeServiceService) { }

  ngOnInit(): void {
    this.getHomeStages()
  }
getHomeStages() {
  this.homeService.getHomeStages().subscribe(
    (res:any)=> {
      this.stages=res?.data?.stages
      this.loading=false
      console.log(this.stages)
    }
  )
}
}
