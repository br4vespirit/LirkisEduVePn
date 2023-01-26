import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegistrationRequest} from "../models/registration-request.model";
import {Observable} from "rxjs";
import { LoginRequest } from '../models/login-request.model';

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

  public registerUser(request: RegistrationRequest): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/auth/registration",
      request,
      {headers: this.headers}
    )
  }

  public loginUser(request: LoginRequest): Observable<any> {
    return this._client.post<any>(
      this.API_URL + "/auth/authenticate",
      request,
      {headers: this.headers}
    )
  }

}
