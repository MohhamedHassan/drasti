import { Component, OnInit } from '@angular/core';
interface test {
  img:string,
  router:string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stages:test[]=[
    {
      img:'https://drastiq8.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-21-at-2.27.18-PM.jpeg',
      router:''
    },
    {
      img:'https://drastiq8.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-21-at-2.27.19-PM-1.jpeg',
      router:''
    },
    {
      img:'https://drastiq8.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-21-at-2.27.19-PM.jpeg',
      router:''
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
