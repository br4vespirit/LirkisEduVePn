import {Group} from "./group.model";

export class UserProfile {
  id: number = 0;
  nickname: string = "";
  email: string = "";
  role: string = "";
  firstname: string = "";
  lastname: string = "";
  groups: Group[] = [];

  public constructor(init?: Partial<UserProfile>) {
    Object.assign(this, init);
  }
}
