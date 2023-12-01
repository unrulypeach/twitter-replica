import { AxiosResponse } from 'axios';
import { axiosPrivate } from '../api/axios';
import { useAuthContext } from '../contexts/authContext';
import RefreshProps from '../types/refreshProps';

const useRefreshToken = () => {
  const { setCurrentUser } = useAuthContext();

  const refresh = async () => {
    const res: AxiosResponse<RefreshProps> = await axiosPrivate.get('/refresh');

    setCurrentUser(() => res.data.access_token);
    return res.data.access_token;
  };

  return refresh;
};

export default useRefreshToken;
