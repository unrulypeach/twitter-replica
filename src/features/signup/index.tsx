import SignupGoogleBtn from "./signupGoogleBtn";
import SignupAppleBtn from "./signupAppleBtn";
import SignupCreateAccount from "./signupCreateAcc";
import SignupTos from "./signupTos";
import { Link } from "react-router-dom";

export default function SignUp(): JSX.Element {
  return (
    <div className="mb-[16px] border-[1px] border-searchbar rounded-[16px]">
      <div className="flex flex-col">
        <div className="px-[16px] py-[12px]">
          <span className="text-[20px] leading-[24px] font-extrabold">
            New to Twitter?
          </span>
        </div>

        <div className="px-[12px]">
          <span className="text-[13px] leading-[16px] text-greyTxt">
            Sign up now to get your own personalized timeline!
          </span>
        </div>

        <div className="mx-[12px] my-[16px]">
          <div className="flex flex-col items-center">
            <SignupGoogleBtn />

            <SignupAppleBtn />

            <Link to="/signup">
              <SignupCreateAccount />
            </Link>
          </div>
        </div>

        <SignupTos />
      </div>
    </div>
  );
}
