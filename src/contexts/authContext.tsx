import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import uniqid from 'uniqid';
import type ChildrenProps from '../types/childrenProps';
import {
  type UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, storage, db } from '../configs/firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc, updateDoc, type DocumentData, collection, query, where, getDocs } from 'firebase/firestore';
import type ProfileProps from '../types/profileProps';
interface IAuthContext {
  currentUser?: any;
  userProfile?: ProfileProps;
  setUserProfile?: React.Dispatch<React.SetStateAction<ProfileProps | undefined>>;

  createUser: (email: string, password: string) => Promise<UserCredential>;
  createUserInDB: (user: UserCredential, birthdate: Date | undefined) => Promise<void>;

  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  loginWithGooglePopup: () => Promise<UserCredential>;

  getUserProfileFromDB: () => Promise<DocumentData | undefined>;

  updateUserHandle: (newHandle: string) => Promise<void>;
  updateUserName: (displayName: string) => Promise<void>;
  updateUserPhoto: (profile_pic: string) => Promise<void>;

  uploadUserPhoto: (file: File) => Promise<string | undefined>;
  // setUserPhotoinDB?: (profile_pic: string) => Promise<void>;
  uploadBgPhoto: (file: File) => Promise<void>;

  editUserProfile?: (userhandle: string, props: object) => Promise<void>;
}

const AuthContext = createContext({});

export function useAuthContext(): IAuthContext {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState({});
  const [userProfile, setUserProfile] = useState<ProfileProps>();

  async function createUser(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  async function createUserInDB(user: UserCredential, birthdate: Date | undefined): Promise<void> {
    try {
      const username = user.user.displayName;
      const docData = {
        uid: user.user.uid,
        birthdate,
        email: user.user.email ?? undefined,
        username: username,
        userhandle: uniqid(username.replace(/\s+/g, '').toLowerCase()),
        joined_date: new Date(),
      };
      setUserProfile(docData);
      const newUserRef = doc(db, 'user-profiles', docData.uid);
      await setDoc(newUserRef, docData);
    } catch (error) {
      console.error('error creating user in db', error);
    }
  }

  async function updateUserHandle(newHandle: string): Promise<void> {
    if (auth.currentUser)
      try {
        const docData = {
          userhandle: newHandle,
        };
        await updateDoc(doc(db, 'user-profiles', auth.currentUser.uid), docData);
      } catch (error) {
        console.error('error updating username', error);
      }
  }

  // uploads photo to cloud storage & store in DB
  async function uploadUserPhoto(file: File): Promise<string | undefined> {
    const { currentUser } = auth;
    if (currentUser)
      try {
        const userUid = currentUser.uid ?? '';
        const filePath = `${userUid}/${file.name}`;
        const newImageRef = ref(storage, filePath);
        await uploadBytesResumable(newImageRef, file);

        const publicImageUrl = await getDownloadURL(newImageRef);
        await updateDoc(doc(db, 'user-profiles', userUid), {
          profile_pic: publicImageUrl,
        });

        return publicImageUrl;
      } catch (error) {
        console.error('error uploading to cloud storage', error);
      }
  }

  async function uploadBgPhoto(file: File): Promise<void> {
    const { currentUser } = auth;
    if (currentUser)
      try {
        const filePath = `${currentUser.uid}/${file.name}`;
        const newImageRef = ref(storage, filePath);
        await uploadBytesResumable(newImageRef, file);

        const publicImageUrl = await getDownloadURL(newImageRef);
        await updateDoc(doc(db, 'user-profiles', userProfile?.userhandle), {
          bgURL: publicImageUrl,
        });
      } catch (error) {
        console.error('error uploading to cloud storage:', error);
      }
  }

  async function login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  // if (first login) => createUserInDB
  // else => fetch user

  async function loginWithGooglePopup() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  }

  async function logout(): Promise<void> {
    await signOut(auth);
  }

  async function getUserProfileFromDB(): Promise<DocumentData | undefined> {
    const { currentUser } = auth;
    if (currentUser) {
      const usersRef = collection(db, 'user-profiles');
      // const docSnap = await getDoc(usersRef);
      const userQuery = query(usersRef, where('uid', '==', currentUser?.uid));
      const userQuerySnapshot = await getDocs(userQuery);

      let userData;

      userQuerySnapshot.forEach((doc) => {
        userData = doc.data();
      });

      return userData;
    }
  }

  async function updateUserName(displayName: string): Promise<void> {
    if (auth.currentUser)
      await updateProfile(auth.currentUser, {
        displayName,
      });
  }

  // sets the User object with a profile_pic, may just want phtooURL in
  // db instead in which case remove below
  async function updateUserPhoto(profile_pic: string): Promise<void> {
    if (auth.currentUser)
      await updateProfile(auth.currentUser, {
        profile_pic,
      });
  }

  async function editUserProfile(userhandle: string, props: object) {
    const userProfileRef = doc(db, 'user-profiles', userhandle);
    await setDoc(userProfileRef, props, { merge: true });
    const x = await getUserProfileFromDB();
    setUserProfile(x);
  }

  /* useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        setCurrentUser(user);
        void (async () => {
          try {
            const x = await getUserProfileFromDB();
            setUserProfile(x);
            console.log('userProfile set');
          } catch (error) {
            console.error('could not set userProfile', error);
          }
        })();
      } else {
        setCurrentUser({});
      }
    });
    return unsub;
  }, []); */

  const values = useMemo(() => {
    return {
      currentUser,
      setCurrentUser,
      userProfile,
      setUserProfile,
      createUser,
      createUserInDB,
      login,
      loginWithGooglePopup,
      getUserProfileFromDB,
      logout,
      updateUserHandle,
      updateUserName,
      uploadUserPhoto,
      uploadBgPhoto,
      updateUserPhoto,
      editUserProfile,
    };
  }, [currentUser, userProfile]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
