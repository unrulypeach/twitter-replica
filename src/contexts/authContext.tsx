import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type ChildrenProps from '../types/childrenProps';
import { type UserCredential, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, storage } from '../configs/firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import type UserProps from '../types/userProps';
import useRefreshToken from '../hooks/useRefreshToken';
import { handleAxiosError } from '../scripts/errorHandling';
import { jwtDecode } from 'jwt-decode';
import useAxiosPrivate from '../hooks/useAxiosInterceptors';
import { currTime } from '../scripts/utils';

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
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

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

  // persist login
  // check local storage for 'token' and try to log in
  useEffect(() => {
    const access_token = localStorage.getItem('token');
    const validate = () => {
      axiosPrivate
        .get('/validate')
        .then((res) => {
          const user = res.data;
          setUserProfile(() => {
            return user;
          });
        })
        .catch((error) => {
          handleAxiosError(error);
        });
    };
    const refreshIt = () => {
      refresh()
        .then((user) => {
          console.log('refreshed');
          setUserProfile(user);
        })
        .catch((err) => {
          console.error(err);
          handleAxiosError(err);
        });
    };

    if (access_token) {
      const decodedToken = jwtDecode(access_token);
      if (decodedToken.exp > currTime()) {
        validate();
      } else {
        refreshIt();
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
