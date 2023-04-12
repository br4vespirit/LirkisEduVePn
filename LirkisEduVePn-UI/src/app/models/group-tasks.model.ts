import {Group} from "./group.model";
import {TaskNames} from "./task-names.model";

export class GroupTasks extends Group {
  tasks: TaskNames[] = [];

  public constructor(init?: Partial<GroupTasks>) {
    // @ts-ignore
    super({
      id: init?.id,
      name: init?.name
    });
    Object.assign(this, init);
  }
}
