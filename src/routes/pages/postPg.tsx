import SignedInRSideMenu from '../../components/sidemenu/right/signedInRSideMenu';
import { useAuthContext } from '../../contexts/authContext';
import Avatar from '../../components/user/avatar';
import { useLocation } from 'react-router-dom';
import { showMonthDayAndYear, showTime } from '../../scripts/utils';
import { reply, retweet, like, likeFilled, views, share } from '../../styles/assets/icons/iconData';
import { useState } from 'react';
import { likeThisPost, unlikeThisPost } from '../../services/firebase/firestore';

export default function PostPg(): JSX.Element {
  const { userProfile } = useAuthContext();
  const location = useLocation();
  const { userName, userHandle, text, imgLink, date, likes, id, liked, likesCount } = location.state;
  const [thisLiked, setThisLiked] = useState(liked);
  const [thisLikesCount, setThisLikesCount] = useState(likesCount);

  const handleLike = (e) => {
    if (thisLiked) {
      void unlikeThisPost(userProfile?.userHandle, userHandle, id);
      setThisLiked(!thisLiked);
      setThisLikesCount((prev) => prev - 1);
    }
    if (!thisLiked) {
      void likeThisPost(userProfile?.userHandle, userHandle, id);
      setThisLiked(!thisLiked);
      setThisLikesCount((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-[600px] px-[15px]">
        <div className="h-[50px]">
          <div className="h-full text-[19px] leading-[23px] font-bold flex items-center">
            <span>Post</span>
          </div>
        </div>
        <div className="flex pb-[4px] mt-[11px] mb-[4px]">
          <Avatar photoURL={userProfile?.photoURL} />
          <div className="grow pl-3">
            <h1 className="font-bold text-[14px] leading-[19px]">{userName}</h1>
            <h2 className="text-dark-500 text-[14px] leading-[19px]">@{userHandle}</h2>
          </div>
        </div>
        <div className="text-[16px] leading-[23px]">{text}</div>
        <div className="py-[15px] text-[14px] leading-[19px] text-time">
          {showTime(date)} {showMonthDayAndYear(date)}
        </div>
        <div className="mt-[11px] flex flex-row justify-around w-full">
          <div className="fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">{reply}</div>
          </div>
          <div className="fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-retweetHover group-hover:fill-retweetLineHover">
              {retweet}
            </div>
          </div>
          <div className="cursor-pointer group" role="button" tabIndex={0} onClick={(e) => handleLike(e)}>
            {thisLiked ? (
              <div className="flex">
                <div className="rounded-full p-[8px] group-hover:bg-likesHover fill-likesLineHover">{likeFilled}</div>
                <span className="text-[12px] leading-[15px] px-[11px] pt-[8px] text-likesLineHover">
                  {thisLikesCount}
                </span>
              </div>
            ) : (
              <div className="flex fill-dark-500">
                <div className="rounded-full p-[8px] group-hover:bg-likesHover group-hover:fill-likesLineHover">
                  {like}
                </div>
                <span className="text-[12px] leading-[15px] px-[11px] pt-[8px] group-hover:text-likesLineHover">
                  {thisLikesCount}
                </span>
              </div>
            )}
          </div>
          <div className="fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">{views}</div>
          </div>
          <div className="fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">{share}</div>
          </div>
        </div>
      </div>

      <div>
        <SignedInRSideMenu path="notifications" />
      </div>
    </div>
  );
}
