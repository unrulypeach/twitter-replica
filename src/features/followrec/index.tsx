import type WhoToFollowProps from '../../types/followrecProps';
import ProfileMiniFollow from '../../components/user/profileMiniFollow';
import { ShortUserProps } from '../../types/tweetProps';

export default function WhoToFollow({ suggestions }: WhoToFollowProps): JSX.Element {
  return (
    <div className="flex flex-col bg-dark-800 rounded-[16px] mb-[15px]">
      <div className="px-[15px] py-[11px]">
        <span className="text-[19px] leading-[23px] font-bold">Who to follow</span>
      </div>
      {suggestions?.map((x: ShortUserProps) => {
        return (
          <ProfileMiniFollow key={x._id} username={x.username} userhandle={x.userhandle} profile_pic={x.profile_pic} />
        );
      })}
      <div>
        <div className="p-[15px]">
          <span className="text-[14px] leading-[19px] text-blue cursor-pointer">Show more</span>
        </div>
      </div>
    </div>
  );
}
