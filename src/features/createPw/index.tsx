import { useContext, useState } from "react";
import {
  SIGNUP_PAGE_CONTEXT,
  NEW_USER_CONTEXT,
} from "../../contexts/userContext";
import CloseModal from "../signupModal/closeModal";
import { hidePw, viewPw } from "../../styles/assets/icons/iconData";
import { useAuthContext } from "../../contexts/authContext";

export default function CreatePw(): JSX.Element {
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { newUserData } = useContext(NEW_USER_CONTEXT);
  const { name, email, birthdate } = newUserData;
  const { signupPage, setSignupPage } = useContext(SIGNUP_PAGE_CONTEXT);
  const { createUser, createUserInDB, updateUserName } = useAuthContext();

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();

    if (createUser && email)
      createUser(email, pw).then(
        async (user) => {
          if (updateUserName && name) await updateUserName(name);
          if (createUserInDB && birthdate)
            await createUserInDB(user, birthdate);
          if (setSignupPage) setSignupPage(Number(signupPage) + 1);
        },
        (error) => {
          if (setSignupPage) setSignupPage(1);
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/weak-password") {
            alert("The password is too weak");
          } else if (errorCode === "auth/email-already-in-use") {
            alert("Please use another email");
          } else {
            alert(errorMessage);
          }
          console.error(error);
        }
      );
  }

  return (
    <div className="max-w-[600px] h-full">
      <div className="flex flex-row w-full pt-3">
        <CloseModal />

        <div className="ml-10">
          <span className="text-[20px] leading-[24px] font-bold">
            Step: 2 of 5
          </span>
        </div>

        <div className="grow" />
      </div>

      <div className="flex flex-col justify-between h-5/6">
        <div className="flex flex-col px-[80px]">
          <div>
            <div className="mt-[20px] mb-[9px]">
              <span className="text-[31px] leading-[36px] font-bold">
                You&apos;ll need a password
              </span>
            </div>

            <div className="mb-[20px]">
              <span className="text-[14px] leading-[16px] text-greyTxt">
                Make sure it&apos;s 8 characters or more.
              </span>
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
                      type={showPw ? "text" : "password"}
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
        <button
          className="bg-black text-white h-[49px] w-full rounded-full text-[16px] leading-[19px] font-bold"
          type="button"
          onClick={(e) => {
            void handleSubmit(e);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
