import {UserProfile} from "./user-profile.model";

export class ProfileUpdate extends UserProfile {
  currentPassword: string = "";
  newPassword: string = "";
  repeatNewPassword: string = ""

  public constructor(init?: Partial<ProfileUpdate>) {
    super(init);
    Object.assign(this, init);
  }
}
