import type UserProps from './userProps';

export default interface IAuthContext {
  userProfile?: UserProps;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProps | undefined>>;
  loginData?: string;
  setLoginData: React.Dispatch<React.SetStateAction<string>>;

  uploadUserPhoto: (file: File) => Promise<string | undefined>;
  uploadBgPhoto: (file: File) => Promise<string | undefined>;
}
