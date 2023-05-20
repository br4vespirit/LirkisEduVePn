import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegistrationRequest} from "../models/registration-request.model";
import {Observable} from "rxjs";
import {LoginRequest} from "../models/login-request.model";
import {ProfileUpdate} from "../models/profile-update.model";
import {TaskCreation} from "../models/task-creation.model";
import {GroupTasks} from "../models/group-tasks.model";
import {TaskRequest} from "../models/task-request.model";
import {TaskSessionFinishRequest} from "../models/task-session-finish-request.model";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  // private API_URL: string = "http://localhost:8080/api/v1";
  private API_URL: string = "http://147.232.205.222:8080/api/v1";

  private headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  })

  constructor(private _client: HttpClient) {
  }

  public register(request: RegistrationRequest): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/auth/registration",
      request,
      {headers: this.headers}
    )
  }

  public login(request: LoginRequest): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/auth/authenticate",
      request,
      {headers: this.headers, observe: "response"}
    )
  }

  public fetchProfile(): Observable<any> {
    return this._client.get(this.API_URL + "/user/profile", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public updateProfile(profile: ProfileUpdate): Observable<any> {
    return this._client.patch(this.API_URL + "/user/profile", profile, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public getAllUsers(): Observable<any> {
    return this._client.get(this.API_URL + "/user/all", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public deleteUserById(id: number): Observable<any> {
    return this._client.delete(this.API_URL + "/dashboard/users/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public updateUserFromDashboard(profile: ProfileUpdate): Observable<any> {
    console.log(profile)
    return this._client.patch(this.API_URL + "/dashboard/users", profile, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public getGroups(): Observable<any> {
    return this._client.get(this.API_URL + "/group", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public saveScenario(request: FormData): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/scenario",
      request,
      {
        headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
      }
    )
  }

  public saveScene(request: FormData): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/scene",
      request,
      {
        headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
      }
    )
  }

  public getScenariosPreview(): Observable<any> {
    return this._client.get(this.API_URL + "/scenario", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public getScenesPreview(): Observable<any> {
    return this._client.get(this.API_URL + "/scene", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public saveTask(task: TaskCreation): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/task",
      task,
      {
        headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
      }
    )
  }

  public getTasksPreview(id: number): Observable<any> {
    return this._client.get(this.API_URL + "/task/preview/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public getTaskFiles(request: TaskRequest): Observable<any> {
    return this._client.post<any>(this.API_URL + "/task/files", request, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public fetchGroupsWithTasks(): Observable<any> {
    return this._client.get(this.API_URL + "/group/with-tasks", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public fetchTaskNames(): Observable<any> {
    return this._client.get(this.API_URL + "/task/names", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public createGroup(group: GroupTasks): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/group",
      group,
      {
        headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
      }
    )
  }

  public updateGroupFromDashboard(group: GroupTasks): Observable<any> {
    return this._client.patch(this.API_URL + "/group", group, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public deleteGroupById(id: number): Observable<any> {
    return this._client.delete(this.API_URL + "/group/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public getFiringAttempts(id: number): Observable<any> {
    return this._client.get(this.API_URL + "/firing-attempt/session/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public getTaskSessionsInfo(id: number): Observable<any> {
    return this._client.get(this.API_URL + "/task-session/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public getTaskSessionsInfoByGroups(id: number): Observable<any> {
    return this._client.get(this.API_URL + "/task-session/group/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public finishTaskSession(request: TaskSessionFinishRequest): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/task-session/finish",
      request,
      {
        headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
      }
    )
  }
}
