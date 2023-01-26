import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UtilsService} from "../../services/utils.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _utils: UtilsService) {
  }

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
