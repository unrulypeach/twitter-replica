/* eslint-disable @typescript-eslint/no-misused-promises */
import { signInGoogle } from "../../services/firebase/auth";
import { logoGoogle } from "../../styles/assets/icons/iconData";

export default function SignupGoogleBtn(): JSX.Element {
  return (
    <div className="mb-[12px]">
      <button className="btn-signup" onClick={signInGoogle}>
        <div className="flex flex-row justify-center px-[16px]">
          <span className="h-[18px] mr-[8px] w-[18px]">{logoGoogle}</span>
          <span className="text-[14px]">Sign up with Google</span>
        </div>
      </button>
    </div>
  );
}
