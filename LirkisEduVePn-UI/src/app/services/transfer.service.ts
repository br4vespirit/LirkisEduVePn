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

  constructor() {
  }

  public changeStatus(isLogged: boolean) {
    this.loginStatusSource.next(isLogged);
  }

  public changeProfile(profile: UserProfile) {
    this.profileStatusSource.next(profile);
  }
}
