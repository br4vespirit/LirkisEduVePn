import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {TransferService} from "../../services/transfer.service";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {

  constructor(private matDialogRef: MatDialogRef<ProfileSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
              private _transfer: TransferService) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.matDialogRef.close();
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  logout() {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("user-profile");
    this._transfer.changeStatus(false);
    this.closeDialog();
    this.router.navigate(["/login"]).then(r => r);
  }
}
