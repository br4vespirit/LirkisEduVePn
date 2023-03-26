import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {AuthGuard} from "./components/auth/auth.guard";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RoleGuard} from "./components/auth/role.guard";
import {SceneComponent} from "./components/tasks/scenes/muzeum_extended/scene.component";
import {Muzeum_habsbourgComponent} from "./components/tasks/scenes/muzeum_habsbourg/muzeum_habsbourg.component";

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
    path: "scene/task/:taskId",
    component: SceneComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "habsbourg/task/:taskId",
    component: Muzeum_habsbourgComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ["ADMIN", "TEACHER"]
    }
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
