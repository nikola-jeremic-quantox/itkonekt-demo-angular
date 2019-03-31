import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrawerComponent } from './layout/drawer/drawer.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: DrawerComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
