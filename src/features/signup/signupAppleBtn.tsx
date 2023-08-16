import { logoApple } from "../../styles/assets/icons/iconData";

export default function SignupAppleBtn(): JSX.Element {
  return (
    <div className="mb-[12px]">
      <button className="btn-signup">
        <div className="flex flex-row justify-center">
          <span className="h-[18px] mr-[8px] w-[18px]">{logoApple}</span>
          <span className="text-[15px] leading-20px font-bold">
            Sign up with Apple
          </span>
        </div>
      </button>
    </div>
  );
}
