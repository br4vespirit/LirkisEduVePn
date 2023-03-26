import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-scene',
  templateUrl: './create-scene.component.html',
  styleUrls: ['./create-scene.component.css']
})
export class CreateSceneComponent {

  scene_creation_subscription: Subscription = new Subscription();

  // @ts-ignore
  form: FormGroup;

  constructor(private matDialogRef: MatDialogRef<CreateSceneComponent>, private _client: BackendService,
              private _snackBar: MatSnackBar) {
  }

  get name() {
    return this.form.controls['name'];
  }

  get description() {
    return this.form.controls['description'];
  }

  get file() {
    return this.form.controls['file'];
  }

  get folder() {
    return this.form.controls['folder']
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      folder: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.scene_creation_subscription.unsubscribe();
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  onFileSelected(event: any) {
    this.form.patchValue({
      file: event.target.files[0]
    })
  }

  send() {
    const formData = new FormData();
    formData.append("name", this.name.value);
    formData.append("description", this.description.value);
    formData.append("folder", this.folder.value)
    formData.append('file', this.file.value, this.file.value.name);
    this.scene_creation_subscription = this._client.saveScene(formData).subscribe({
      next: () => {
        this.openSuccessfulSnackbar();
      },
      error: (response) => {
        if (response.status === 400) {
          this.openUnsuccessfulSnackbar(response.error);
        } else {
          this.openUnsuccessfulSnackbar("An unexpected error occurred");
        }
      }
    });
  }

  openUnsuccessfulSnackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
    });
  }

  openSuccessfulSnackbar() {
    this._snackBar.open("Scene was successfully sent to a server", '', {
      duration: 5000,
    });
  }
}
