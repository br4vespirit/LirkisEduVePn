export class RegistrationRequest {
  nickname: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;

  constructor(nickname: string, email: string, password: string, firstname: string, lastname: string) {
    this.nickname = nickname;
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
