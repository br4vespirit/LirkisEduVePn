import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendService} from "../../services/backend.service";
import {ScenePreview} from "../../models/scene-preview.model";

@Component({
  selector: 'app-preview-scene',
  templateUrl: './preview-scene.component.html',
  styleUrls: ['./preview-scene.component.css']
})
export class PreviewSceneComponent implements OnInit, OnDestroy {

  // @ts-ignore
  scene: ScenePreview;

  current_photo_index = 0;
  current_photo: string = "";

  constructor(private matDialogRef: MatDialogRef<PreviewSceneComponent>,
              private _client: BackendService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.scene = this.data as ScenePreview;
    for (let j = 0; j < this.scene.photos.length; j++) {
      let base64_photo = this.scene.photos[j]
      this.scene.photos[j] = `data:image/png;base64,${base64_photo}`
    }
    this.current_photo = this.scene.photos[this.current_photo_index];
  }

  ngOnDestroy(): void {

  }

  prev_photo() {
    if (this.current_photo_index > 0) {
      this.current_photo_index--;
    } else {
      this.current_photo_index = this.scene.photos.length - 1;
    }
    this.current_photo = this.scene.photos[this.current_photo_index];
  }

  next_photo() {
    if (this.current_photo_index < this.scene.photos.length - 1) {
      this.current_photo_index++;
    } else {
      this.current_photo_index = 0;
    }
    this.current_photo = this.scene.photos[this.current_photo_index];
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
