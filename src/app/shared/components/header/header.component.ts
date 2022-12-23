import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() imgSrc:string=''
  @Input() text:string=''
  constructor() { }

  ngOnInit(): void {
  }
  urll() {
    return `url(${this.imgSrc})`
  }
}
