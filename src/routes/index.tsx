import SignedInHome from './signedIn';
import SignedOutHome from './signedOut';
import SignInFooter from '../components/signInFooter';
import type InewUser from '../types/InewUser';

import { SIGNUP_PAGE_CONTEXT, NEW_USER_CONTEXT, LOGIN_PAGE_CONTEXT } from '../contexts/userContext';

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { newUserDefault } from '../defaults/newUserDefault';
import useAuthContext from '../hooks/useAuthContext';

export default function HomePg(): JSX.Element {
  const [signupPage, setSignupPage] = useState(0);
  const [loginPage, setLoginPage] = useState(0);
  const [newUserData, setNewUserData] = useState<InewUser>(newUserDefault);
  const { userProfile } = useAuthContext();

  return (
    <SIGNUP_PAGE_CONTEXT.Provider
      value={{
        signupPage,
        setSignupPage,
      }}
    >
      <LOGIN_PAGE_CONTEXT.Provider
        value={{
          loginPage,
          setLoginPage,
        }}
      >
        <NEW_USER_CONTEXT.Provider
          value={{
            newUserData,
            setNewUserData,
          }}
        >
          {userProfile?._id ? <SignedInHome /> : <SignedOutHome />}
          {userProfile?._id ? <></> : <SignInFooter />}
          <Outlet />
        </NEW_USER_CONTEXT.Provider>
      </LOGIN_PAGE_CONTEXT.Provider>
    </SIGNUP_PAGE_CONTEXT.Provider>
  );
}
