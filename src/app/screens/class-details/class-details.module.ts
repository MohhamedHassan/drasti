import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassDetailsRoutingModule } from './class-details-routing.module';
import { ClassDetailsComponent } from './components/class-details/class-details.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from 'src/app/shared/shared.module';
import { UrlDirective } from './url.directive';
import { SubjectChatComponent } from './components/subject-chat/subject-chat.component';
import { AudioChatComponent } from './components/subject-chat/audio-chat/audio-chat.component';


@NgModule({
  declarations: [
    ClassDetailsComponent,
    UrlDirective,
    SubjectChatComponent,
    AudioChatComponent
  ],
  imports: [
    CommonModule,
    ClassDetailsRoutingModule,
    AccordionModule.forRoot(),
    SharedModule
  ]
})
export class ClassDetailsModule { }
