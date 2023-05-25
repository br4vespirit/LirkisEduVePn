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
import {UsersDashboardComponent} from "./components/users-dashboard/users-dashboard.component";
import {GroupsDashboardComponent} from "./components/groups-dashboard/groups-dashboard.component";
import {TaskHistoryComponent} from "./components/task-his/task-history/task-history.component";
import {GroupsPreviewComponent} from "./components/groups-preview/groups-preview.component";
import {GroupSessionsComponent} from "./components/group-sessions/group-sessions.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/profile',
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
    path: "muzeum_extended/task/:taskId/:language",
    component: SceneComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "history/session",
    component: TaskHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "muzeum_habsbourg/task/:taskId/:language",
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
    path: "dashboard/users",
    component: UsersDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ["ADMIN", "TEACHER"]
    }
  },
  {
    path: "dashboard/groups",
    component: GroupsDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ["ADMIN", "TEACHER"]
    }
  },
  {
    path: "dashboard/groups-history",
    component: GroupsPreviewComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ["ADMIN", "TEACHER"]
    }
  },
  {
    path: "dashboard/group/sessions",
    component: GroupSessionsComponent,
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
