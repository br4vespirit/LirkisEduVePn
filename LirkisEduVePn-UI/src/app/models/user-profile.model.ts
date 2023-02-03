export class UserProfile {
  id: number = 0;
  nickname: string = "";
  email: string = "";
  role: string = "";
  firstname: string = "";
  lastname: string = "";

  public constructor(init?: Partial<UserProfile>) {
    Object.assign(this, init);
  }
}
