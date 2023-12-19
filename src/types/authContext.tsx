import type UserProps from './userProps';
import type { UserCredential } from 'firebase/auth';

export default interface IAuthContext {
  userProfile?: UserProps;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProps | undefined>>;
  loginData?: string;
  setLoginData: React.Dispatch<React.SetStateAction<string>>;

  loginWithGooglePopup: () => Promise<UserCredential>;

  uploadUserPhoto: (file: File) => Promise<string | undefined>;
  uploadBgPhoto: (file: File) => Promise<string | undefined>;
}
