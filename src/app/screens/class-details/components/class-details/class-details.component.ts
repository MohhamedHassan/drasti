import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CartService } from 'src/app/screens/cart/services/cart.service';
import { SubjectsService } from 'src/app/screens/classes/services/subjects.service';
import { ClassDetailsService } from '../../services/class-details.service';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue } from 'firebase/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
SwiperCore.use([Navigation, Pagination]);
@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent implements OnInit {
  imageLoading = false;
  currentImage = '';
  @ViewChild('boxchat') boxchat: ElementRef;
  showChatBox = false;
  showNewChatBox = false;
  messages: any = [];
  app: FirebaseApp;
  db: Database;
  swpieroptions: any = {
    slidesPerView: 3,
    spaceBetween: '50',
    pagination: false,
    navigation: 'true',
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
    },
  };
  offerSubjects: any[] = [];
  classDetails: any = {};
  ispaid = false;
  loading = true;
  lessons: any[] = [];
  units: any[] = [];
  lessonsOrUnis = 0;
  type = '';
  cart = false;
  cartitems: any[] = [];
  attachOrClasses = 1;
  attchments: any[] = [];
  classid;
  constructor(
    private toastr: ToastrService,
    private classdetailsService: ClassDetailsService,
    private angularFireStore: AngularFireStorage,
    private datepipe: DatePipe,
    private afs: AngularFirestore,
    private _sanitizer: DomSanitizer,
    private title: Title,
    private cartService: CartService,
    private subjectsService: SubjectsService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  // ngAfterViewInit() {
  //   this.ref.detach()
  // }
  scrollChatBox() {
    setTimeout(() => {
      if (this.boxchat) {
        this.boxchat.nativeElement.scrollTop =
          this.boxchat.nativeElement.scrollHeight;
      }
    }, 10);
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
    this.imageLoading = true;
    this.scrollChatBox();
    reference.put(img).then(() => {
      reference.getDownloadURL().subscribe((imageurl) => {
        let date = new Date();
        set(
          ref(
            this.db,
            `Messages/${this.classid}/${localStorage.getItem(
              'userid'
            )}/${this.afs.createId()}`
          ),
          {
            date: this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss'),
            from: localStorage.getItem('username'),
            from_id: localStorage.getItem('userid'),
            message_content: imageurl,
            to: this.classDetails?.name,
            to_id: this.classid,
            type: 'photo',
          }
        ).then(() => {
          this.imageLoading = false;
        });
      });
    });
  }
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
    this.activatedRoute.params.subscribe((value: any) => {
      this.classid = value?.id;
      const authRef = ref(
        this.db,
        `Messages/${this.classid}/${localStorage.getItem('userid')}`
      );
      onValue(authRef, (snapshot: any) => {
        this.messages = [];
        if (!!localStorage.getItem('drastitoken')) {
          const data = snapshot.val();
          let subjectMessages = data;
          // for (let i in data) {
          //   if (i == value?.id) subjectMessages = data[i];
          // }
          if (subjectMessages) {
            let currentUserMessages = null;
            // for (let i in subjectMessages) {
            //   if (i == localStorage.getItem('userid'))
            //     currentUserMessages = subjectMessages[i];
            // }
            currentUserMessages = subjectMessages;
            if (currentUserMessages) {
              this.messages = Object.values(currentUserMessages);
              // for (let i in currentUserMessages) {
              //   this.messages.push(currentUserMessages[i]);
              // }
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
      this.loading = true;
      this.type = value?.type;
      if (value?.type == 'offer') {
        if (value?.spe == -1) {
          this.subjectsService.getOffer(value?.class)?.subscribe((res: any) => {
            if (res?.data?.length) {
              if (Array.isArray(res?.data)) {
                this.classDetails = res?.data.find(
                  (item: any) => item?.id == value?.id
                );
                this.classDetails.speid = -1;
                this.offerSubjects = this.classDetails?.materials;
                this.ispaid = this.classDetails?.is_paid;
              }
            }
            this.title.setTitle(this.classDetails?.name);
            this.getCart();
            this.loading = false;
          });
        } else {
          this.subjectsService
            .getOfferWithSpecialist(value?.class, value?.spe)
            ?.subscribe((res: any) => {
              if (res?.data?.length) {
                if (Array.isArray(res?.data)) {
                  this.classDetails = res?.data.find(
                    (item: any) => item?.id == value?.id
                  );
                  this.offerSubjects = this.classDetails?.materials;
                  this.ispaid = this.classDetails?.is_paid;
                }
              }
              this.getCart();
              this.loading = false;
            });
        }
      } else {
        this.offerSubjects = [];
        this.classdetailsService
          .getClassDetails(value?.id)
          .subscribe((res: any) => {
            this.classDetails = res?.data;
            this.classDetails.speid = value?.spe;
            this.ispaid = res?.data?.is_paid;
            if (this.ispaid) {
              this.attchments = [
                ...res?.data?.public_attachment,
                ...res?.data?.private_attachment,
              ];
            } else {
              this.attchments = res?.data?.public_attachment;
            }
            this.title.setTitle(this.classDetails?.name);
            if (this.classDetails?.has_units) {
              this.lessonsOrUnis = 1;
              this.getUnits(this.classDetails?.id);
            } else if (this.classDetails?.has_lessons) {
              this.lessonsOrUnis = 2;
              this.getLessons(this.classDetails?.id);
            }
            if (
              this.activatedRoute.snapshot.queryParams['openChat'] == 'true'
            ) {
              this.showNewChatBox = true;
            }
            this.loading = false;
            this.getCart();
          });
      }
    });
  }
  savedYoutube(link: any): any {
    if (link) {
      let id = link.slice(link.indexOf('v=') + 2, link.lastIndexOf('&'));
      // return this._sanitizer.bypassSecurityTrustHtml(`<iframe src='https://www.youtube.com/embed/${id}' class="w-100" style="height:360px"></iframe>`)
      return `https://www.youtube.com/embed/${id}`;
    }
  }

  savedHtml(content: string) {
    return this._sanitizer.bypassSecurityTrustHtml(content);
  }
  getCart() {
    this.cartService.cartItems.subscribe((res: any) => {
      if (res) {
        this.cartitems = res;
        if (this.type != 'offer') {
          this.cartitems.forEach((cartItem: any) => {
            if (this.classDetails?.id == cartItem?.material?.id) {
              this.cart = true;
            }
          });
        } else {
          this.cartitems.forEach((cartItem: any) => {
            if (this.classDetails?.id == cartItem?.offer?.id) {
              this.cart = true;
            }
          });
        }
      }
    });
  }
  getUnits(id: any) {
    this.classdetailsService.classUnites(id).subscribe((res: any) => {
      this.units = res?.data;
    });
  }
  getLessons(id: any) {
    this.classdetailsService.classLessons(id).subscribe((res: any) => {
      this.lessons = res?.data;
    });
  }
  pushCartIds() {
    if (this.type == 'offer') {
      if (!!localStorage.getItem('drastitoken')) {
        this.loading = true;
        this.cartService
          .addToCart({
            offer_ids: [this.classDetails?.id],
            material_ids: [],
          })
          .subscribe(
            (res: any) => {
              this.cart = true;
              this.cartService.getCart();
              this.loading = false;
            },
            (err) => {
              this.loading = false;
            }
          );
      } else {
        let cartItem = {
          has_offer: true,
          offer: this.classDetails,
        };
        this.cartitems.push(cartItem);
        this.cartService.cartItems.next(this.cartitems);
        this.cart = true;
        this.getCart();
      }
    } else if (this.type == 'subject') {
      if (!!localStorage.getItem('drastitoken')) {
        this.loading = true;
        this.cartService
          .addToCart({
            material_ids: [this.classDetails?.id],
            offer_ids: [],
          })
          .subscribe(
            (res: any) => {
              this.cart = true;
              this.cartService.getCart();
              this.loading = false;
            },
            (err) => {
              this.loading = false;
            }
          );
      } else {
        let cartItem = {
          has_material: true,
          material: this.classDetails,
        };
        this.cartitems.push(cartItem);
        this.cartService.cartItems.next(this.cartitems);
        this.cart = true;
        this.getCart();
      }
    }
  }
  get userid() {
    return localStorage.getItem('userid');
  }
  islogin() {
    return !!localStorage.getItem('drastitoken');
  }
  sendMessage(input: any) {
    let inputValue = input.value;
    if (inputValue.toString().trim().length > 0) {
      let date = new Date();
      set(
        ref(
          this.db,
          `Messages/${this.classid}/${localStorage.getItem(
            'userid'
          )}/${this.afs.createId()}`
        ),
        {
          date: this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss'),
          from: localStorage.getItem('username'),
          from_id: localStorage.getItem('userid'),
          message_content: inputValue,
          to: this.classDetails?.name,
          to_id: this.classid,
          type: 'text',
        }
      );
      input.value = '';
    }
  }
  checkIfStudentBlocked() {
    if (this.classDetails?.is_blocked) {
      this.toastr.error('تم حظرك من ارسال الرسائل');
    } else {
      this.showChatBox = false;
      this.showNewChatBox = true;
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
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    this.currentImage = '';
  }
}
