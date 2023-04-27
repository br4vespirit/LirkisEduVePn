export class TaskRequest {
  taskId: number = 0;
  language: string = "";

  public constructor(init?: Partial<TaskRequest>) {
    Object.assign(this, init);
  }
}
