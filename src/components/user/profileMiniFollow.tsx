/* eslint-disable @typescript-eslint/restrict-plus-operands */
import Avatar from './avatar';
import { Link } from 'react-router-dom';
import FollowBtn from '../../features/followBtn';
import type { ShortUserProps } from '../../types/tweetProps';

export default function ProfileMiniFollow({ _id, username, userhandle, profile_pic }: ShortUserProps): JSX.Element {
  return (
    <>
      <Link to={'/' + userhandle}>
        <div className="flex justify-between items-center h-[69px] px-[15px] py-[11px]">
          <Avatar profile_pic={profile_pic || ''} />
          <div className="grow pl-3">
            <h1 className="font-bold text-[14px] leading-[19px]">{username ?? 'Default Default'}</h1>
            <h2 className="text-dark-500 text-[14px] leading-[19px]">{'@' + (userhandle ?? 'default')}</h2>
          </div>
          <FollowBtn uid={_id} />
        </div>
      </Link>
    </>
  );
}
