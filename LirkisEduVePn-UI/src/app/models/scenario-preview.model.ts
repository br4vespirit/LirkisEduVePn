export class ScenarioPreview {
  id: number = 0;
  name: string = "";
  description: string = "";
  languages: string[] = [];
  photos: string[] = [];

  public constructor(init?: Partial<ScenarioPreview>) {
    Object.assign(this, init);
  }
}
