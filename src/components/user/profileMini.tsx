import Avatar from "./avatar";
import { moreNoBorder } from "../../styles/assets/icons/iconData";
import { useAuthContext } from "../../contexts/authContext";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileMini(): JSX.Element {
  const { userProfile, logout } = useAuthContext();
  const [popped, setPopped] = useState(false);

  const LogoutPopup = (): JSX.Element => {
    return (
      <Link
        to="/"
        className="w-[270px] fixed bottom-[79px] z-10"
        onClick={() => {
          if (logout) void logout();
        }}
      >
        <div className="shadow-reg rounded-[14px] py-[22px] px-[15px] cursor-pointer">
          <span className="text-[14px] leading-[19px] font-bold">
            Log out @{userProfile?.userHandle}
          </span>
        </div>
      </Link>
    );
  };

  return (
    <>
      <div
        className="my-[11px] w-[255px] h-[69px] flex rounded-full cursor-pointer hover:bg-blackHov"
        onClick={() => {
          setPopped(!popped);
        }}
      >
        <div className="flex grow justify-between items-center p-[11px]">
          <Avatar photoURL={userProfile?.photoURL} />
          <div className="grow pl-3">
            <h1 className="font-bold text-[14px] leading-[19px]">
              {userProfile?.userName}
            </h1>
            <h2 className="text-dark-500 text-[14px] leading-[19px]">
              @{userProfile?.userHandle}
            </h2>
          </div>
          <div className="flex flex-col grow items-end">{moreNoBorder}</div>
        </div>
      </div>
      {popped ? <LogoutPopup /> : <></>}
    </>
  );
}
