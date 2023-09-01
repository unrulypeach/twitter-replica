import Header from '../../features/header';
import SignedInRSideMenu from '../../components/sidemenu/right/signedInRSideMenu';
import { pathWoBackslash } from '../../scripts/utils';
import defaultPic from '../../styles/assets/defaults/bookmarksPageDefault.png';

export default function BookmarksPage(): JSX.Element {
  return (
    <div className="flex flex-row">
      <div className="w-[600px] border-r-[1px] border-r-searchbar">
        <div>
          <Header path={pathWoBackslash()} />
        </div>

        <div className="flex flex-col items-center">
          <img src={defaultPic} />

          <div>
            <span className="text-[29px] leading-[34px] font-extrabold">Save Tweets for Later</span>
          </div>

          <div className="w-[320px] pl-[8px]">
            <span className="text-[14px] leading-[19px] text-greyTxt pl-[4px]">
              {`Don’t let the good ones fly away! Bookmark Tweets to easily find
            them again in the future.`}
            </span>
          </div>
        </div>
      </div>

      <div>
        <SignedInRSideMenu path="bookmarks" />
      </div>
    </div>
  );
}
