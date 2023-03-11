export class ScenePreview {
  id: number = 0;
  name: string = "";
  description: string = "";
  photos: string[] = [];

  public constructor(init?: Partial<ScenePreview>) {
    Object.assign(this, init);
  }
}
