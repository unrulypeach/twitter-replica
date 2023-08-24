import { type Timestamp } from 'firebase/firestore';
import Avatar from '../../components/user/avatar';
import { convertToTimeSince } from '../../scripts/utils';
import { reply, retweet, like, views, share, moreNoBorder, likeFilled } from '../../styles/assets/icons/iconData';
import { likeThisPost, unlikeThisPost } from '../../services/firebase/firestore';
import { useAuthContext } from '../../contexts/authContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface TweetProps {
  userName: string;
  userHandle: string;
  text: string;
  imgLink: string;
  date: Timestamp;
  likes: Array<string>;
  id: string;
  path: string;
  userPic: string;
}
export default function Tweet({
  userName,
  userHandle,
  text,
  imgLink,
  date,
  likes,
  id,
  path,
  userPic,
}: TweetProps): JSX.Element {
  const { userProfile } = useAuthContext();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);

  const handleLike = (e) => {
    e.preventDefault();
    if (liked) {
      void unlikeThisPost(userProfile?.userHandle, path);
      setLiked(!liked);
      setLikesCount((prev) => prev - 1);
    }
    if (!liked) {
      void likeThisPost(userProfile?.userHandle, path);
      setLiked(!liked);
      setLikesCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (likes) {
      if (likes.includes(userProfile?.userHandle)) setLiked(true);
    }
  }, []);

  return (
    <Link
      to={`/${userHandle}/p/${id}`}
      state={{
        userName,
        userHandle,
        text,
        imgLink,
        date,
        likes,
        id,
        liked,
        likesCount,
        path,
      }}
    >
      <div className="flex flex-row px-[15px] pt-[11px] pb-[6px] border-b border-searchbar">
        <div className="mr-[11px]">
          <Avatar photoURL={userPic} />
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
              <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">
                {reply}
              </div>
            </div>
            <div className="fill-dark-500 cursor-pointer group">
              <div className="rounded-full p-[8px] group-hover:bg-retweetHover group-hover:fill-retweetLineHover">
                {retweet}
              </div>
            </div>
            <div className="cursor-pointer group" role="button" tabIndex={0} onClick={(e) => handleLike(e)}>
              {liked ? (
                <div className="flex">
                  <div className="rounded-full p-[8px] group-hover:bg-likesHover fill-likesLineHover">{likeFilled}</div>
                  <span className="text-[12px] leading-[15px] px-[11px] pt-[8px] text-likesLineHover">
                    {likesCount}
                  </span>
                </div>
              ) : (
                <div className="flex fill-dark-500">
                  <div className="rounded-full p-[8px] group-hover:bg-likesHover group-hover:fill-likesLineHover">
                    {like}
                  </div>
                  <span className="text-[12px] leading-[15px] px-[11px] pt-[8px] group-hover:text-likesLineHover">
                    {likesCount}
                  </span>
                </div>
              )}
            </div>
            <div className="fill-dark-500 cursor-pointer group">
              <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">
                {views}
              </div>
            </div>
            <div className="fill-dark-500 cursor-pointer group">
              <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">
                {share}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
