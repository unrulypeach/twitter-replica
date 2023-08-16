import { follow } from "../../services/firebase/firestore";

export default function FollowBtn({ currUser, userHandle }): JSX.Element {
  // check if following already
  function unfollowBtn(): JSX.Element {
    return (
      <button className="bg-black min-w-[30px] min-h-[30px] flex px-[15px] ml-11px rounded-full">
        <div>
          <span>Following</span>
        </div>
      </button>
    );
  }

  function followBtn(): JSX.Element {
    return (
      <button
        className="bg-black min-w-[30px] min-h-[30px] flex px-[15px] ml-11px rounded-full"
        onClick={(e) => {
          e.preventDefault();
          if (currUser && userHandle) void follow(currUser, userHandle);
        }}
      >
        <div className="btn-follow">
          <span>Follow</span>
        </div>
      </button>
    );
  }

  return followBtn();
}

// following ? <Follow/> : <Unfollow/>
