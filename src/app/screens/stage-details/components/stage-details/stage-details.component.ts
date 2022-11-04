import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stage-details',
  templateUrl: './stage-details.component.html',
  styleUrls: ['./stage-details.component.scss']
})
export class StageDetailsComponent implements OnInit {
  stages:number[]=[
  ]
  constructor() { }

  ngOnInit(): void {
    this.stages.length=3
  }

}
