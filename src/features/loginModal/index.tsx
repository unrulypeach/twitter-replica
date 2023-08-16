import CloseModal from "../signupModal/closeModal";
import { twitterBirdBlue } from "../../styles/assets/icons/iconData";
import SignupGoogleBtn from "../signup/signupGoogleBtn";
import SignupAppleBtn from "../signup/signupAppleBtn";
import LoginSection from "./loginSection";

export default function LoginModal(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full pt-3">
        <CloseModal />
        <div className="grow" />

        <div className="">{twitterBirdBlue}</div>

        <div className="grow" />
      </div>

      <div className="my-[19px]">
        <span className="text-[29px] leading-[34px] font-bold">
          Sign in to Twitter
        </span>
      </div>

      <div className="flex flex-col px-[30px] max-w-[364px] min-w-[364px] m-auto">
        <div className="mt-[12px]">
          <SignupGoogleBtn />
        </div>
        <SignupAppleBtn />

        <div className="flex flex-row">
          <div className="mx-[4px] grow flex flex-col justify-center">
            <div className="h-[1px] w-full bg-greyBorder my-[8px]" />
          </div>
          <span className="text-[16px] leading-[19px]">or</span>
          <div className="mx-[4px] grow flex flex-col justify-center">
            <div className="h-[1px] w-full bg-greyBorder my-[8px]" />
          </div>
        </div>

        <LoginSection />
      </div>
    </div>
  );
}
