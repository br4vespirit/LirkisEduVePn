import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy{

  constructor(private matDialogRef:MatDialogRef<ProfileSettingsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router){}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.matDialogRef.close();
  }

  closeDialog(){
    this.matDialogRef.close();
  }

  logout() {
    localStorage.removeItem("jwt-token");
    this.closeDialog();
    this.router.navigate(["/login"]).then(r => r);
  }
}
