import { useState, useEffect } from 'react';
import { handleAxiosError } from '../../scripts/errorHandling';
import useAxiosPrivate from '../../hooks/useAxiosInterceptors';
import useAuthContext from '../../hooks/useAuthContext';

export default function FollowBtn({ uid }): JSX.Element {
  const { userProfile } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();
  const [status, setStatus] = useState();

  // is user following
  useEffect(() => {
    if (userProfile) {
      axiosPrivate
        .post('/following', { account: uid })
        .then((res) => {
          setStatus(res.data);
        })
        .catch((error) => handleAxiosError(error));
    }
  }, [uid]);

  const unfollowBtn = (): JSX.Element => {
    return (
      <button
        className="bg-white border-[1px] border-greyBorder min-w-[30px] min-h-[30px] flex px-[15px] ml-11px rounded-full group hover:border-likesLineHover"
        onClick={(e) => {
          e.preventDefault();
          axiosPrivate
            .delete('/follow', {
              data: { account: uid },
            })
            .then(() => {
              setStatus((prev) => !prev);
            })
            .catch((error) => {
              handleAxiosError(error);
            });
        }}
      >
        <div className="btn-unfollow w-[65px]">
          {/* on hover switch words to Unfollow */}
          <span className="group-hover:hidden">Following</span>
          <span className="hidden group-hover:block text-likesLineHover">Unfollow</span>
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
          axiosPrivate
            .post('/follow', {
              account: uid,
            })
            .then(() => {
              setStatus((prev) => !prev);
            })
            .catch((error) => {
              handleAxiosError(error);
            });
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
