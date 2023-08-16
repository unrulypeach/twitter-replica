import NewsItem from "./newsitem";

export default function News(): JSX.Element {
  return (
    <div className="bg-dark-800 rounded-[16px] mb-[15px]">
      <div className="px-[15px] py-[11px]">
        <span className="text-[19px] leading-[23px] font-bold">
          What{`'`}s Happening
        </span>
      </div>
      <NewsItem
        title="Big News"
        reasonForSuggest="LIVE"
        category="Sports"
        numberOfTweets={1000}
      />
      <NewsItem
        title="Such Smol News"
        reasonForSuggest="Trending"
        category="Cars"
        numberOfTweets={2}
      />
      <div>
        <div className="p-[15px]">
          <span className="text-[14px] leading-[19px] text-blue cursor-pointer">
            Show more
          </span>
        </div>
      </div>
    </div>
  );
}
