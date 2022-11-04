import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConditionsRoutingModule } from './conditions-routing.module';
import { ConditionsComponent } from './components/conditions/conditions.component';


@NgModule({
  declarations: [
    ConditionsComponent
  ],
  imports: [
    CommonModule,
    ConditionsRoutingModule
  ]
})
export class ConditionsModule { }
