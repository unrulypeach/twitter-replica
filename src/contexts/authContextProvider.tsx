import { useMemo, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import useRefreshToken from '../hooks/useRefreshToken';
import useAxiosPrivate from '../hooks/useAxiosInterceptors';
import { handleAxiosError } from '../scripts/errorHandling';
import { currTime } from '../scripts/utils';
import type ChildrenProps from '../types/childrenProps';
import type UserProps from '../types/userProps';
import AuthContext from './authContext';

const AuthProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProps | undefined>(undefined);
  const [loginData, setLoginData] = useState<string>('');
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  // persist login
  // check local storage for 'token' and try to log in
  useEffect(() => {
    const access_token = localStorage.getItem('token');
    const validate = () => {
      axiosPrivate
        .get<UserProps>('/validate')
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
    };
  }, [userProfile, loginData]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
