/* eslint-disable @typescript-eslint/no-misused-promises */
import { User } from 'firebase/auth';
import { useAuthContext } from '../../contexts/authContext';
import { logoGoogle } from '../../styles/assets/icons/iconData';
import { getUserProfileByUid } from '../../services/firebase/firestore';
import uniqid from 'uniqid';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../configs/firebase-config';

export default function SignupGoogleBtn(): JSX.Element {
  const { loginWithGooglePopup, setUserProfile } = useAuthContext();
  return (
    <div className="mb-[12px]">
      <button
        className="btn-signup"
        onClick={async () => {
          await loginWithGooglePopup().then(async (result) => {
            /* user = {
                displayName, email, uid
              } */

            // if user in db => fetchUser
            // else => createUser
            const user: User = result.user;
            await getUserProfileByUid(user.uid)
              .then(() => {
                setUserProfile(userDB);
              })
              .catch(() => {
                const createUserData = {
                  uid: user.uid,
                  email: user.email,
                  userName: user.displayName,
                  joinedDate: new Date(),
                  userHandle: uniqid(user.displayName?.replace(/\s/g, '').toLowerCase()),
                  //birthdate
                };
                setUserProfile(createUserData);
                const newUserRef = doc(db, 'user-profiles', createUserData.uid);
                setDoc(newUserRef, createUserData).catch((error) => console.error(error));
              });
          });
        }}
      >
        <div className="flex flex-row justify-center px-[16px]">
          <span className="h-[18px] mr-[8px] w-[18px]">{logoGoogle}</span>
          <span className="text-[14px]">Sign up with Google</span>
        </div>
      </button>
    </div>
  );
}
