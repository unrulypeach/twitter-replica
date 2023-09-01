import MenuItem from './menuitem';
import {
  home,
  explore,
  notification,
  messages,
  bookmarks,
  twitterBirdBlue,
  profile,
  homeFilled,
  exploreFilled,
  notificationFilled,
  messagesFilled,
  bookmarksFilled,
  profileFilled,
  smTweetBtn,
} from '../../../styles/assets/icons/iconData';
import ProfileMini from '../../user/profileMini';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/authContext';
import Avatar from '../../user/avatar';

export default function SignedInLSideMenu(): JSX.Element {
  const { userProfile } = useAuthContext();
  return (
    // <div className="border-r-[1px] border-searchbar fixed med:left-0 h-full w-[275px] med:w-[88px] px-[8x] flex flex-col justify-between med:items-center">
    <div className="border-r-[1px] border-searchbar med:left-0 h-full w-[275px] med:w-[88px] px-[8x] flex flex-col justify-between med:items-center">
      <div>
        <Link to="/">
          <div className="flex items-center px-[11px] py-[2px] h-[47px]">{twitterBirdBlue}</div>
        </Link>
        <div className="flex flex-col">
          <MenuItem title="Home" iconData={home} filledIcon={homeFilled} />
          <MenuItem title="Explore" iconData={explore} filledIcon={exploreFilled} />
          <MenuItem title="Notifications" iconData={notification} filledIcon={notificationFilled} />
          <MenuItem title="Messages" iconData={messages} filledIcon={messagesFilled} />
          <MenuItem title="Bookmarks" iconData={bookmarks} filledIcon={bookmarksFilled} />
          {/*<MenuItem title="Twitter Blue" iconData={twitterblue} filledIcon={twitterblueFilled} />*/}
          <MenuItem title="Profile" iconData={profile} filledIcon={profileFilled} />
          {/* <MenuItem title="More" iconData={more} /> */}
          <button className="btn-primary-big my-[15px] med:hidden"> Tweet </button>
          <div className="hidden med:block">
            <button className="bg-blue rounded-full fill-white p-[12px]">{smTweetBtn}</button>
          </div>
        </div>
      </div>

      <div className="med:hidden">
        <ProfileMini />
      </div>
      <div className="hidden med:block self-center">
        <Avatar photoURL={userProfile?.photoURL} />
      </div>
    </div>
  );
}
