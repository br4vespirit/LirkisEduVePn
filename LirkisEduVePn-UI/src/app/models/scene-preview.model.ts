export class ScenePreview {
  id: number = 0;
  name: string = "";
  description: string = "";
  photo: string = "";
  folderName: string = "";

  public constructor(init?: Partial<ScenePreview>) {
    Object.assign(this, init);
  }
}