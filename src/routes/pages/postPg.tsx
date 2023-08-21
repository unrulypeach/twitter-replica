import SignedInRSideMenu from '../../components/sidemenu/right/signedInRSideMenu';
import { useAuthContext } from '../../contexts/authContext';
import Avatar from '../../components/user/avatar';
import { useLocation } from 'react-router-dom';
import { showMonthDayAndYear, showTime } from '../../scripts/utils';
import { reply, retweet, like, likeFilled, views, share } from '../../styles/assets/icons/iconData';
import { useRef, useState, useEffect } from 'react';
import { getReplies, likeThisPost, postReply, unlikeThisPost } from '../../services/firebase/firestore';
import Tweet from '../../features/tweet';

export default function PostPg(): JSX.Element {
  const { userProfile } = useAuthContext();
  const location = useLocation();
  const { userName, userHandle, text, imgLink, date, likes, id, liked, likesCount } = location.state;
  const [thisLiked, setThisLiked] = useState(liked);
  const [thisLikesCount, setThisLikesCount] = useState(likesCount);
  const textareaRef = useRef(null);
  const [currentValue, setCurrentValue] = useState('');

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

  const handleSubmitReply = () => {
    void postReply(userProfile?.userHandle, userHandle, id, currentValue).then(setCurrentValue(''));
  };

  const [replies, setReplies] = useState([]);

  useEffect(() => {
    textareaRef.current.style.height = '0px';
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
  }, [currentValue]);

  useEffect(() => {
    if (id) {
      const replies = async () => {
        const dlReplies = await getReplies(userHandle, id);
        const x = dlReplies.map((post) => {
          return (
            <Tweet
              key={id}
              id={post?.id}
              userName={''}
              userHandle={post?.userHandle}
              text={post?.content}
              imgLink={''}
              date={post?.time}
              likes={post?.likes}
            />
          );
        });
        setReplies(() => x);
      };
      replies().catch(console.error);
    }
  }, []);

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
          <Avatar photoURL={userProfile?.photoURL} />
          <div className="grow pl-3">
            <h1 className="font-bold text-[14px] leading-[19px]">{userName}</h1>
            <h2 className="text-dark-500 text-[14px] leading-[19px]">@{userHandle}</h2>
          </div>
        </div>
        {/* POST CONTENT */}
        <div className="mt-[11px] text-[16px] leading-[23px] px-[15px]">{text}</div>
        {/* DATE POSTED */}
        <div className="py-[15px] text-[14px] leading-[19px] text-time px-[15px]">
          {showTime(date)} {showMonthDayAndYear(date)}
        </div>
        {/* ICON BAR */}
        <div className="px-[15px] border-b-[1px] border-t-[1px] border-searchbar mt-[2px] flex flex-row justify-around w-full">
          <div className="my-[5px] fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">{reply}</div>
          </div>
          <div className="my-[5px] fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-retweetHover group-hover:fill-retweetLineHover">
              {retweet}
            </div>
          </div>
          <div className="my-[5px] cursor-pointer group" role="button" tabIndex={0} onClick={(e) => handleLike(e)}>
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
          <div className="my-[5px] fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">{views}</div>
          </div>
          <div className="my-[5px] fill-dark-500 cursor-pointer group">
            <div className="rounded-full p-[8px] group-hover:bg-blueHover group-hover:fill-blueLineHover">{share}</div>
          </div>
        </div>
        {/* ADD REPLY */}
        <div className="px-[15px] flex items-center py-[14px] border-b-[1px] border-searchbar">
          <div className="mr-[11px]">
            <Avatar photoURL={userProfile?.photoURL} />
          </div>
          <label className="grow py-[11px]">
            <textarea
              className="w-full resize-none focus:outline-none"
              placeholder="Post your reply!"
              ref={textareaRef}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
            />
          </label>
          <button
            onClick={handleSubmitReply}
            className="h-[34px] ml-[11px] px-[15px] rounded-full text-[14px] leading-[10px] font-bold text-white bg-blue"
          >
            Reply
          </button>
        </div>
        {/* REPLIES */}
        <div>{replies && replies}</div>
      </div>

      <div>
        <SignedInRSideMenu path="notifications" />
      </div>
    </div>
  );
}
