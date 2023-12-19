import CloseModal from '../signupModal/closeModal';
import { hidePassword, viewPassword } from '../../styles/assets/icons/iconData';
import { useContext, useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import { LOGIN_PAGE_CONTEXT } from '../../contexts/userContext';
import { Link } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';
import { jwtDecode } from 'jwt-decode';
import { handleAxiosError } from '../../scripts/errorHandling';

export default function EnterPassword(): JSX.Element {
  const { setLoginPage } = useContext(LOGIN_PAGE_CONTEXT);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setUserProfile, loginData } = useAuthContext();

  async function handleNext(): Promise<void> {
    if (loginData && password) {
      try {
        const res = await axiosPrivate.post('/login', {
          email: loginData,
          password,
        });
        const { access_token } = res.data;
        const decodedToken = jwtDecode(access_token);
        const { user } = decodedToken;
        setUserProfile(user);
        localStorage.setItem('token', access_token);
        setLoginPage(0);
      } catch (err) {
        // setLoginPage(0);
        handleAxiosError(err);
      }
    }
  }

  return (
    <div className="max-w-[600px] h-full">
      <div className="flex flex-row w-full pt-3">
        <CloseModal />
        <div className="grow" />
      </div>

      <div className="flex flex-col justify-between h-5/6">
        <div className="flex flex-col px-[80px]">
          <div>
            <div className="my-[20px]">
              <span className="text-[31px] leading-[36px] font-bold">Enter your password</span>
            </div>
          </div>

          <div className="flex flex-col ">
            <div className="py-[12px] px-0">
              <div
                className="border-[1px] border-greyBorder rounded-[4px] group 
                          focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                          focus-within:border-clear"
              >
                <label className="">
                  <div className="flex flex-row absolute w-[438px]">
                    {password.length > 0 ? (
                      <div className="input-name-text-signup">
                        <span>Password</span>
                      </div>
                    ) : (
                      <div className="input-name-signup">
                        <span>Password</span>
                      </div>
                    )}
                  </div>
                  <div className="label-signup flex flex-row">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="input-signup"
                      placeholder=" "
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <span
                      className="ml-[4px]"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? hidePassword : viewPassword}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-[80px]">
        <Link
          to="/"
          className="bg-black text-white flex justify-center items-center h-[49px] w-full rounded-full text-[16px] leading-[19px] font-bold"
          onClick={() => {
            void handleNext();
          }}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
