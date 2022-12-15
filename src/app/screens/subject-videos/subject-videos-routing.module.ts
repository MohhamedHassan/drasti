import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectVideosComponent } from './components/subject-videos/subject-videos.component';

const routes: Routes = [
  {
    path:'',
    component:SubjectVideosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectVideosRoutingModule { }
