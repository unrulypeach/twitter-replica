import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useRefreshToken from './useRefreshToken';
import { AxiosError } from 'axios';

const useAxiosPrivate = () => {
  // get access token
  const refresh = useRefreshToken();

  useEffect(() => {
    // send access token with request
    const access_token = localStorage.getItem('token');
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${access_token}`; // TODO: get this from cookie
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // send response, or get new access token if access token is expired
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error?.config;
        // 403 auth error and already tried
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
