import { follow, unfollow } from '../../services/firebase/firestore';

export default function FollowBtn({ currUser, userHandle, status, setStatus }): JSX.Element {
  // check if following already
  const unfollowBtn = (): JSX.Element => {
    return (
      <button
        className="bg-black min-w-[30px] min-h-[30px] flex px-[15px] ml-11px rounded-full"
        onClick={(e) => {
          e.preventDefault();
          void unfollow(currUser, userHandle);
          setStatus((prev) => !prev);
        }}
      >
        <div className="btn-follow">
          {/* on hover switch words to Unfollow */}
          <span>Following</span>
        </div>
      </button>
    );
  };

  const followBtn = (): JSX.Element => {
    return (
      <button
        className="bg-black min-w-[30px] min-h-[30px] flex px-[15px] ml-11px rounded-full"
        onClick={(e) => {
          e.preventDefault();
          if (currUser && userHandle) void follow(currUser, userHandle);
          setStatus((prev) => !prev);
        }}
      >
        <div className="btn-follow">
          <span>Follow</span>
        </div>
      </button>
    );
  };

  return status ? unfollowBtn() : followBtn();
}

// following ? <Follow/> : <Unfollow/>
