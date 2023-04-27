import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {FooterComponent} from './components/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {UtilsService} from "./services/utils.service";
import {AuthGuard} from "./components/auth/auth.guard";
import {AuthInterceptor} from "./components/auth/auth.interceptor";
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {JoinQuizComponent} from './components/join-quiz/join-quiz.component';
import {CreateQuizComponent} from './components/create-quiz/create-quiz.component';
import {HistoryQuizComponent} from './components/history-quiz/history-quiz.component';
import {ProfileSettingsComponent} from './components/profile-settings/profile-settings.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ConfirmationDialog} from "./components/dialogs/confirmation-dialog/confirmation-dialog.component";
import {UserSettingsComponent} from './components/user-settings/user-settings.component';
import {MatSelectModule} from "@angular/material/select";
import {PreviewScenariosComponent} from './components/preview-scenarios/preview-scenarios.component';
import {SceneComponent} from './components/tasks/scenes/muzeum_extended/scene.component';
import {CreateSceneComponent} from './components/create-scene/create-scene.component';
import {CreateTaskComponent} from './components/create-task/create-task.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {PreviewSceneComponent} from './components/preview-scene/preview-scene.component';
import {PreviewTasksComponent} from './components/preview-tasks/preview-tasks.component';
import {Muzeum_habsbourgComponent} from './components/tasks/scenes/muzeum_habsbourg/muzeum_habsbourg.component';
import {UsersDashboardComponent} from './components/users-dashboard/users-dashboard.component';
import {GroupsDashboardComponent} from './components/groups-dashboard/groups-dashboard.component';
import {GroupSettingsComponent} from './components/group-settings/group-settings.component';
import {GroupsModificationComponent} from './components/groups-modification/groups-modification.component';
import {TaskHistoryComponent} from './components/task-history/task-history.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AboutComponent,
    LoginComponent,
    RegistrationComponent,
    FooterComponent,
    RegistrationComponent,
    UserProfileComponent,
    JoinQuizComponent,
    CreateQuizComponent,
    HistoryQuizComponent,
    ProfileSettingsComponent,
    DashboardComponent,
    ConfirmationDialog,
    UserSettingsComponent,
    PreviewScenariosComponent,
    SceneComponent,
    CreateSceneComponent,
    CreateTaskComponent,
    PreviewSceneComponent,
    PreviewTasksComponent,
    Muzeum_habsbourgComponent,
    UsersDashboardComponent,
    GroupsDashboardComponent,
    GroupSettingsComponent,
    GroupsModificationComponent,
    TaskHistoryComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        HttpClientModule,
        MatSnackBarModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        FormsModule
    ],
  providers: [UtilsService, AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
