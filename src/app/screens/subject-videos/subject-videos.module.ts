import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectVideosRoutingModule } from './subject-videos-routing.module';
import { SubjectVideosComponent } from './components/subject-videos/subject-videos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [
    SubjectVideosComponent
  ],
  imports: [
    CommonModule,
    SubjectVideosRoutingModule,
    SharedModule,
    AccordionModule.forRoot(),
  ]
})
export class SubjectVideosModule { }
