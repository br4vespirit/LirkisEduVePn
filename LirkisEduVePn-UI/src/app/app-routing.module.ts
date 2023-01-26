import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {AuthGuard} from "./components/auth/auth.guard";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "register",
    component: RegistrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user/profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
