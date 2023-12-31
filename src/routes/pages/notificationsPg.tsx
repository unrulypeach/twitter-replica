import Header from '../../features/header';
import SignedInRSideMenu from '../../components/sidemenu/right/signedInRSideMenu';
import Tabbar from '../../features/tabbar';
import { pathWoBackslash } from '../../scripts/utils';

export default function NotificationsPage(): JSX.Element {
  return (
    <div className="flex flex-row">
      <div className="w-[600px] w-[600px] border-r-[1px] border-r-searchbar">
        <div>
          <Header path={pathWoBackslash()} />
        </div>

        <div>
          <Tabbar path="notifications" />
        </div>

        <div className="flex flex-col w-[320px] mx-auto my-[30px]">
          <span className="text-[29px] leading-[34px] font-extrabold">Nothing to see here - yet</span>
          <span className="text-[14px] leading-[19px] text-greyTxt">
            From likes to Retweets and a whole lot more, this is where all the action happens.
          </span>
        </div>
      </div>

      <div>
        <SignedInRSideMenu path="notifications" />
      </div>
    </div>
  );
}
