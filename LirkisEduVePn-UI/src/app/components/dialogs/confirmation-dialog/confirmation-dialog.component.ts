import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  templateUrl: 'confirmation.dialog.component.html'
})
export class ConfirmationDialog {
  message = "Are you sure you want to delete?";
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ConfirmationDialog>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText || this.confirmButtonText;
        this.cancelButtonText = data.buttonText || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
