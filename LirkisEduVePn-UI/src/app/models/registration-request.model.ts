export class RegistrationRequest {
  nickname: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
    groups: number[];

    constructor(nickname: string, email: string, password: string, firstname: string, lastname: string, groupsId: number[]) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.groups = groupsId;
    }
}
