import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {ScenarioPreview} from "../../models/scenario-preview.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-preview-scenarios',
  templateUrl: './preview-scenarios.component.html',
  styleUrls: ['./preview-scenarios.component.css']
})
export class PreviewScenariosComponent implements OnInit, OnDestroy {

  // @ts-ignore
  scenario: ScenarioPreview;

  current_photo_index = 0;
  current_photo: string = "";

  constructor(private matDialogRef: MatDialogRef<PreviewScenariosComponent>,
              private _client: BackendService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

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

  prev_photo() {
    if (this.current_photo_index > 0) {
      this.current_photo_index--;
    } else {
      this.current_photo_index = this.scenario.photos.length - 1;
    }
    this.current_photo = this.scenario.photos[this.current_photo_index];
  }

  next_photo() {
    if (this.current_photo_index < this.scenario.photos.length - 1) {
      this.current_photo_index++;
    } else {
      this.current_photo_index = 0;
    }
    this.current_photo = this.scenario.photos[this.current_photo_index];
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
