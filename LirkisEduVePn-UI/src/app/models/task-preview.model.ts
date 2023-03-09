import {ScenarioPreview} from "./scenario-preview.model";
import {ScenePreview} from "./scene-preview.model";

export class TaskPreview {
  id: number = 0;
  name: string = ""
  description: string = "";
  // @ts-ignore
  scenario: ScenarioPreview;
  // @ts-ignore
  scene: ScenePreview;

  public constructor(init?: Partial<TaskPreview>) {
    Object.assign(this, init);
  }
}
