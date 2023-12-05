import { useContext, useState } from 'react';
import { SIGNUP_PAGE_CONTEXT, NEW_USER_CONTEXT } from '../../contexts/userContext';
import CloseModal from '../signupModal/closeModal';
import { hidePassword, viewPassword } from '../../styles/assets/icons/iconData';
import { useAuthContext } from '../../contexts/authContext';
import { axiosPrivate } from '../../api/axios';
import { jwtDecode } from 'jwt-decode';

export default function CreatePassword(): JSX.Element {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { newUserData } = useContext(NEW_USER_CONTEXT);
  const { name, email, birthdate } = newUserData;
  const { signupPage, setSignupPage } = useContext(SIGNUP_PAGE_CONTEXT);
  const { setUserProfile, setCurrentUser } = useAuthContext();

  async function handleSubmit(): Promise<void> {
    try {
      const res = await axiosPrivate.post('/signup', {
        name,
        email,
        birthdate,
        password,
      });
      const { access_token } = res.data;
      const decodedToken = jwtDecode(access_token);
      const { user } = decodedToken;
      setUserProfile(user);
      setCurrentUser(access_token);
      if (setSignupPage) setSignupPage(Number(signupPage) + 1);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="max-w-[600px] h-full">
      <div className="flex flex-row w-full pt-3">
        <CloseModal />

        <div className="ml-10">
          <span className="text-[20px] leading-[24px] font-bold">Step: 2 of 5</span>
        </div>

        <div className="grow" />
      </div>

      <div className="flex flex-col justify-between h-5/6">
        <div className="flex flex-col px-[80px]">
          <div>
            <div className="mt-[20px] mb-[9px]">
              <span className="text-[31px] leading-[36px] font-bold">You&apos;ll need a password</span>
            </div>

            <div className="mb-[20px]">
              <span className="text-[14px] leading-[16px] text-greyTxt">Make sure it&apos;s 8 characters or more.</span>
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
        <button
          disabled={!(password.length > 8)}
          className="bg-black text-white h-[49px] w-full rounded-full text-[16px] leading-[19px] font-bold disabled:opacity-75"
          type="button"
          onClick={() => {
            void handleSubmit();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
