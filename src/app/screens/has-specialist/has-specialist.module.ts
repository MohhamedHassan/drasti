import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HasSpecialistRoutingModule } from './has-specialist-routing.module';
import { HasSpecialistComponent } from './components/has-specialist/has-specialist.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HasSpecialistComponent
  ],
  imports: [
    CommonModule,
    HasSpecialistRoutingModule,
    SharedModule
  ]
})
export class HasSpecialistModule { }
