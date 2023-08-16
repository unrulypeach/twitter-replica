import Header from "../../features/header";
import SignedInRSideMenu from "../../components/sidemenu/right/signedInRSideMenu";
import { pathWoBackslash } from "../../scripts/utils";
import defaultPic from "../../styles/assets/defaults/bookmarksPageDefault.png";

export default function BookmarksPage(): JSX.Element {
  return (
    <div className="flex flex-row">
      <div>
        <div>
          <Header path={pathWoBackslash()} />
        </div>

        <div>
          <img src={defaultPic} />

          <div>
            <span className="text-[29px] leading-[34px] font-extrabold">
              Save Tweets for Later
            </span>
          </div>

          <div>
            <span className="text-[14px] leading-[19px] text-greyTxt">
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
