import NewsItem from '../../features/news/newsitem';
import Searchbar from '../../features/searchbar';
import Tabbar from '../../features/tabbar';
import SignedOutRSideMenu from '../../components/sidemenu/right/signedOutRSideMenu';
import SignedInRSideMenu from '../../components/sidemenu/right/signedInRSideMenu';
import useAuthContext from '../../hooks/useAuthContext';

export default function ExplorePage(): JSX.Element {
  const { userProfile } = useAuthContext();
  return (
    <div className="flex flex-row ">
      <div className="flex flex-col w-[600px] border-r-[1px] border-r-searchbar">
        <div className="px-[15px]">
          <Searchbar />
        </div>

        <div>
          <Tabbar path="Explore" />
        </div>

        <div>
          {/* Map an array of <NewsItem /> to be displayed here */}
          <NewsItem title="Big News" reasonForSuggest="LIVE" category="Sports" numberOfTweets={1000} />
          <NewsItem title="Such Smol News" reasonForSuggest="Trending" category="Cars" numberOfTweets={2} />
        </div>
      </div>

      <div>{userProfile?._id ? <SignedInRSideMenu path="explore" /> : <SignedOutRSideMenu />}</div>
    </div>
  );
}
