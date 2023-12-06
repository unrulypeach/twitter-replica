import { createContext, useContext, useMemo, useState } from 'react';
import type ChildrenProps from '../types/childrenProps';
import { type UserCredential, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, storage } from '../configs/firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import type UserProps from '../types/userProps';

interface IAuthContext {
  currentUser?: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
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
  const [currentUser, setCurrentUser] = useState({});
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

  const values = useMemo(() => {
    return {
      currentUser,
      setCurrentUser,
      userProfile,
      setUserProfile,
      loginData,
      setLoginData,
      uploadUserPhoto,
      uploadBgPhoto,
      loginWithGooglePopup,
    };
  }, [currentUser, userProfile, loginData]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
