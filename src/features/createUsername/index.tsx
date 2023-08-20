import { useContext, useState } from 'react';
import { SIGNUP_PAGE_CONTEXT } from '../../contexts/userContext';
import CloseModal from '../signupModal/closeModal';
import { Link } from 'react-router-dom';

export default function CreateUsername(): JSX.Element {
  const { setSignupPage } = useContext(SIGNUP_PAGE_CONTEXT);

  const [username, setUsername] = useState('');
  return (
    <div className="max-w-[600px] h-full">
      <div className="flex flex-row w-full pt-3">
        <CloseModal />

        <div className="ml-10">
          <span className="text-[20px] leading-[24px] font-bold">Step: 4 of 5</span>
        </div>

        <div className="grow" />
      </div>

      <div className="flex flex-col justify-between h-5/6">
        <div className="flex flex-col px-[80px]">
          <div>
            <div className="my-[20px]">
              <span className="text-[31px] leading-[36px] font-bold">What should we call you?</span>
            </div>
            <div>
              <span className="text-[14px] leading-[16px] text-greyTxt">
                Your @username is unique. You can always change it later
              </span>
            </div>
          </div>

          <div className="flex flex-col ">
            <div className="py-[12px] px-0">
              <div
                className="border-[1px] border-greyTxt rounded-[4px] group 
                          focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                          focus-within:border-clear"
              >
                <label className="">
                  <div className="flex flex-row absolute w-[438px]">
                    {username.length > 0 ? (
                      <div className="input-name-text-signup">
                        <span>Username</span>
                      </div>
                    ) : (
                      <div className="input-name-signup">
                        <span>Username</span>
                      </div>
                    )}
                  </div>
                  <div className="label-signup">
                    <input
                      type="text"
                      className="input-signup"
                      placeholder=" "
                      required
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
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
          className="bg-black text-white h-[49px] w-full rounded-full text-[16px] leading-[19px] font-bold"
          onClick={() => {
            if (setSignupPage) setSignupPage(0);
          }}
        >
          Finish
        </Link>
      </div>
    </div>
  );
}
