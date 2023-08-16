import SignUp from "../../../features/signup";
import Tos from "../../../features/tos";

export default function SignedOutRSideMenu(): JSX.Element {
  return (
    <div className="pl-5 pt-[11px] pb-[61px] flex flex-col border-l-[1px] border-searchbar max-w-[350px] min-h-screen">
      <div>
        <SignUp />
      </div>
      <div>
        <Tos />
      </div>
    </div>
  );
}
