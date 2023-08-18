import { type Timestamp } from 'firebase/firestore';
import Avatar from '../../components/user/avatar';
import { convertToTimeSince } from '../../scripts/utils';
import { reply, retweet, like, views, share, moreNoBorder } from '../../styles/assets/icons/iconData';

interface TweetProps {
  userName: string;
  userHandle: string;
  text: string;
  imgLink: string;
  date: Timestamp;
  likes: number;
}
export default function Tweet({ userName, userHandle, text, imgLink, date, likes }: TweetProps): JSX.Element {
  return (
    <div className="flex flex-row px-[15px] pt-[11px]">
      <div className="mr-[11px]">
        <Avatar />
      </div>

      <div className="flex flex-col justify-center grow">
        <div className="mb-[2px] flex flex-row justify-between leading-[19px]">
          <div>
            <span className="text-[14px] leading-[19px] font-bold">{userName} </span>
            <span className="text-[13px] leading-[19px] text-greyTxt">@{userHandle} ·</span>
            <span className="text-[13px] leading-[19px] text-greyTxt"> {convertToTimeSince(date)}</span>
          </div>
          <div>{moreNoBorder}</div>
        </div>

        <div className="text-[14px] leading-[19px]">
          <div>
            <div>
              <div>
                <span>{text} </span>
              </div>
              {imgLink !== undefined ? <img src={imgLink} alt="" /> : <></>}
            </div>
          </div>
        </div>

        <div className="mt-[11px] flex flex-row justify-between max-w-[425px]">
          <div className="fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">{reply}</div>
          </div>
          <div className="fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-retweetHover group-hover:fill-retweetLineHover">
              {retweet}
            </div>
          </div>
          <div className="fill-dark-500 cursor-pointer group">
            <div className="flex">
              <div className="rounded-full p-[8px] group-hover:bg-likesHover group-hover:fill-likesLineHover">
                {like}
              </div>
              <span className="text-[12px] leading-[15px] px-[11px] pt-[8px] group-hover:text-likesLineHover">
                {likes}
              </span>
            </div>
          </div>
          <div className="fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">{views}</div>
          </div>
          <div className="fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">{share}</div>
          </div>
        </div>

        {/* <div>
          <span className="text-blue">Show this thread</span>
        </div> */}
      </div>
    </div>
  );
}
