import { AxiosResponse } from 'axios';
import RefreshProps from '../types/refreshProps';
import { handleAxiosError } from '../scripts/errorHandling';
import { axiosPrivate } from '../api/axios';

const useRefreshToken = () => {
  let res: AxiosResponse<RefreshProps>;
  const refresh = async () => {
    try {
      res = await axiosPrivate.get('/refresh');
      const { access_token, user } = res.data;
      localStorage.setItem('token', access_token);
      console.log('token refreshed');
      return user;
    } catch (error) {
      handleAxiosError(error);
    } finally {
      console.log(res);
    }
  };

  return refresh;
};

export default useRefreshToken;
