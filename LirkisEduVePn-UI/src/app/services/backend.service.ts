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

/**
 * Service to perform HTTP request to a backend
 */
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  /**
   * API URL of a backend
   */
    // private API_URL: string = "http://localhost:8080/api/v1";
  private API_URL: string = "http://147.232.205.222:8080/api/v1";

  /**
   * Default http headers
   */
  private headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  })

  /**
   * Constructor for a service
   * @param _client HttpClient instance
   */
  constructor(private _client: HttpClient) {
  }

  /**
   * Method to perform registration
   * @param request registration request
   */
  public register(request: RegistrationRequest): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/auth/registration",
      request,
      {headers: this.headers}
    )
  }

  /**
   * Method to perform signing in
   * @param request login request
   */
  public login(request: LoginRequest): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/auth/authenticate",
      request,
      {headers: this.headers, observe: "response"}
    )
  }

  /**
   * Method to fetch user's profile
   */
  public fetchProfile(): Observable<any> {
    return this._client.get(this.API_URL + "/user/profile", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to update user's profile by himself
   * @param profile profile with updated data to update user
   */
  public updateProfile(profile: ProfileUpdate): Observable<any> {
    return this._client.patch(this.API_URL + "/user/profile", profile, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to fetch all users
   */
  public getAllUsers(): Observable<any> {
    return this._client.get(this.API_URL + "/user/all", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to delete a user by user id
   * @param id id of a user to delete
   */
  public deleteUserById(id: number): Observable<any> {
    return this._client.delete(this.API_URL + "/dashboard/users/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to update user from a dashboard by teacher or admin
   * @param profile profile with updated data to update user
   */
  public updateUserFromDashboard(profile: ProfileUpdate): Observable<any> {
    console.log(profile)
    return this._client.patch(this.API_URL + "/dashboard/users", profile, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to fetch all groups
   */
  public getGroups(): Observable<any> {
    return this._client.get(this.API_URL + "/group", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to save a scenario to a database
   * @param request scenario to save
   */
  public saveScenario(request: FormData): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/scenario",
      request,
      {
        headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
      }
    )
  }

  /**
   * Method to save a scene to a database
   * @param request scene to save
   */
  public saveScene(request: FormData): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/scene",
      request,
      {
        headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
      }
    )
  }

  /**
   * Method to fetch all scenarios for a preview
   */
  public getScenariosPreview(): Observable<any> {
    return this._client.get(this.API_URL + "/scenario", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to fetch all scenes for a preview
   */
  public getScenesPreview(): Observable<any> {
    return this._client.get(this.API_URL + "/scene", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to save a task to a database
   * @param task task to save
   */
  public saveTask(task: TaskCreation): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/task",
      task,
      {
        headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
      }
    )
  }

  /**
   * Method to fetch task data for a preview
   * @param id if of a task
   */
  public getTasksPreview(id: number): Observable<any> {
    return this._client.get(this.API_URL + "/task/preview/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to get a task files of a chosen task
   * @param request information about task
   */
  public getTaskFiles(request: TaskRequest): Observable<any> {
    return this._client.post<any>(this.API_URL + "/task/files", request, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to fetch all groups where each containes information about tasks
   */
  public fetchGroupsWithTasks(): Observable<any> {
    return this._client.get(this.API_URL + "/group/with-tasks", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to fetch task names
   */
  public fetchTaskNames(): Observable<any> {
    return this._client.get(this.API_URL + "/task/names", {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to create a group
   * @param group group to create
   */
  public createGroup(group: GroupTasks): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/group",
      group,
      {
        headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
      }
    )
  }

  /**
   * Method to update group from a dashboard
   * @param group group to update
   */
  public updateGroupFromDashboard(group: GroupTasks): Observable<any> {
    return this._client.patch(this.API_URL + "/group", group, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to delete group by id
   * @param id id of a group to delete
   */
  public deleteGroupById(id: number): Observable<any> {
    return this._client.delete(this.API_URL + "/group/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to fetch firing attempts by task session id
   * @param id id of a task session
   */
  public getFiringAttempts(id: number): Observable<any> {
    return this._client.get(this.API_URL + "/firing-attempt/session/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to fetch task session information
   * @param id id of a task session
   */
  public getTaskSessionsInfo(id: number): Observable<any> {
    return this._client.get(this.API_URL + "/task-session/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   * Method to fetch task sessions by group
   * @param id id of a group
   */
  public getTaskSessionsInfoByGroups(id: number): Observable<any> {
    return this._client.get(this.API_URL + "/task-session/group/" + id, {
      responseType: "json",
      headers: {Authorization: "Bearer " + localStorage.getItem("jwt-token")}
    })
  }

  /**
   *Method to finish a task session
   * @param request request containing information about task session to finish
   */
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
