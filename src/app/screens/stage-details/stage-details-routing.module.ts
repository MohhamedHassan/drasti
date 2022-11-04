import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StageDetailsComponent } from './components/stage-details/stage-details.component';

const routes: Routes = [
  {
    path:'',
    component:StageDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StageDetailsRoutingModule { }
