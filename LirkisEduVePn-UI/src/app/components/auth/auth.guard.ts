import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UtilsService} from "../../services/utils.service";

/**
 * Guard to validate whether resource is available or not (user logged in or not) with JWT token
 * in a local storage
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Constructor for a guard
   * @param _router Router field to route between components
   * @param _utils Utils field that provides some help methods
   */
  constructor(private _router: Router, private _utils: UtilsService) {
  }

  /**
   * Override method that checks whether the component can be activated or not based on
   * JWT token inside local storage
   * @param route ActivatedRouteSnapshot instance
   * @param state RouterStateSnapshot instance
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    let isLogged: boolean = this._utils.isLoggedIn();

    if (isLogged && (state.url === '/login' || state.url === '/register')) {
      this._router.navigate(['/user/profile']).then(r => r);
      return false;
    }
    if (!isLogged && (state.url === '/login' || state.url === '/register'))
      return true;

    if (isLogged)
      return true;

    localStorage.setItem("redirect-url", state.url);
    this._router.navigate(['/login']).then(r => r);
    return false;
  }

}
