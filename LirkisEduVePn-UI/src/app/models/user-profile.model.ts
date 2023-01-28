export class UserProfile {
  nickname: string;
  email: string;
  role: string;
  firstname: string;
  lastname: string;

  constructor(nickname: string, email: string, role: string, firstname: string, lastname: string) {
    this.nickname = nickname;
    this.email = email;
    this.role = role;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
