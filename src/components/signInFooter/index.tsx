import { Link } from "react-router-dom";
export default function SignInFooter(): JSX.Element {
  return (
    <div className="bg-blue text-white fixed bottom-0 w-full">
      <div className="flex flex-row justify-around my-[12px]">
        <div>
          <div>
            <span className="text-[23px] leading-[28px] font-bold">
              {"Don't miss what's happening"}
            </span>
          </div>

          <div>
            <span className="text-[15px] leading-[20px]">
              People on Twitter are the first to know
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center">
          <div className="border-white border-[1px] border-opacity-50 rounded-full">
            <Link
              to="/login"
              className="flex items-center min-w-[36px] min-h-[34px]"
            >
              <span className="text-[15px] leading-[20px] font-bold px-[14px]">
                Log in
              </span>
            </Link>
          </div>

          <div className="ml-[12px] bg-white rounded-full">
            <Link
              to="/signup"
              className="flex items-center min-w-[36px] min-h-[34px] px-[15px]"
            >
              <span className="text-[14px] leading-[19px] font-bold text-black">
                Sign up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
