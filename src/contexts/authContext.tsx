import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type ChildrenProps from '../types/childrenProps';
import { type UserCredential, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, storage } from '../configs/firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import type UserProps from '../types/userProps';
import useRefreshToken from '../hooks/useRefreshToken';
import { handleAxiosError } from '../scripts/errorHandling';
import { jwtDecode } from 'jwt-decode';
import { currTimeUnix } from '../scripts/utils';

interface IAuthContext {
  userProfile?: UserProps;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProps>>;
  loginData?: string;
  setLoginData: React.Dispatch<React.SetStateAction<string>>;

  loginWithGooglePopup: () => Promise<UserCredential>;

  uploadUserPhoto: (file: File) => Promise<string | undefined>;
  uploadBgPhoto: (file: File) => Promise<string | undefined>;
}

const AuthContext = createContext({});

export function useAuthContext(): IAuthContext {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProps>();
  const [loginData, setLoginData] = useState<string>('');

  // uploads photo to cloud storage
  async function uploadUserPhoto(file: File): Promise<string | undefined> {
    const { currentUser } = auth;
    if (currentUser)
      try {
        const userUid = currentUser.uid ?? '';
        const filePath = `${userUid}/${file.name}`;
        const newImageRef = ref(storage, filePath);
        await uploadBytesResumable(newImageRef, file);

        const publicImageUrl = await getDownloadURL(newImageRef);
        /* await updateDoc(doc(db, 'user-profiles', userUid), {
          profile_pic: publicImageUrl,
        }); */

        return publicImageUrl;
      } catch (error) {
        console.error('error uploading to cloud storage', error);
      }
  }

  async function uploadBgPhoto(file: File): Promise<string | undefined> {
    const { currentUser } = auth;
    if (currentUser)
      try {
        const filePath = `${currentUser.uid}/${file.name}`;
        const newImageRef = ref(storage, filePath);
        await uploadBytesResumable(newImageRef, file);

        const publicImageUrl = await getDownloadURL(newImageRef);
        /* await updateDoc(doc(db, 'user-profiles', userProfile?.userhandle), {
          header_pic: publicImageUrl,
        }); */

        return publicImageUrl;
      } catch (error) {
        console.error('error uploading to cloud storage:', error);
      }
  }

  async function loginWithGooglePopup() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  }

  // check local storage for 'token' and try to log in
  useEffect(() => {
    const access_token = localStorage.getItem('token');
    const decodedToken = jwtDecode(access_token);

    // check if access token expired
    if (decodedToken.iat > currTimeUnix()) {
      setUserProfile(decodedToken.user);
    } else {
      const refresh = useRefreshToken();
      try {
        refresh().then((token) => {});
      } catch (err) {
        handleAxiosError(err);
      }
    }
  }, []);

  const values = useMemo(() => {
    return {
      userProfile,
      setUserProfile,
      loginData,
      setLoginData,
      uploadUserPhoto,
      uploadBgPhoto,
      loginWithGooglePopup,
    };
  }, [userProfile, loginData]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
