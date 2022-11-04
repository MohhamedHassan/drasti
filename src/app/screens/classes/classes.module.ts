import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './components/classes/classes.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClassesComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    SharedModule
  ]
})
export class ClassesModule { }
