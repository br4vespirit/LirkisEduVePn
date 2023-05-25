import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

/**
 * Component that is used as a form for creating scenarios
 */
@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit, OnDestroy {

  /**
   * Subscription for creation of scenario
   */
  scenario_creation_subscription: Subscription = new Subscription();

  /**
   * Represents a collection of form controls that are logically grouped together. It provides a convenient way to manage and validate multiple form controls as a single unit.
   */
  // @ts-ignore
  form: FormGroup;

  /**
   * Constructor for a component
   * @param matDialogRef Angular Material component that uses for opening dialogs
   * @param _client BackendService instance that sends requests to a server
   * @param _snackBar Angular Material component that uses for opening snack bars
   */
  constructor(private matDialogRef: MatDialogRef<CreateQuizComponent>, private _client: BackendService,
              private _snackBar: MatSnackBar) {
  }

  /**
   * Gets a name field from a form group
   */
  get name() {
    return this.form.controls['name'];
  }

  /**
   * Gets a description field from a form group
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
   * Method that inits a form group for creating a scenario with name, description and a zip file
   */
  ngOnInit(): void {
    this.form = new FormGroup<any>({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.scenario_creation_subscription.unsubscribe();
  }

  /**
   * While this component is a dialog, this method closes this component
   */
  closeDialog() {
    this.matDialogRef.close();
  }

  /**
   * When user chooses the file in the form, this method updates the form with the chosen file
   * @param event event that contains a file that was chosen
   */
  onFileSelected(event: any) {
    this.form.patchValue({
      file: event.target.files[0]
    })
  }

  /**
   * Submits the form with the scenario to create
   */
  send() {
    const formData = new FormData();
    formData.append("name", this.name.value);
    formData.append("description", this.description.value);
    formData.append('file', this.file.value, this.file.value.name);
    this.scenario_creation_subscription = this._client.saveScenario(formData).subscribe({
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
    this._snackBar.open("Scenario was successfully sent to a server", '', {
      duration: 5000,
    });
  }
}
