import MenuItem from "./menuitem";
import {
  home,
  explore,
  notification,
  messages,
  bookmarks,
  twitterblue,
  twitterBirdBlue,
  profile,
  homeFilled,
  exploreFilled,
  notificationFilled,
  messagesFilled,
  bookmarksFilled,
  twitterblueFilled,
  profileFilled,
  more,
} from "../../../styles/assets/icons/iconData";
import ProfileMini from "../../user/profileMini";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/authContext";

export default function SignedInLSideMenu(): JSX.Element {
  const { userProfile } = useAuthContext();
  return (
    <div className="h-full w-[275px] px-[8x] flex flex-col justify-between">
      <div>
        <Link to="/">
          <div className="flex items-center px-[11px] py-[2px] h-[47px]">
            {twitterBirdBlue}
          </div>
        </Link>
        <div className="flex flex-col">
          <MenuItem title="Home" iconData={home} filledIcon={homeFilled} />
          <MenuItem
            title="Explore"
            iconData={explore}
            filledIcon={exploreFilled}
          />
          <MenuItem
            title="Notifications"
            iconData={notification}
            filledIcon={notificationFilled}
          />
          <MenuItem
            title="Messages"
            iconData={messages}
            filledIcon={messagesFilled}
          />
          <MenuItem
            title="Bookmarks"
            iconData={bookmarks}
            filledIcon={bookmarksFilled}
          />
          <MenuItem
            title="Twitter Blue"
            iconData={twitterblue}
            filledIcon={twitterblueFilled}
          />
          <MenuItem
            title="Profile"
            iconData={profile}
            filledIcon={profileFilled}
          />
          <MenuItem title="More" iconData={more} />
          <button className="btn-primary-big my-[15px]"> Tweet </button>
        </div>
      </div>

      <ProfileMini />
    </div>
  );
}
