import { Component, OnInit } from '@angular/core';
import { MyCoursesService } from 'src/app/screens/my-courses/services/my-courses.service';

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
})
export class AllMsgsComponent implements OnInit {
  loading = true;
  studentId = localStorage.getItem('userid') || '';
  materialChats: MaterialChatItem[] = [];
  classes: any[] = [];
  private listeners: DatabaseReference[] = [];
  constructor(private myCoursesService: MyCoursesService) {}

  ngOnInit(): void {
    this.myCoursesService.getMyCourses().subscribe((res: any) => {
      this.classes = res?.data.filter((i) => i.offer == null);
      this.classes = this.classes.map((i) => i.material);
      if (!res?.data?.length) this.loading = false;
      this.classes.forEach((material) => {
        const refPath = `Subjects-Messages/${material.id}/${this.studentId}`;
        const reff = ref(getDatabase(), refPath);

        this.listeners.push(reff);

        const latestMessages: { latest: string; hasUnread: boolean } = {
          latest: '',
          hasUnread: false,
        };

        onChildAdded(reff, (snapshot) => {
          const msg = snapshot.val();
          const msgDate = new Date(msg.date).getTime();

          if (
            !latestMessages.latest ||
            msgDate > new Date(latestMessages.latest).getTime()
          ) {
            latestMessages.latest = msg.date;
          }

          if (msg.from_id !== this.studentId && msg.did_read === false) {
            latestMessages.hasUnread = true;
          }

          const existingIndex = this.materialChats.findIndex(
            (m) => m.materialId === material.id
          );
          if (existingIndex !== -1) {
            this.materialChats[existingIndex] = {
              materialId: material.id,
              materialName: material.name,
              ...latestMessages,
            };
          } else {
            this.materialChats.push({
              materialId: material.id,
              materialName: material.name,
              ...latestMessages,
            });
          }

          // sort by latest message date descending
          this.materialChats.sort(
            (a, b) =>
              new Date(b.latest).getTime() - new Date(a.latest).getTime()
          );
          this.loading = false;
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.listeners.forEach((ref) => off(ref));
  }
}

interface MaterialChatItem {
  materialId: string;
  materialName: string;
  latest: string;
  hasUnread: boolean;
}
