import { Component,HostListener } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";
import { CartService } from './screens/cart/services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  app: FirebaseApp;
  db: Database;
  savedToken:any

constructor(private cartService:CartService,
  private router:Router) {
  if(!!localStorage.getItem('drastitoken')) {
    //this.authService.set_online_offline(1)
  }
//   window.addEventListener("beforeunload", (event) => {
//     event.preventDefault();
//     event.returnValue = "Unsaved modifications";
//     return event;
//  });
}


// @HostListener("window:beforeunload", ["$event"])
// beforeUnloadHandler(event) {
//   if(!!localStorage.getItem('drastitoken')) {
//     this.authService.set_online_offline(0)
//   }
// }
ngOnInit(): void {
  this.app = initializeApp({
    apiKey: "AIzaSyCrZO0tF5O5Ms8au460-tmGbNS3mJ6QrEc",
    authDomain: "drasti-37a06.firebaseapp.com",
    databaseURL: "https://drasti-37a06-default-rtdb.firebaseio.com",
    projectId: "drasti-37a06",
    storageBucket: "drasti-37a06.appspot.com",
    messagingSenderId: "850147128578",
    appId: "1:850147128578:web:2153add74417b85d4fbe1b",
    measurementId: "G-41JEDDFQT2"
  });
  this.db = getDatabase(this.app);
  if(!!localStorage.getItem('drastitoken')) {
    set(ref(this.db, `Auth/${localStorage.getItem('userid')}`), {
      user_token:localStorage.getItem('drastitoken')
    });

  }
  const authRef = ref(this.db, 'Auth');
  onValue(authRef, (snapshot: any) => {
    if(!!localStorage.getItem('drastitoken')) { 
      const data = snapshot.val();
      for (let i in data) {
        if(i==localStorage.getItem('userid')) this.savedToken=data[i]
      }
      if(this.savedToken?.user_token!=localStorage.getItem('drastitoken')) {
        this.cartService.cartItems.next([])
        localStorage.removeItem('drastitoken')
        localStorage.removeItem('userid')
        localStorage.removeItem('username')
        this.router.navigate(['/'])
      }
    }
  });
  
}
}
