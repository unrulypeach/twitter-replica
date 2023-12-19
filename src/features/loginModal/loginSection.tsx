import { useContext, useState } from 'react';
import { LOGIN_PAGE_CONTEXT } from '../../contexts/userContext';
import useAuthContext from '../../hooks/useAuthContext';

export default function LoginSection(): JSX.Element {
  const [loginEmail, setLoginEmail] = useState('');
  const { setLoginPage } = useContext(LOGIN_PAGE_CONTEXT);
  const { setLoginData } = useAuthContext();
  return (
    <div className="flex flex-col ">
      <div className="py-[12px] px-0">
        <div
          className="border-[1px] border-greyBorder rounded-[4px] group 
                  focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                  focus-within:border-clear"
        >
          <label className="">
            <div className="flex flex-row absolute w-[438px]">
              {loginEmail.length > 0 ? (
                <div className="input-name-text-signup">
                  <span>Email</span>
                </div>
              ) : (
                <div className="input-name-signup">
                  <span>Email</span>
                </div>
              )}
            </div>
            <div className="label-signup">
              <label htmlFor="email">
                <input
                  name="email"
                  type="text"
                  className="input-signup"
                  maxLength={50}
                  placeholder=" "
                  required
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                  }}
                />
              </label>
            </div>
          </label>
        </div>
      </div>

      <div className="flex flex-col">
        <button
          className="my-[11px] bg-black text-white h-[32px] w-full rounded-full text-[14px] leading-[19px] font-bold"
          type="button"
          onClick={() => {
            if (setLoginData) setLoginData(() => loginEmail);
            if (setLoginPage) setLoginPage(1);
          }}
        >
          Next
        </button>

        <button
          className="my-[11px] btn-signup h-[32px]  text-[14px] leading-[19px] font-bold"
          type="button"
          onClick={() => {}}
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
}
