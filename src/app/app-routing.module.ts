import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    loadChildren:() => import('src/app/screens/home/home.module').then(m =>m.HomeModule)
  },
  {
    path:'login',
    loadChildren:() => import('src/app/screens/auth/auth.module').then(m =>m.AuthModule)
  },
  {
    path:'category-details',
    loadChildren:() => import('src/app/screens/stage-details/stage-details.module').then(m =>m.StageDetailsModule)
  },
  {
    path:'classes',
    loadChildren:() => import('src/app/screens/classes/classes.module').then(m =>m.ClassesModule)
  },
  {
    path:'class-details',
    loadChildren:() => import('src/app/screens/class-details/class-details.module').then(m =>m.ClassDetailsModule)
  },
  {
    path:'conditions',
    loadChildren:() => import('src/app/screens/conditions/conditions.module').then(m =>m.ConditionsModule)
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
