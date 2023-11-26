import type WhoToFollowProps from '../../types/followrecProps';
import uniqid from 'uniqid';
import ProfileMiniFollow from '../../components/user/profileMiniFollow';

export default function WhoToFollow({ suggestions }: WhoToFollowProps): JSX.Element {
  // const [userDataState, setUserDataState] = useState({
  //   username: "",
  //   userhandle: "",
  // });

  // useEffect(() => {
  //   async function getUser(): Promise<void> {
  //     const user = await getUserProfile(userhandle);
  //     const userData = user.data();
  //     console.log(userData);
  //     if (!cancelled) {
  //       setUserDataState(userData);
  //     }
  //   }
  //   let cancelled = false;

  //   void getUser();
  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);

  return (
    <div className="flex flex-col bg-dark-800 rounded-[16px] mb-[15px]">
      <div className="px-[15px] py-[11px]">
        <span className="text-[19px] leading-[23px] font-bold">Who to follow</span>
      </div>
      {suggestions?.map((x) => (
        <ProfileMiniFollow
          key={uniqid()}
          username={x.username}
          userhandle={x.userhandle}
          // profile_pic={x.profile_pic}
        />
      ))}
      <div>
        <div className="p-[15px]">
          <span className="text-[14px] leading-[19px] text-blue cursor-pointer">Show more</span>
        </div>
      </div>
    </div>
  );
}
