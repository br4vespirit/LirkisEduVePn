import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {ScenarioPreview} from "../../models/scenario-preview.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

/**
 * Component that is used as a dialog to preview a scenario
 */
@Component({
  selector: 'app-preview-scenarios',
  templateUrl: './preview-scenarios.component.html',
  styleUrls: ['./preview-scenarios.component.css']
})
export class PreviewScenariosComponent implements OnInit, OnDestroy {

  /**
   * Scenario to preview
   */
  // @ts-ignore
  scenario: ScenarioPreview;

  /**
   * Current photo of a scenario
   */
  current_photo_index = 0;

  /**
   * Base64 of a current photo
   */
  current_photo: string = "";

  /**
   * Constructor for a component
   * @param matDialogRef Angular Material component that uses for opening dialogs
   * @param _client BackendService instance that sends requests to a server
   * @param data data that was transfer to this component
   */
  constructor(private matDialogRef: MatDialogRef<PreviewScenariosComponent>,
              private _client: BackendService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  /**
   * Method to get a scenario and convert each photo to a needed format and set a current photo
   */
  ngOnInit(): void {
    this.scenario = this.data as ScenarioPreview;
    for (let j = 0; j < this.scenario.photos.length; j++) {
      let base64_photo = this.scenario.photos[j]
      this.scenario.photos[j] = `data:image/png;base64,${base64_photo}`
    }
    this.current_photo = this.scenario.photos[this.current_photo_index];
  }

  ngOnDestroy(): void {

  }

  /**
   * Move to a previous photo
   */
  prev_photo() {
    if (this.current_photo_index > 0) {
      this.current_photo_index--;
    } else {
      this.current_photo_index = this.scenario.photos.length - 1;
    }
    this.current_photo = this.scenario.photos[this.current_photo_index];
  }

  /**
   * Move to a next photo
   */
  next_photo() {
    if (this.current_photo_index < this.scenario.photos.length - 1) {
      this.current_photo_index++;
    } else {
      this.current_photo_index = 0;
    }
    this.current_photo = this.scenario.photos[this.current_photo_index];
  }

  /**
   * While this component is a dialog, this method closes this component
   */
  closeDialog() {
    this.matDialogRef.close();
  }
}
