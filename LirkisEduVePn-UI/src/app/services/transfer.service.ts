import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {UserProfile} from "../models/user-profile.model";
import {GroupTasks} from "../models/group-tasks.model";

/**
 * Service to preform transfer data between components
 */
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

  private createdGroupStatusSource = new Subject<GroupTasks>();
  createdGroupStatus$ = this.createdGroupStatusSource.asObservable();

  private updatedGroupStatusSource = new Subject<GroupTasks>();
  updatedGroupStatus$ = this.updatedGroupStatusSource.asObservable();

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

  public changeCreatedGroup(group: GroupTasks) {
    this.createdGroupStatusSource.next(group);
  }

  public changeUpdatedGroup(group: GroupTasks) {
    this.updatedGroupStatusSource.next(group);
  }
}
