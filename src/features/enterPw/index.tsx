import CloseModal from '../signupModal/closeModal';
import { hidePw, viewPw } from '../../styles/assets/icons/iconData';
import { useContext, useState } from 'react';
import { useAuthContext } from '../../contexts/authContext';
import { LOGIN_PAGE_CONTEXT } from '../../contexts/userContext';
import { Link } from 'react-router-dom';

export default function EnterPw(): JSX.Element {
  const { setLoginPage } = useContext(LOGIN_PAGE_CONTEXT);
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const { login, userProfile } = useAuthContext();

  async function handleNext(): Promise<void> {
    if (login && userProfile?.email)
      await login(userProfile.email, pw).then(
        () => {
          if (setLoginPage) setLoginPage(0);
        },
        (error) => {
          console.log(error);
        },
      );
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
                    {pw.length > 0 ? (
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
                      type={showPw ? 'text' : 'password'}
                      className="input-signup"
                      placeholder=" "
                      required
                      onChange={(e) => {
                        setPw(e.target.value);
                      }}
                    />
                    <span
                      className="ml-[4px]"
                      onClick={() => {
                        setShowPw(!showPw);
                      }}
                    >
                      {showPw ? hidePw : viewPw}
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
