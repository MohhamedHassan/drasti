import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCoursesRoutingModule } from './my-courses-routing.module';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MyCoursesComponent
  ],
  imports: [
    CommonModule,
    MyCoursesRoutingModule,
    SharedModule
  ]
})
export class MyCoursesModule { }
