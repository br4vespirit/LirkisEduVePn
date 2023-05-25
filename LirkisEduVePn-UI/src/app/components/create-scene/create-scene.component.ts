import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";

/**
 * Component that is used as a form for defining scenes in a system
 */
@Component({
  selector: 'app-create-scene',
  templateUrl: './create-scene.component.html',
  styleUrls: ['./create-scene.component.css']
})
export class CreateSceneComponent {

  /**
   * Subscription for defining a scene
   */
  scene_creation_subscription: Subscription = new Subscription();

  /**
   * Represents a collection of form controls that are logically grouped together. It provides a convenient way to manage and validate multiple form controls as a single unit.
   */
  // @ts-ignore
  form: FormGroup;

  /**
   * Constructor for a component
   * @param matDialogRef Angular Material component that defines that this component is dialog
   * @param _client BackendService instance that sends requests to a server
   * @param _snackBar Angular Material component that uses for opening snack bars
   */
  constructor(private matDialogRef: MatDialogRef<CreateSceneComponent>, private _client: BackendService,
              private _snackBar: MatSnackBar) {
  }

  /**
   * Gets a name field from a form group
   */
  get name() {
    return this.form.controls['name'];
  }

  /**
   * Gets a name description from a form group
   */
  get description() {
    return this.form.controls['description'];
  }

  /**
   * Gets a file field from a form group
   */
  get file() {
    return this.form.controls['file'];
  }

  /**
   * Gets a folder name from a form group
   */
  get folder() {
    return this.form.controls['folder']
  }

  /**
   * Method that inits a form group for creating a scene with name, description, photo file and folder name
   */
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

  /**
   * While this component is a dialog, this method closes this component
   */
  closeDialog() {
    this.matDialogRef.close();
  }

  /**
   * When user chooses the file in the form, this method updates the form with the chosen file
   * @param event event when photo was chosen
   */
  onFileSelected(event: any) {
    this.form.patchValue({
      file: event.target.files[0]
    })
  }

  /**
   * Submits the form with the scene to define in system
   */
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

  /**
   * Opens successful snack bar with a provided message
   * @param message message to show
   */
  openUnsuccessfulSnackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
    });
  }

  /**
   * Opens unsuccessful snack bar
   */
  openSuccessfulSnackbar() {
    this._snackBar.open("Scene was successfully sent to a server", '', {
      duration: 5000,
    });
  }
}
