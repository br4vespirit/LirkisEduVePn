import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import {UtilsService} from "../../services/utils.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private API_URL: string = "http://localhost:80/api/v1/safa";

  constructor(private _router: Router, private _utils: UtilsService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(this.API_URL + "/login") ||
      request.url.includes(this.API_URL + "/register")) {
      return next.handle(request)
    }

    // TODO fix interceptor
    const reqWithToken = request.clone({setHeaders: {Authorization: this._utils.getToken()}})
    return next.handle(request);
  }
}
