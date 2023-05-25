import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendService} from "../../services/backend.service";
import {ScenePreview} from "../../models/scene-preview.model";

/**
 * Component that is used as a dialog to preview a scene
 */
@Component({
  selector: 'app-preview-scene',
  templateUrl: './preview-scene.component.html',
  styleUrls: ['./preview-scene.component.css']
})
export class PreviewSceneComponent implements OnInit, OnDestroy {

  /**
   * Scene to preview
   */
  // @ts-ignore
  scene: ScenePreview;

  /**
   * Constructor for a component
   * @param matDialogRef Angular Material component that uses for opening dialogs
   * @param _client BackendService instance that sends requests to a server
   * @param data data that was transfer to this component
   */
  constructor(private matDialogRef: MatDialogRef<PreviewSceneComponent>,
              private _client: BackendService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  /**
   * Method to get a scene and convert a scene photo to a needed format
   */
  ngOnInit(): void {
    this.scene = this.data as ScenePreview;
    this.scene.photo = `data:image/png;base64,${this.scene.photo}`
  }

  ngOnDestroy(): void {

  }

  /**
   * While this component is a dialog, this method closes this component
   */
  closeDialog() {
    this.matDialogRef.close();
  }
}
