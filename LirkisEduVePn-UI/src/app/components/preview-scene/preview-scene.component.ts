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

  constructor(private matDialogRef: MatDialogRef<PreviewSceneComponent>,
              private _client: BackendService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.scene = this.data as ScenePreview;
    this.scene.photo = `data:image/png;base64,${this.scene.photo}`
  }

  ngOnDestroy(): void {

  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
