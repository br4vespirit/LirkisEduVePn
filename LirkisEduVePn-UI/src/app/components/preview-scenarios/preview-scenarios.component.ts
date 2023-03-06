import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {ScenarioPreview} from "../../models/scenario-preview.model";

@Component({
  selector: 'app-preview-scenarios',
  templateUrl: './preview-scenarios.component.html',
  styleUrls: ['./preview-scenarios.component.css']
})
export class PreviewScenariosComponent implements OnInit, OnDestroy {

  scenarios: ScenarioPreview[] = [];

  scenarios_preview_subscription: Subscription = new Subscription();

  current_index = 0;
  // @ts-ignore
  current_scenario: ScenarioPreview;

  current_photo_index = 0;
  current_photo: string = "";

  constructor(private _client: BackendService) {
  }

  ngOnInit(): void {
    this.scenarios_preview_subscription = this._client.getPreviewProfiles().subscribe(data => {
      this.scenarios = data as ScenarioPreview[];
      for (const element of this.scenarios) {
        for (let j = 0; j < element.photos.length; j++) {
          let base64_photo = element.photos[j]
          element.photos[j] = `data:image/png;base64,${base64_photo}`
        }
      }
      this.current_scenario = this.scenarios[this.current_index];
      this.current_photo = this.current_scenario.photos[this.current_photo_index];
    })
  }

  ngOnDestroy(): void {
    this.scenarios_preview_subscription.unsubscribe();
  }

  next_scenario() {
    if (this.current_index !== this.scenarios.length - 1) {
      this.current_index++;
      this.current_scenario = this.scenarios[this.current_index];
      this.reload_scenario_photo();
    }
  }

  prev_scenario() {
    if (this.current_index !== 0) {
      this.current_index--;
      this.current_scenario = this.scenarios[this.current_index];
      this.reload_scenario_photo();
    }
  }

  change_scenario_photo() {
    if (this.current_photo_index < this.current_scenario.photos.length - 1) {
      this.current_photo_index++;
    } else {
      this.current_photo_index = 0;
    }
    this.current_photo = this.current_scenario.photos[this.current_photo_index];
  }

  reload_scenario_photo() {
    this.current_photo_index = 0;
    this.current_photo = this.current_scenario.photos[this.current_photo_index];
  }
}
