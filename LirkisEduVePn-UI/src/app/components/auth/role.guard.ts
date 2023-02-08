import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {UserProfile} from "../../models/user-profile.model";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const profile_json = localStorage.getItem('user-profile')
    if (profile_json === null)
      return false;
    const userProfile = JSON.parse(profile_json) as UserProfile;

    if (userProfile.role !== expectedRole) {
      this.router.navigate(['/home']).then(r => r);
      return false;
    }
    return true;
  }
}
