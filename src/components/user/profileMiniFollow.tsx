/* eslint-disable @typescript-eslint/restrict-plus-operands */
import Avatar from "./avatar";
import type ProfileProps from "../../types/profileProps";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import FollowBtn from "../../features/followBtn";

export default function ProfileMiniFollow({
  userName,
  userHandle,
}: ProfileProps): JSX.Element {
  const { userProfile } = useAuthContext();
  return (
    <>
      <Link to={"/" + userHandle}>
        <div className="flex justify-between items-center h-[69px] px-[15px] py-[11px]">
          <Avatar />
          <div className="grow pl-3">
            <h1 className="font-bold text-[14px] leading-[19px]">
              {userName ?? "Default Default"}
            </h1>
            <h2 className="text-dark-500 text-[14px] leading-[19px]">
              {"@" + (userHandle ?? "default")}
            </h2>
          </div>
          <FollowBtn
            currUser={userProfile?.userHandle}
            userHandle={userHandle}
          />
        </div>
      </Link>
    </>
  );
}
