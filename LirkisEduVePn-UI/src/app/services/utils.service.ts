import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';

/**
 * Service containing some help methods
 */
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

  /**
   * Method to save a token to a local storage
   * @param token JWT token
   */
  public saveToken(token: string) {
    localStorage.setItem("jwt-token", token);
  }

  /**
   * Method to logout
   */
  public logOut() {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("user-profile");
    localStorage.removeItem("sessionID");
  }

  /**
   * Method to validate whether user is logged in
   */
  public isLoggedIn(): boolean {
    let token = this.getToken();
    if (token === null || this.tokenExpired(token)) {
      this.logOut();
      return false;
    }
    return true;
  }

  /**
   * Method to retrieve a token from a local storage
   */
  public getToken(): any {
    return localStorage.getItem("jwt-token");
  }

  /**
   * Method to retrieve a decoded JWT token
   * @param token token to decode
   */
  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  /**
   * Method to validate whether the JWT token is already expired
   * @param token JWT token
   */
  private tokenExpired(token: string): boolean {
    if (token === null)
      return true;
    let tokenInfo = this.getDecodedAccessToken(token);
    console.log(tokenInfo.exp - new Date().getTime() / 1000);
    return tokenInfo.exp - new Date().getTime() / 1000 < 0;
  }

}
