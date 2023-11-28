import Avatar from '../../components/user/avatar';
import { convertToTimeSince } from '../../scripts/utils';
import { reply, retweet, like, views, share, moreNoBorder, likeFilled } from '../../styles/assets/icons/iconData';
import { likeThisPost, unlikeThisPost } from '../../services/firebase/firestore';
import { useAuthContext } from '../../contexts/authContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TweetProps from '../../types/tweetProps';

export default function Tweet({
  uid,
  /* username,
  userhandle,
  profile_pic, */
  /* imgLink,
  path, */
  content,
  comments,
  date,
  likes,
  _id,
}: TweetProps): JSX.Element {
  const { userProfile } = useAuthContext();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const { username, userhandle, profile_pic } = uid;
  const handleLike = (e: Event) => {
    e.preventDefault();
    /* if (liked) {
      void unlikeThisPost(userProfile?.userhandle, path);
      setLiked(!liked);
      setLikesCount((prev) => prev - 1);
    }
    if (!liked) {
      void likeThisPost(userProfile?.userhandle, path);
      setLiked(!liked);
      setLikesCount((prev) => prev + 1);
    } */
  };

  /* useEffect(() => {
    if (likes) {
      if (likes.includes(userProfile?.userhandle)) setLiked(true);
    }
  }, []); */

  return (
    <Link
      to={`/${userhandle}/p/${_id}`}
      state={{
        uid,
        /* username,
        userhandle, */
        content,
        // imgLink,
        date,
        likes,
        _id,
        liked,
        likesCount,
        // path,
      }}
    >
      <div className="flex flex-row px-[15px] pt-[11px] pb-[6px] border-b border-searchbar hover:bg-tweetHov">
        <Link to={`/${userhandle}`}>
          <div className="mr-[11px] hover:shadow-inverse rounded-full">
            <Avatar profile_pic={profile_pic} />
          </div>
        </Link>

        <div className="flex flex-col justify-center grow ">
          <div className="mb-[2px] flex flex-row justify-between leading-[19px]">
            <div>
              <Link to={`/${userhandle}`}>
                <span className="text-[14px] leading-[19px] font-bold hover:underline">{username} </span>
                <span className="text-[13px] leading-[19px] text-greyTxt">@{userhandle} ·</span>
              </Link>
              <span className="text-[13px] leading-[19px] text-greyTxt"> {convertToTimeSince(date)}</span>
            </div>
            <div>{moreNoBorder}</div>
          </div>

          <div className="text-[14px] leading-[19px]">
            <div>
              <div>
                <div>
                  <span>{content} </span>
                </div>
                {/* <div>
                  {imgLink ? (
                    <img
                      className="border-searchbar border-solid-[1px] rounded-2xl mt-[11px] h-[510px] w-[408px]"
                      src={imgLink}
                      alt=""
                    />
                  ) : (
                    <></>
                  )}
                </div> */}
              </div>
            </div>
          </div>

          <div className="mt-[11px] flex flex-row justify-between max-w-[510px]">
            <div className="flex fill-dark-500 cursor-pointer group">
              <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">
                {reply}
              </div>
              <span className="text-[12px] leading-[15px] px-[8px] pt-[8px] group-hover:text-blueLineHover">
                {comments.length}
              </span>
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
                  <span className="text-[12px] leading-[15px] px-[8px] pt-[8px] text-likesLineHover">{likesCount}</span>
                </div>
              ) : (
                <div className="flex fill-dark-500">
                  <div className="rounded-full p-[8px] group-hover:bg-likesHover group-hover:fill-likesLineHover">
                    {like}
                  </div>
                  <span className="text-[12px] leading-[15px] px-[8px] pt-[8px] group-hover:text-likesLineHover">
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
