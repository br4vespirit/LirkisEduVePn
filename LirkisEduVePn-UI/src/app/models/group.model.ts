export class Group {
  id: number = 0;
  name: string = "";

  constructor(init?: Partial<Group>) {
    Object.assign(this, init);
  }
}
