import SignedInRSideMenu from '../../components/sidemenu/right/signedInRSideMenu';
import { useAuthContext } from '../../contexts/authContext';
import Avatar from '../../components/user/avatar';
import { useLocation } from 'react-router-dom';
import { htmlDecode, lastParam, showMonthDayAndYear, showTime } from '../../scripts/utils';
import { reply, retweet, like, likeFilled, views, share } from '../../styles/assets/icons/iconData';
import { useState, useEffect } from 'react';
import Tweet from '../../features/tweet';
import axios, { axiosPrivate } from '../../api/axios';
import { handleAxiosError } from '../../scripts/errorHandling';
import { TweetPopulatedCommentsProps } from '../../types/tweetProps';
import Reply from '../../features/reply';

export default function PostPg(): JSX.Element {
  const { userProfile } = useAuthContext();
  const location = useLocation();
  const postid = lastParam(location);
  const [postData, setPostData] = useState<TweetPopulatedCommentsProps>();
  const [thisLiked, setThisLiked] = useState(false);
  const [replies, setReplies] = useState([]);
  const [likesCount, setLikesCount] = useState(0);

  // fetch tweet with comments populated
  useEffect(() => {
    axios
      .get<{ data: TweetPopulatedCommentsProps }>(`/post/${postid}`)
      .then((res) => {
        setPostData(() => {
          return res.data;
        });
        setLikesCount(res.data.likes.length);
      })
      .catch((error) => {
        handleAxiosError(error);
      });
  }, []);

  // set liked if uid in liked array
  useEffect(() => {
    if (postData?.likes?.length) {
      if (postData?.likes.includes(userProfile?._id)) setThisLiked(true);
    }
  }, [postData]);

  const handleLike = () => {
    if (!thisLiked) {
      axiosPrivate
        .post('/post/like', {
          postid,
        })
        .then(() => {
          setThisLiked(!thisLiked);
          setLikesCount((prev) => prev + 1);
        })
        .catch((error) => {
          handleAxiosError(error);
        });
    }
    if (thisLiked) {
      axiosPrivate
        .delete('/post/like', {
          data: { postid },
        })
        .then(() => {
          setThisLiked(!thisLiked);
          setLikesCount((prev) => prev - 1);
        })
        .catch((error) => {
          handleAxiosError(error);
        });
    }
  };

  // get replies (firebase fn) => change to MAP replies ONLY
  useEffect(() => {
    const x = postData?.comments?.map((post) => {
      const decodedContent = htmlDecode(post.content);
      return (
        <Tweet
          key={post._id}
          id={post._id}
          uid={post.uid}
          content={decodedContent}
          // imgLink={''}
          date={post.date}
          likes={post.likes}
          comments={post.comments}
        />
      );
    });
    setReplies(() => {
      return x;
    });
  }, [postData]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-[600px]">
        {/* HEADER */}
        <div className="h-[50px] px-[15px]">
          <div className="h-full text-[19px] leading-[23px] font-bold flex items-center">
            <span>Post</span>
          </div>
        </div>
        {/* USER INFO */}
        <div className="flex pb-[4px] mt-[11px] mb-[4px] px-[15px]">
          <Avatar profile_pic={postData?.uid?.profile_pic || ''} />
          <div className="grow pl-3">
            <h1 className="font-bold text-[14px] leading-[19px]">{postData?.uid?.username}</h1>
            <h2 className="text-dark-500 text-[14px] leading-[19px]">@{postData?.uid?.userhandle}</h2>
          </div>
        </div>
        {/* POST CONTENT */}
        <div className="mt-[11px] text-[16px] leading-[23px] px-[15px]">{postData?.content}</div>
        {/* {imgLink ? <img className="rounded-2xl mt-[11px] mx-[15px]" src={imgLink} alt="" /> : <></>} */}
        {/* DATE POSTED */}
        <div className="py-[15px] text-[14px] leading-[19px] text-time px-[15px]">
          {showTime(postData?.date)} {showMonthDayAndYear(postData?.date)}
        </div>
        {/* ICON BAR */}
        <div className="px-[15px] border-b-[1px] border-t-[1px] border-searchbar mt-[2px] flex flex-row justify-around w-full">
          <div className="flex my-[5px] fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">{reply}</div>
            <span className="text-[12px] leading-[15px] px-[8px] pt-[8px] group-hover:text-blueLineHover">
              {postData?.comments?.length}
            </span>
          </div>
          <div className="my-[5px] fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-retweetHover group-hover:fill-retweetLineHover">
              {retweet}
            </div>
          </div>
          <div className="my-[5px] cursor-pointer group" role="button" tabIndex={0} onClick={() => handleLike()}>
            {thisLiked ? (
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
          <div className="my-[5px] fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">{views}</div>
          </div>
          <div className="my-[5px] fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">{share}</div>
          </div>
        </div>
        {/* ADD REPLY */}
        {postData && <Reply postid={postid} />}
        {/* REPLIES */}
        <div>{replies && replies}</div>
      </div>

      <div>
        <SignedInRSideMenu path="notifications" />
      </div>
    </div>
  );
}
