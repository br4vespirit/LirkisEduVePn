export class TaskNames {

  id: number = 0;
  name: string = "";

  public constructor(init?: Partial<TaskNames>) {
    Object.assign(this, init);
  }
}
