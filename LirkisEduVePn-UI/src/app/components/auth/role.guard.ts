import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {UserProfile} from "../../models/user-profile.model";

/**
 * Guard to validate whether resource is available or not with user role
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  /**
   * Constructor for a guard
   * @param router Router field to route between components
   */
  constructor(private router: Router) {
  }

  /**
   * Override method that checks whether the component can be activated or not based on
   * user role
   * @param route ActivatedRouteSnapshot instance
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'];
    const profile_json = localStorage.getItem('user-profile');
    if (profile_json === null) {
      return false;
    }
    const userProfile = JSON.parse(profile_json) as UserProfile;

    if (!expectedRoles.includes(userProfile.role)) {
      this.router.navigate(['/home']).then(r => r);
      return false;
    }

    return true;
  }
}
