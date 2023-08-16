import { moreNoBorder } from "../../styles/assets/icons/iconData";
import type NewsProps from "../../types/newsProps";

export default function NewsItem({
  title,
  reasonForSuggest,
  category,
  numberOfTweets,
}: NewsProps): JSX.Element {
  return (
    <div className="flex flex-row justify-between py-[11px] px-[15px]">
      <div className="flex flex-col">
        <div className="flex flex-row text-xs">
          <div className="text-greyTxt">
            <span>{category}</span>
          </div>
          <div className="px-1 self-center">
            <span>&middot;</span>
          </div>
          <div>
            <span>{reasonForSuggest}</span>
          </div>
        </div>
        <div className="flex">
          <h2 className="text-[14px] leading-[19px] font-bold">{title}</h2>
        </div>
        <div>
          <span className="text-xs text-greyTxt">{numberOfTweets} Tweets</span>
        </div>
      </div>

      <div>{moreNoBorder}</div>
    </div>
  );
}
