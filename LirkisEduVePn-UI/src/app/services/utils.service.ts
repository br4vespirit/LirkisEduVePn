import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

  public saveToken(token: string) {
    localStorage.setItem("jwt-token", token);
  }

  public logOut() {
    localStorage.removeItem("jwt-token");
  }

  public isLoggedIn(): boolean {
    let token = this.getToken();
    if (token === null || this.tokenExpired(token)) {
      this.logOut();
      return false;
    }
    return true;
  }

  public getToken(): any {
    return localStorage.getItem("jwt-token");
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  private tokenExpired(token: string): boolean {
    if (token === null)
      return true;
    let tokenInfo = this.getDecodedAccessToken(token);
    // console.log(tokenInfo.exp - new Date().getTime() / 1000);
    return tokenInfo.exp - new Date().getTime() / 1000 < 0;
  }

}
