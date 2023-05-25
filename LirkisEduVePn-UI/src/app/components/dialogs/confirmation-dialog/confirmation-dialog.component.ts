import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

/**
 * Component that defines a confirmation dialog component to accept or decline some actions
 */
@Component({
  templateUrl: 'confirmation.dialog.component.html'
})
export class ConfirmationDialog {
  message = "Are you sure you want to delete?";
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";

  /**
   * Constructor for a component
   * @param data data that was transfer to this component
   * @param dialogRef Angular Material component that defines that this component is dialog
   */
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ConfirmationDialog>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText || this.confirmButtonText;
        this.cancelButtonText = data.buttonText || this.cancelButtonText;
      }
    }
  }

  /**
   * Closes dialog on confirm
   */
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
