import { AxiosResponse } from 'axios';
import { axiosPrivate } from '../api/axios';
import RefreshProps from '../types/refreshProps';

const useRefreshToken = () => {
  const refresh = async () => {
    const res: AxiosResponse<RefreshProps> = await axiosPrivate.get('/refresh');

    localStorage.setItem('token', res.data.access_token);
    return res.data.access_token;
  };

  return refresh;
};

export default useRefreshToken;
