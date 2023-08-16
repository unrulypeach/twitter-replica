import { twitterBirdBlue } from "../../../styles/assets/icons/iconData";
import ProfileMini from "../../user/profileMini";
import SignedOutLSideMenu from "./signedOutLSideMenu";

export default function SideMenu(): JSX.Element {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col basis-auto items-start">
        <div className="flex w-[47px] h-[47px]">
          <div className="text-blue flex justify-center items-center grow">
            {twitterBirdBlue}
          </div>
        </div>
        <SignedOutLSideMenu />
      </div>
      <div>
        <ProfileMini />
      </div>
    </div>
  );
}
