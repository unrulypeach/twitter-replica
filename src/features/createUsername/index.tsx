import { useContext, useState, useEffect } from 'react';
import { SIGNUP_PAGE_CONTEXT } from '../../contexts/userContext';
import CloseModal from '../signupModal/closeModal';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosInterceptors';
import { handleAxiosError, handleAxiosValidationError } from '../../scripts/errorHandling';
import { useAuthContext } from '../../contexts/authContext';

export default function CreateUsername(): JSX.Element {
  const axiosPrivate = useAxiosPrivate();
  const { setUserProfile } = useAuthContext();
  const { setSignupPage } = useContext(SIGNUP_PAGE_CONTEXT);
  const [username, setUsername] = useState('');
  const [validationErrMsg, setValidationErrMsg] = useState([]);
  const [userhandleIsValid, setUserhandleIsValid] = useState('');
  const [userhandleSubmit, setUserhandleSubmit] = useState(false);

  const handleSubmit = () => {
    axiosPrivate
      .post('/sethandle', { userhandle: username })
      .then(() => {
        setUserProfile((prev) => {
          return { ...prev, userhandle: username };
        });
        if (setSignupPage) setSignupPage(0);
      })
      .catch((error) => {
        handleAxiosError(error);
      });
  };

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const res = await axiosPrivate.post('/checkhandle', {
          userhandle: username,
        });
        if ((res.data = 200)) {
          setUserhandleIsValid(() => username + ' is available');
          setUserhandleSubmit(true);
        }
        console.log(username, 'is', res.data);
      } catch (error) {
        const errorArray = handleAxiosValidationError(error);
        setUserhandleIsValid(() => '');
        setValidationErrMsg(() => errorArray);
      }
    };

    const debouncer = setTimeout(() => {
      if (username !== '') {
        checkUsername();
      }
    }, 600);
    return () => {
      clearTimeout(debouncer);
    };
  }, [username]);

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
                        setValidationErrMsg(() => []);
                        setUserhandleIsValid('');
                        setUserhandleSubmit(false);
                      }}
                    />
                  </div>
                </label>
              </div>
              <div>
                {userhandleIsValid && <div>{userhandleIsValid}</div>}
                {validationErrMsg &&
                  validationErrMsg.map((item, ind) => {
                    return (
                      <div key={ind} className="text-likesLineHover">
                        "{item.value}" {item.msg}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-[80px]">
        {username ? (
          userhandleSubmit ? (
            <Link
              to="/"
              className="bg-black text-white flex items-center justify-center h-[49px] w-full rounded-full text-[16px] leading-[19px] font-bold"
              onClick={() => {
                handleSubmit();
              }}
            >
              <span>Submit & Finish</span>
            </Link>
          ) : (
            <Link
              to="/"
              className="bg-black text-likesLineHover pointer-events-none flex items-center justify-center h-[49px] w-full rounded-full text-[16px] leading-[19px] font-bold"
            >
              <span>Submit & Finish</span>
            </Link>
          )
        ) : (
          <Link
            to="/"
            className="bg-black text-white flex items-center justify-center h-[49px] w-full rounded-full text-[16px] leading-[19px] font-bold"
            onClick={() => {
              if (setSignupPage) setSignupPage(0);
            }}
          >
            <span>Skip for now</span>
          </Link>
        )}
      </div>
    </div>
  );
}
