import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasSpecialistComponent } from './components/has-specialist/has-specialist.component';

const routes: Routes = [
  {
    path:'',
    component:HasSpecialistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HasSpecialistRoutingModule { }
