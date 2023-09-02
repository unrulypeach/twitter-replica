import { twitterBirdBlue } from '../../styles/assets/icons/iconData';
import SignupAppleBtn from '../signup/signupAppleBtn';
import SignupGoogleBtn from '../signup/signupGoogleBtn';
import SignupCreateAccountDark from '../signup/signupCreateAccDark';
import SignupTos from '../signup/signupTos';
import CloseModal from './closeModal';
import { Link } from 'react-router-dom';

export default function SignupModal(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full pt-3">
        <CloseModal />
        <div className="grow" />

        <div className="">{twitterBirdBlue}</div>

        <div className="grow" />
      </div>

      <div className="my-[19px]">
        <span className="text-[29px] leading-[34px] font-bold">Join Twitter today</span>
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

        <div className="my-[12px]">
          <SignupCreateAccountDark />
        </div>

        <SignupTos />

        <div className="mt-[38px]">
          <span className="text-[14px] leading-[19px]">
            Have an account already?{' '}
            <Link to="/login" className="text-blue">
              Log in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
