import { Component, HostListener } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Database,
  getDatabase,
  ref,
  set,
  onValue,
  onChildAdded,
} from 'firebase/database';
import { CartService } from './screens/cart/services/cart.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { FirebaseappService } from './shared/firebaseapp.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  app: FirebaseApp;
  db: Database;
  savedToken: any;

  constructor(
    public cartService: CartService,
    private router: Router,
    private fire: FirebaseappService,
    private toastr: ToastrService
  ) {
    if (!!localStorage.getItem('drastitoken')) {
      this.listenForTeacherMessages();
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
    this.db = this.fire.db;
    if (!!localStorage.getItem('drastitoken')) {
      set(ref(this.db, `Auth/${localStorage.getItem('drastiuserid')}`), {
        user_token: localStorage.getItem('drastitoken'),
      });
    }
    const authRef = ref(this.db, 'Auth');
    onValue(authRef, (snapshot: any) => {
      if (!!localStorage.getItem('drastitoken')) {
        const data = snapshot.val();
        for (let i in data) {
          if (i == localStorage.getItem('drastiuserid'))
            this.savedToken = data[i];
        }
        if (
          this.savedToken?.user_token != localStorage.getItem('drastitoken')
        ) {
          this.cartService.cartItems.next([]);
          localStorage.removeItem('drastitoken');
          localStorage.removeItem('drastiuserid');
          localStorage.removeItem('drastiusername');
          this.router.navigate(['/']);
        }
      }
    });
  }
  listenForTeacherMessages() {
    // 1- أول حاجة: تجيب المواد المشترك فيها المدرس من الـ backend
    this.cartService
      .getMyCourses()
      .pipe(
        map((res: any) => {
          let data: any = [];
          if (res?.data?.length) {
            res?.data.forEach((element: any) => {
              data.push(String(element?.material?.id));
            });
          }
          return data;
        })
      )
      .subscribe((materialIds) => {
        this.listenForNewMessages(materialIds);
      });
  }
  listenForNewMessages(
    materialIds: string[],
    studentId = localStorage.getItem('drastiuserid')
  ) {
    const loginTime = Date.now(); // وقت تسجيل الدخول

    materialIds.forEach((materialId) => {
      const materialRef = ref(this.db, `Subjects-Messages/${materialId}`);

      // هنا نراقب عند مستوى الـ userIds فقط، وليس الرسائل داخل كل userId
      onChildAdded(materialRef, (userSnapshot) => {
        const userId = userSnapshot.key;

        // نراقب على مستوى الرسائل تحت userId فقط
        const userMessagesRef = ref(
          this.db,
          `Subjects-Messages/${materialId}/${userId}`
        );

        // نراقب الرسائل مباشرة داخل userId
        onChildAdded(userMessagesRef, (msgSnapshot) => {
          const msg = msgSnapshot.val();

          if (msg.to_id === studentId && msg?.from_id != '_1') {
            const msgTime = new Date(msg.date).getTime();

            // تجاهل الرسائل التي أُرسلت قبل تسجيل الدخول
            if (msgTime >= loginTime) {
              console.log(msg);
              this.cartService.showNotification = true;
              this.cartService.notificationInfo = msg;
              const toast = this.toastr.info(
                this.cartService.notificationInfo?.from,
                this.cartService.notificationInfo?.material_name
              );
              toast.onTap.subscribe(() => {
                // توجيه المستخدم عند الكليك
                this.router.navigate(['/all-msgs']);
              });
              // setTimeout(() => {
              //   this.cartService.showNotification = false;
              //   this.cartService.notificationInfo = null;
              // }, 5000);
            }
          }
        });
      });
    });
  }
}
