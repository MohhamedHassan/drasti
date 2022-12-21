import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute,Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ClassDetailsService } from 'src/app/screens/class-details/services/class-details.service';

@Component({
  selector: 'app-subject-videos',
  templateUrl: './subject-videos.component.html',
  styleUrls: ['./subject-videos.component.scss']
})
export class SubjectVideosComponent implements OnInit {
  loading=true
  lessons:any[]=[]
  units:any[]=[]
  lessonid=-1
  unitid=-1
  opendvideo:any
  hdeSidebar=false
  constructor(private classdetailsService:ClassDetailsService,
    private _sanitizer:DomSanitizer,
    private title:Title,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
     this.title.setTitle(` دراستي - ادرس وانت متطمن `)
    this.activatedRoute.params.pipe(
      switchMap((value:any) => {
        this.lessonid=value?.lessonid
        this.unitid=value?.unitid
        return this.classdetailsService.getClassDetails(value?.id)
      })
    ).subscribe((res:any)=> {
      
        if(res?.data?.is_paid) {
          this.title.setTitle(res?.data?.name) 
          if(res?.data?.has_units) {
            this.getUnits(res?.data?.id)
          } else if(res?.data?.has_lessons) {
            this.getLessons(res?.data?.id)
          }
        } else {
          this.router.navigate(['/'])
        }

    })

    
}
openAccordion() {
  if(this.lessonid==-1) {
    if(this.units?.length) return this.units[0]?.lessons[0]?.id
  }
}

savedHtml(content:string) {
  return this._sanitizer.bypassSecurityTrustHtml(content)
}
getUnits(id:any) {
  this.classdetailsService.classUnites(id).subscribe(
    (res:any) => {

      this.units=res?.data
      if(this.unitid==-1&&this.units?.length) {
        this.unitid=res?.data[0]?.id

      } 
      if(this.lessonid==-1&&this.units?.length) {
        if(res?.data[0]?.lessons?.length) {
          this.opendvideo=res?.data[0]?.lessons[0]
          this.lessonid=res?.data[0]?.lessons[0]?.id
        }
      } else {
        this.units.forEach(item=> {
          if(item?.lessons?.length) {
            item?.lessons.forEach((child:any) =>  {
              if( child?.id == this.lessonid) {
                this.opendvideo=child
              }
            })
          }
       })
      }
      this.loading=false

    }
  )
}
getLessons(id:any) {
  this.classdetailsService.classLessons(id).subscribe(
    (res:any) => {
      this.lessons=res?.data
      this.loading=false
    }
  )
}
savedYoutube(link:any):any {
  if(link) {
    let id =  link.slice(link.indexOf('v=')+2,link.lastIndexOf('&'))
    return this._sanitizer.bypassSecurityTrustHtml(`<iframe 
    style="min-height:70vh"
    src='https://www.youtube.com/embed/${id}' class="w-100"></iframe>`)
  }
}
scrll() {
  window.scroll(0,0)
}
}
