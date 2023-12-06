import type React from 'react';
import { createContext } from 'react';
import type InewUser from '../types/InewUser';
import { newUserDefault } from '../defaults/newUserDefault';

interface I_SIGNUP_PAGE_CONTEXT {
  signupPage: number;
  setSignupPage: React.Dispatch<React.SetStateAction<number>>;
}

interface I_LOGIN_PAGE_CONTEXT {
  loginPage: number;
  setLoginPage: React.Dispatch<React.SetStateAction<number>>;
}

interface I_NEW_USER_CONTEXT {
  newUserData: InewUser;
  setNewUserData?: React.Dispatch<React.SetStateAction<InewUser>>;
}

export const SIGNUP_PAGE_CONTEXT = createContext<I_SIGNUP_PAGE_CONTEXT>({});
export const LOGIN_PAGE_CONTEXT = createContext<I_LOGIN_PAGE_CONTEXT>({});
export const NEW_USER_CONTEXT = createContext<I_NEW_USER_CONTEXT>({
  newUserData: newUserDefault,
});
