import { createContext } from 'react';
import IAuthContext from '../types/authContext';

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default AuthContext;
