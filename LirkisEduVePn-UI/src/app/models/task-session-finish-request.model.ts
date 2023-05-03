export class TaskSessionFinishRequest {
  taskSessionId: number = 0;
  successful: boolean = false;
  // @ts-ignore
  finishTime: Date;

  public constructor(init?: Partial<TaskSessionFinishRequest>) {
    Object.assign(this, init);
  }
}
