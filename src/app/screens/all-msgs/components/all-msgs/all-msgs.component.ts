import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { MyCoursesService } from 'src/app/screens/my-courses/services/my-courses.service';
import localeAr from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeAr); // تسجيل اللغة
import {
  getDatabase,
  ref,
  onChildAdded,
  DatabaseReference,
  off,
} from 'firebase/database';
@Component({
  selector: 'app-all-msgs',
  templateUrl: './all-msgs.component.html',
  styleUrls: ['./all-msgs.component.scss'],
  providers: [
    { provide: LOCALE_ID, useValue: 'ar' }, // تحديد اللغة الافتراضية
  ],
})
export class AllMsgsComponent implements OnInit {
  loading = true;
  studentId = localStorage.getItem('userid') || '';
  materialChats: MaterialChatItem[] = [];
  classes: any[] = [];
  private listeners: DatabaseReference[] = [];
  constructor(private myCoursesService: MyCoursesService) {}

  ngOnInit(): void {
    // this.myCoursesService.getMyCourses().subscribe((res: any) => {
    //   this.classes = res?.data.filter((i) => i.offer == null);
    //   this.classes = this.classes.map((i) => i.material);
    //   //  if (!res?.data?.length)
    //   this.loading = false;
    //   this.classes.forEach((material) => {
    //     const refPath = `Subjects-Messages/${material.id}/${this.studentId}`;
    //     const reff = ref(getDatabase(), refPath);

    //     this.listeners.push(reff);

    //     const latestMessages: { latest: string; hasUnread: boolean } = {
    //       latest: '',
    //       hasUnread: false,
    //     };

    //     onChildAdded(reff, (snapshot) => {
    //       const msg = snapshot.val();
    //       const msgDate = new Date(msg.date).getTime();

    //       if (
    //         !latestMessages.latest ||
    //         msgDate > new Date(latestMessages.latest).getTime()
    //       ) {
    //         latestMessages.latest = msg.date;
    //       }

    //       if (msg.from_id !== this.studentId && msg.did_read === false) {
    //         latestMessages.hasUnread = true;
    //       }

    //       const existingIndex = this.materialChats.findIndex(
    //         (m) => m.materialId === material.id
    //       );
    //       if (existingIndex !== -1) {
    //         this.materialChats[existingIndex] = {
    //           materialId: material.id,
    //           materialName: material.name,
    //           ...latestMessages,
    //         };
    //       } else {
    //         this.materialChats.push({
    //           materialId: material.id,
    //           materialName: material.name,
    //           ...latestMessages,
    //         });
    //       }

    //       // sort by latest message date descending
    //       this.materialChats.sort(
    //         (a, b) =>
    //           new Date(b.latest).getTime() - new Date(a.latest).getTime()
    //       );
    //       //  this.loading = false;
    //     });
    //   });
    // });
    this.myCoursesService.getMyCourses().subscribe((res: any) => {
      this.classes = res?.data.filter(
        (i) => i.offer == null && !i.material.is_blocked
      );
      this.classes = this.classes.map((i) => i.material);
      this.loading = false;

      this.classes.forEach((material) => {
        const refPath = `Subjects-Messages/${material.id}/${this.studentId}`;
        const reff = ref(getDatabase(), refPath);

        this.listeners.push(reff);

        const latestMessages: {
          latest: string;
          latestText: string;
          hasUnread: boolean;
        } = {
          latest: '',
          latestText: '',
          hasUnread: false,
        };

        onChildAdded(reff, (snapshot) => {
          const msg = snapshot.val();
          const msgDate = new Date(msg.date).getTime();
          console.log(msg);
          if (
            !latestMessages.latest ||
            msgDate > new Date(latestMessages.latest).getTime()
          ) {
            latestMessages.latest = msg.date;
            latestMessages.latestText =
              msg?.type == 'audio'
                ? 'رسالة صوتية'
                : msg?.type == 'photo'
                ? 'صورة'
                : msg.message_content || '';
          }

          if (msg.from_id !== this.studentId && msg.did_read === false) {
            latestMessages.hasUnread = true;
          }

          const existingIndex = this.materialChats.findIndex(
            (m) => m.materialId === material.id
          );

          const newChatData = {
            materialId: material.id,
            materialName: material.name,
            ...latestMessages,
          };

          if (existingIndex !== -1) {
            this.materialChats[existingIndex] = newChatData;
          } else {
            this.materialChats.push(newChatData);
          }

          // ترتيب حسب تاريخ آخر رسالة (تنازليًا)
          this.materialChats.sort(
            (a, b) =>
              new Date(b.latest).getTime() - new Date(a.latest).getTime()
          );
        });
      });
    });
  }

  ngOnDestroy(): void {
    // this.listeners.forEach((ref) => off(ref));
  }
}

interface MaterialChatItem {
  materialId: string;
  materialName: string;
  latest: string;
  hasUnread: boolean;
  latestText: string;
}
