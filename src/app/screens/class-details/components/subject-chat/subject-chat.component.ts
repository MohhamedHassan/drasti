import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Database,
  getDatabase,
  ref,
  set,
  onValue,
  update,
  DatabaseReference,
  off,
  onChildAdded,
} from 'firebase/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ClassDetailsService } from '../../services/class-details.service';
@Component({
  selector: 'app-subject-chat',
  templateUrl: './subject-chat.component.html',
  styleUrls: ['./subject-chat.component.scss'],
})
export class SubjectChatComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('boxchat2') boxchat: ElementRef;
  micrphonAlert = false;
  nowRecording = false;
  showaudio = true;
  messages: any = [];
  app: FirebaseApp;
  db: Database;
  @Input() classDetails;
  @Output() closeChat = new EventEmitter<void>();
  private authRef: DatabaseReference;
  constructor(
    private angularFireStore: AngularFireStorage,
    private datepipe: DatePipe,
    private afs: AngularFirestore,
    private title: Title,
    private classDetailsService: ClassDetailsService
  ) {}

  scrollChatBox() {
    setTimeout(() => {
      if (this.boxchat) {
        this.boxchat.nativeElement.scrollTop =
          this.boxchat.nativeElement.scrollHeight;
      }
    }, 10);
  }
  ngAfterViewInit(): void {
    this.scrollChatBox();
  }
  onImageChange(event) {
    const img: any = event?.target?.files[0];
    let reference = this.angularFireStore.ref(
      'message_images/' +
        `photo_message_${this.datepipe.transform(
          new Date(),
          'yyyy-MM-dd HH:mm:ss'
        )}`
    );
    reference.put(img).then(() => {
      reference.getDownloadURL().subscribe((imageurl) => {
        let date = new Date();
        set(
          ref(
            this.db,
            `Subjects-Messages/${this.classDetails?.id}/${localStorage.getItem(
              'userid'
            )}/${this.afs.createId()}`
          ),
          {
            date: this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss'),
            did_read: false,
            from: localStorage.getItem('username'),
            from_number: localStorage.getItem('userphone'),
            from_id: localStorage.getItem('userid'),
            message_content: imageurl,
            material_name: this.classDetails?.name,
            to: this.classDetails?.name,
            to_id: `${this.classDetails?.id}`,
            type: 'photo',
          }
        ).then(() => {
          this.classDetailsService
            .addQuestion({
              material_id: this.classDetails?.id,
              question: 'صورة',
            })
            .subscribe();
          setTimeout(() => {
            this.handleAutoReplyIfNeeded(this.currentUserMessages);
          }, 1000);
        });
      });
    });
  }
  sendAudio(audio: any) {
    this.nowRecording = false;
    let reference = this.angularFireStore.ref(
      'message_images/' +
        `voice_message_${this.datepipe.transform(
          new Date(),
          'yyyy-MM-dd HH:mm:ss'
        )}`
    );
    reference.put(audio).then(() => {
      reference.getDownloadURL().subscribe((audioUrl) => {
        let date = new Date();
        set(
          ref(
            this.db,
            `Subjects-Messages/${this.classDetails?.id}/${localStorage.getItem(
              'userid'
            )}/${this.afs.createId()}`
          ),
          {
            date: this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss'),
            did_read: false,
            from: localStorage.getItem('username'),
            from_number: localStorage.getItem('userphone'),
            from_id: localStorage.getItem('userid'),
            message_content: audioUrl,
            material_name: this.classDetails?.name,
            to: this.classDetails?.name,
            to_id: `${this.classDetails?.id}`,
            type: 'audio',
          }
        ).then(() => {
          this.classDetailsService
            .addQuestion({
              material_id: this.classDetails?.id,
              question: 'رسالة صوتية',
            })
            .subscribe();
          setTimeout(() => {
            this.handleAutoReplyIfNeeded(this.currentUserMessages);
          }, 1000);
        });
      });
    });
  }
  currentUserMessages = [];
  ngOnInit(): void {
    this.app = initializeApp({
      apiKey: 'AIzaSyCrZO0tF5O5Ms8au460-tmGbNS3mJ6QrEc',
      authDomain: 'drasti-37a06.firebaseapp.com',
      databaseURL: 'https://drasti-37a06-default-rtdb.firebaseio.com',
      projectId: 'drasti-37a06',
      storageBucket: 'drasti-37a06.appspot.com',
      messagingSenderId: '850147128578',
      appId: '1:850147128578:web:2153add74417b85d4fbe1b',
      measurementId: 'G-41JEDDFQT2',
    });
    this.db = getDatabase(this.app);
    window.scroll(0, 0);
    this.title.setTitle(` دراستي - ادرس وانت متطمن `);

    this.authRef = ref(
      this.db,
      `Subjects-Messages/${this.classDetails?.id}/${localStorage.getItem(
        'userid'
      )}`
    );
    onValue(this.authRef, (snapshot: any) => {
      this.messages = [];
      if (!!localStorage.getItem('drastitoken')) {
        const data = snapshot.val();
        let subjectMessages = data;
        if (subjectMessages) {
          let currentUserMessages: any = subjectMessages;
          this.currentUserMessages = subjectMessages;
          if (currentUserMessages) {
            this.messages = Object.values(currentUserMessages);

            this.messages = this.messages.sort(function (a, b) {
              let left: any = new Date(a.date);
              let right: any = new Date(b.date);
              return left - right;
            });
          }
        }
        setTimeout(() => {
          if (this.boxchat) {
            this.boxchat.nativeElement.scrollTop =
              this.boxchat.nativeElement.scrollHeight;
          }
        }, 10);
      }
    });
  }

  sendMessage(input: any) {
    let inputValue = input.value;
    if (inputValue.toString().trim().length > 0) {
      let date = new Date();
      set(
        ref(
          this.db,
          `Subjects-Messages/${this.classDetails?.id}/${localStorage.getItem(
            'userid'
          )}/${this.afs.createId()}`
        ),
        {
          did_read: false,
          date: this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss'),
          from: localStorage.getItem('username'),
          from_number: localStorage.getItem('userphone'),
          from_id: localStorage.getItem('userid'),
          message_content: inputValue,
          material_name: this.classDetails?.name,
          to: this.classDetails?.name,
          to_id: `${this.classDetails?.id}`,
          type: 'text',
        }
      ).then(() => {
        this.classDetailsService
          .addQuestion({
            material_id: this.classDetails?.id,
            question: inputValue,
          })
          .subscribe();
        setTimeout(() => {
          this.handleAutoReplyIfNeeded(this.currentUserMessages);
        }, 1000);
      });
      input.value = '';
    }
  }
  get userid() {
    return localStorage.getItem('userid');
  }
  ngOnDestroy(): void {
    if (this.currentUserMessages?.length) {
      for (let i = 0; i < this.currentUserMessages?.length; i++) {
        const message = this.currentUserMessages[i];
        const isTeacherMessage =
          message.from_id !== localStorage.getItem('userid');
        if (isTeacherMessage && message.did_read === false) {
          const messageRef = ref(
            this.db,
            `Subjects-Messages/${this.classDetails?.id}/${localStorage.getItem(
              'userid'
            )}/${i}`
          );

          update(messageRef, { did_read: true });
        }
      }
    }

    if (this.authRef) {
      off(this.authRef);
    }
  }
  // this.handleAutoReplyIfNeeded(currentUserMessages);
  handleAutoReplyIfNeeded(messagesMap: any) {
    const today = new Date();
    const alreadyRepliedToday = Object.values(messagesMap).some((msg: any) => {
      return (
        msg.from_id == '_1' &&
        this.datepipe.transform(msg.date, 'yyyy-MM-dd') ===
          this.datepipe.transform(today, 'yyyy-MM-dd')
      );
    });
    if (alreadyRepliedToday) return;

    if (true) {
      const replyId = this.afs.createId();
      const replyRef = ref(
        this.db,
        `Subjects-Messages/${this.classDetails.id}/${localStorage.getItem(
          'userid'
        )}/${replyId}`
      );

      const autoReplyMessage = {
        from: 'الرد الالي',
        from_id: '_1',
        from_number: localStorage.getItem('userphone'),
        to: localStorage.getItem('username'),
        to_id: `${localStorage.getItem('userid')}`,
        date: this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        message_content:
          'اهلا بك في تطبيق دراستي\nسيقوم اعضاء هيئة التدريس بالرد علي سيادتكم خلال ٢٤ ساعة\nشكرا لاستخدام دراستي',
        type: 'text',
        did_read: false,
        material_name: this.classDetails?.name,
      };

      set(replyRef, autoReplyMessage).then(() => {
        this.classDetailsService
          .addAnswer({
            material_id: this.classDetails?.id,
            answer:
              'اهلا بك في تطبيق دراستي\nسيقوم اعضاء هيئة التدريس بالرد علي سيادتكم خلال ٢٤ ساعة\nشكرا لاستخدام دراستي',
            student_id: localStorage.getItem('userid'),
          })
          .subscribe();
      });
    }
  }
}
