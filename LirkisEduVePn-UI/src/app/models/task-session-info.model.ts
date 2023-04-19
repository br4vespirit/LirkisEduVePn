export class TaskSessionInfo {
  id: number = 0;
  taskName: string = "";

  // @ts-ignore
  finishedAt: Date;

  // @ts-ignore
  startedAt: Date;

  // @ts-ignore
  successful: boolean;

  public constructor(init?: Partial<TaskSessionInfo>) {
    Object.assign(this, init);
  }
}
