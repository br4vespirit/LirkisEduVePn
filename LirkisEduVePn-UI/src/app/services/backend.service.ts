import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegistrationRequest} from "../models/registration-request.model";
import {Observable} from "rxjs";
import {LoginRequest} from "../models/login-request.model";
import {ProfileUpdate} from "../models/profile-update.model";
import {TaskCreation} from "../models/task-creation.model";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private API_URL: string = "http://localhost:8080/api/v1";

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
      responseType: "json"
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

  public getTasksPreview(): Observable<any> {
    return this._client.get(this.API_URL + "/task/preview", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  public getTaskFiles(id: number): Observable<any> {
    return this._client.get(this.API_URL + "/task/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }
}
