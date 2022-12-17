import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserGuard } from './guards/user.guard';
const routes: Routes = [
  {
    path:'',
    loadChildren:() => import('src/app/screens/home/home.module').then(m =>m.HomeModule)
  },
  {
    path:'auth',
    loadChildren:() => import('src/app/screens/auth/auth.module').then(m =>m.AuthModule),
    canActivate:[UserGuard]
  },
  {
    path:'stage/:id',
    loadChildren:() => import('src/app/screens/stage-details/stage-details.module').then(m =>m.StageDetailsModule)
  },
  {
    path:'classes/:id/:spe',
    loadChildren:() => import('src/app/screens/classes/classes.module').then(m =>m.ClassesModule)
  },
  {
    path:'specialist/:id/:specialist',
    loadChildren:() => import('src/app/screens/has-specialist/has-specialist.module').then(m =>m.HasSpecialistModule)
  },
  {
    path:'class-details/:id/:type/:class/:spe',
    loadChildren:() => import('src/app/screens/class-details/class-details.module').then(m =>m.ClassDetailsModule)
  },
  {
    path:'conditions',
    loadChildren:() => import('src/app/screens/conditions/conditions.module').then(m =>m.ConditionsModule)
  },
  {
    path:'subject-videos/:id/:lessonid/:unitid',
    loadChildren:() => import('src/app/screens/subject-videos/subject-videos.module').then(m =>m.SubjectVideosModule)
  },
  {
    path:'cart',
    loadChildren:() => import('src/app/screens/cart/cart.module').then(m =>m.CartModule)
  },
  {
    path:'checkout',
    loadChildren:() => import('src/app/screens/checkout/checkout.module').then(m =>m.CheckoutModule)
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled',
    useHash: true
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
