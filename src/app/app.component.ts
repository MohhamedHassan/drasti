import { Component,HostListener } from '@angular/core';
import { AuthService } from './screens/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

 

constructor(private authService:AuthService) {
  if(!!localStorage.getItem('drastitoken')) {
    this.authService.set_online_offline(1)
  }
//   window.addEventListener("beforeunload", (event) => {
//     event.preventDefault();
//     event.returnValue = "Unsaved modifications";
//     return event;
//  });
}


@HostListener("window:beforeunload", ["$event"])
beforeUnloadHandler(event) {
  if(!!localStorage.getItem('drastitoken')) {
    this.authService.set_online_offline(0)
  }
}
}
