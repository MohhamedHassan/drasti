import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  classes:number[]=[]
  constructor() { }

  ngOnInit(): void {
    this.classes.length=4
  }

}
