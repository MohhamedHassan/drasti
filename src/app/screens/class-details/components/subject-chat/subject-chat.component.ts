import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  LOCALE_ID,
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
import { ToastrService } from 'ngx-toastr';
import localeAr from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';
import { FirebaseappService } from 'src/app/shared/firebaseapp.service';
registerLocaleData(localeAr); // تسجيل اللغة
@Component({
  selector: 'app-subject-chat',
  templateUrl: './subject-chat.component.html',
  styleUrls: ['./subject-chat.component.scss'],
  providers: [
    { provide: LOCALE_ID, useValue: 'ar' }, // تحديد اللغة الافتراضية
  ],
})
export class SubjectChatComponent implements OnInit, AfterViewInit, OnDestroy {
  private currentAudio: HTMLAudioElement | null = null;
  imageLoading = false;
  currentImage = '';
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
  teacherName;
  currentUserMessages = [];
  constructor(
    private toastr: ToastrService,
    private angularFireStore: AngularFireStorage,
    private datepipe: DatePipe,
    private afs: AngularFirestore,
    private title: Title,
    private classDetailsService: ClassDetailsService,
    private fire: FirebaseappService
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
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.toastr.error('لم يتم اختيار أي ملف');
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      this.toastr.error('الملف المحدد ليس صورة!');
      return;
    }
    const maxSizeInBytes = 50 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      this.toastr.error('حجم الصورة يجب ألا يتجاوز 50 ميجا');
      return;
    }
    console.log(event?.target?.files);
    const img: any = event?.target?.files[0];
    let reference = this.angularFireStore.ref(
      'message_images/' +
        `photo_message_${this.datepipe.transform(
          new Date(),
          'yyyy-MM-dd HH:mm:ss'
        )}`
    );
    this.imageLoading = true;
    this.scrollChatBox();
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
          this.imageLoading = false;
          setTimeout(() => {
            this.handleAutoReplyIfNeeded(this.currentUserMessages);
          }, 1000);
        });
      });
    });
  }
  onAudioPlay(player: HTMLAudioElement): void {
    // لو فيه صوت شغال بالفعل، نوقفه
    if (this.currentAudio && this.currentAudio !== player) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0; // نرجعه للبداية
    }

    // نخزن الصوت الجديد كالحالي
    this.currentAudio = player;
  }
  async sendAudio(event: { audio: any; duration: any }) {
    this.nowRecording = false;
    let reference = this.angularFireStore.ref(
      'message_images/' +
        `voice_message_${this.datepipe.transform(
          new Date(),
          'yyyy-MM-dd HH:mm:ss'
        )}.wav`
    );
    this.imageLoading = true;
    this.scrollChatBox();
    const wavBlob = await this.convertToWav(event.audio);
    reference.put(wavBlob).then(() => {
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
            duration: `${event.duration}`,
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
          this.imageLoading = false;

          setTimeout(() => {
            this.handleAutoReplyIfNeeded(this.currentUserMessages);
          }, 1000);
        });
      });
    });
  }

  ngOnInit(): void {
    this.db = this.fire.db;
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
            this.teacherName = (this.teacherName = this.messages.find(
              (item) =>
                this.userid != item?.from_id &&
                item?.from_id != '_1' &&
                item.from_display_name
            ))?.from_display_name;
            console.log(this.messages);
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
    if (Object.keys(this.currentUserMessages).length > 0) {
      for (let key in this.currentUserMessages) {
        const message = this.currentUserMessages[key];
        const isTeacherMessage =
          message.from_id !== localStorage.getItem('userid');
        if (isTeacherMessage && message.did_read === false) {
          const messageRef = ref(
            this.db,
            `Subjects-Messages/${this.classDetails?.id}/${localStorage.getItem(
              'userid'
            )}/${key}`
          );
          console.log(message);
          update(messageRef, { did_read: true });
        }
      }
    }

    // if (this.authRef) {
    //   off(this.authRef);
    // }
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
          'اهلا بك في تطبيق دراستي سيقوم اعضاء هيئة التدريس بالرد علي سيادتكم خلال ٢٤ ساعة شكرا لاستخدام دراستي',
        type: 'text',
        did_read: false,
        material_name: this.classDetails?.name,
      };

      set(replyRef, autoReplyMessage).then(() => {
        this.classDetailsService
          .addAnswer({
            material_id: this.classDetails?.id,
            answer:
              'اهلا بك في تطبيق دراستي سيقوم اعضاء هيئة التدريس بالرد علي سيادتكم خلال ٢٤ ساعة شكرا لاستخدام دراستي',
            student_id: localStorage.getItem('userid'),
          })
          .subscribe();
      });
    }
  }
  downloadImage() {
    fetch(this.currentImage)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded-image.' + 'png';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((err) => console.error('Download failed:', err));
  }
  async convertToWav(blob: Blob): Promise<Blob> {
    const audioCtx = new AudioContext();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const wavBuffer = this.audioBufferToWav(audioBuffer);
    return new Blob([wavBuffer], { type: 'audio/wav' });
  }

  // تحويل الـ AudioBuffer لـ wav
  audioBufferToWav(buffer: AudioBuffer) {
    const numOfChannels = buffer.numberOfChannels;
    const length = buffer.length * numOfChannels * 2 + 44;
    const result = new ArrayBuffer(length);
    const view = new DataView(result);

    const channels = [];
    let sample;
    let offset = 0;
    let pos = 0;

    // write WAV header
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"

    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChannels);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChannels); // avg. bytes/sec
    setUint16(numOfChannels * 2); // block-align
    setUint16(16); // 16-bit
    setUint32(0x61746164); // "data" - chunk
    setUint32(length - pos - 4); // chunk length

    // write interleaved data
    for (let i = 0; i < buffer.numberOfChannels; i++)
      channels.push(buffer.getChannelData(i));

    while (pos < length) {
      for (let i = 0; i < numOfChannels; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff; // scale
        view.setInt16(pos, sample, true); // write 16-bit sample
        pos += 2;
      }
      offset++;
    }

    return result;

    function setUint16(data: any) {
      view.setUint16(pos, data, true);
      pos += 2;
    }
    function setUint32(data: any) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  }
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    this.currentImage = '';
  }
}
