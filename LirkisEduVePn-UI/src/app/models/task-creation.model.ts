export class TaskCreation {
  name: string = ""
  description: string = "";
  scenarioId: number = 0;
  sceneId: number = 0;

  public constructor(init?: Partial<TaskCreation>) {
    Object.assign(this, init);
  }
}
