import { useContext } from 'react';
import AuthContext from '../contexts/authContext';
import type IAuthContext from '../types/authContext';

export default function useAuthContext(): IAuthContext {
  return useContext(AuthContext);
}
