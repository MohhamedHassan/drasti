import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StageDetailsRoutingModule } from './stage-details-routing.module';
import { StageDetailsComponent } from './components/stage-details/stage-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StageDetailsComponent
  ],
  imports: [
    CommonModule,
    StageDetailsRoutingModule,
    SharedModule
  ]
})
export class StageDetailsModule { }
