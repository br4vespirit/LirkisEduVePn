import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {UserProfile} from "../models/user-profile.model";

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private loginStatusSource = new Subject<boolean>();
  loginStatus$ = this.loginStatusSource.asObservable();

  private profileStatusSource = new Subject<UserProfile>();
  profileStatus$ = this.profileStatusSource.asObservable();

  private roleStatusSource = new Subject<string>();
  roleStatus$ = this.roleStatusSource.asObservable();

  private updatedUserStatusSource = new Subject<UserProfile>();
  updatedUserStatus$ = this.updatedUserStatusSource.asObservable();

  constructor() {
  }

  public changeStatus(isLogged: boolean) {
    this.loginStatusSource.next(isLogged);
  }

  public changeProfile(profile: UserProfile) {
    this.profileStatusSource.next(profile);
  }

  public changeRole(role: string) {
    this.roleStatusSource.next(role);
  }

  public changeUpdatedUser(user: UserProfile) {
    this.updatedUserStatusSource.next(user);
  }
}
