export interface IRegisterInputs {
  fullname: string;
  email: string;
  password: string;
  profile_img?: string;
  google_auth?: boolean;
  username?: string;
}

export interface ILoginInputs {
  email: string;
  password: string;
}
