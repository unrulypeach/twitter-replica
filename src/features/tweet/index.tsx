import Avatar from '../../components/user/avatar';
import { convertToTimeSince } from '../../scripts/utils';
import { reply, retweet, like, views, share, moreNoBorder, likeFilled } from '../../styles/assets/icons/iconData';
import useAuthContext from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { TweetProps } from '../../types/tweetProps';
import useAxiosPrivate from '../../hooks/useAxiosInterceptors';
import { handleAxiosError } from '../../scripts/errorHandling';
import DeletePost from '../deletePost';

export default function Tweet({
  uid,
  /* imgLink,
  path, */
  content,
  comments,
  date,
  likes,
  _id,
  deleteTweet,
}: TweetProps): JSX.Element {
  const axiosPrivate = useAxiosPrivate();
  const { userProfile } = useAuthContext();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [showDelete, setShowDelete] = useState(false);
  const { username, userhandle, profile_pic } = uid;
  const handleLike = (e: Event) => {
    e.preventDefault();
    // const controller = new AbortController();
    if (!liked) {
      axiosPrivate
        .post('/post/like', {
          // signal: controller.signal,
          postid: _id,
        })
        .then(() => {
          setLiked(!liked);
          setLikesCount((prev) => prev + 1);
        })
        .catch((error) => {
          handleAxiosError(error);
        });
    }
    if (liked) {
      axiosPrivate
        .delete('/post/like', {
          data: { postid: _id },
        })
        .then(() => {
          setLiked(!liked);
          setLikesCount((prev) => prev - 1);
        })
        .catch((error) => {
          handleAxiosError(error);
        });
    }
  };

  useEffect(() => {
    if (likes) {
      if (likes.includes(userProfile?._id)) setLiked(true);
    }
  }, []);

  return (
    <Link to={`/${userhandle}/p/${_id}`}>
      <div className="flex flex-row px-[15px] pt-[11px] pb-[6px] border-b border-searchbar hover:bg-tweetHov">
        <Link to={`/${userhandle}`}>
          <div className="mr-[11px] hover:shadow-inverse rounded-full">
            <Avatar profile_pic={profile_pic} />
          </div>
        </Link>

        <div className="flex flex-col justify-center grow relative">
          <div className="mb-[2px] flex flex-row justify-between leading-[19px]">
            <div>
              <Link to={`/${userhandle}`}>
                <span className="text-[14px] leading-[19px] font-bold hover:underline">{username} </span>
                <span className="text-[13px] leading-[19px] text-greyTxt">@{userhandle} ·</span>
              </Link>
              <span className="text-[13px] leading-[19px] text-greyTxt"> {convertToTimeSince(date)}</span>
            </div>
            <div className="inline-flex group">
              <button
                className="absolute right-[-7px] top-[-4px] rounded-full group-hover:bg-blueHover"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDelete(() => true);
                }}
              >
                <div className="flex justify-center items-center w-[30px] h-[30px] fill-greyTxt group-hover:fill-blueLineHover">
                  {moreNoBorder}
                </div>
              </button>
            </div>
          </div>

          {uid._id === userProfile?._id ? (
            showDelete && <DeletePost postid={_id} setShowDelete={setShowDelete} deleteTweet={deleteTweet} />
          ) : (
            <></>
          )}

          <div className="text-[14px] leading-[19px]">
            <div>
              <div>
                <div>
                  <span>{content} </span>
                </div>
                {/* TODO: <div>
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
