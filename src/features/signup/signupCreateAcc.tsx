import { SIGNUP_PAGE_CONTEXT } from "../../contexts/userContext";
import { useContext } from "react";

export default function SignupCreateAccount(): JSX.Element {
  const { setSignupPage } = useContext(SIGNUP_PAGE_CONTEXT);

  return (
    <div className="mb-[12px]">
      <button
        className="btn-signup"
        onClick={() => {
          if (setSignupPage) setSignupPage(1);
        }}
      >
        <div className="flex flex-row justify-center">
          <span className="text-[15px] leading-20px font-bold">
            Create Account
          </span>
        </div>
      </button>
    </div>
  );
}
