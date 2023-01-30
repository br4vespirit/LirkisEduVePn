import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private loginStatusSource = new Subject<boolean>();
  loginStatus$ = this.loginStatusSource.asObservable();

  constructor() {
  }

  public changeStatus(isLogged: boolean) {
    this.loginStatusSource.next(isLogged);
  }
}
