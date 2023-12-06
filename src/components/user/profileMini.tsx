import Avatar from './avatar';
import { moreNoBorder } from '../../styles/assets/icons/iconData';
import { useAuthContext } from '../../contexts/authContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleAxiosError } from '../../scripts/errorHandling';
import useAxiosPrivate from '../../hooks/useAxiosInterceptors';

export default function ProfileMini(): JSX.Element {
  const axiosPrivate = useAxiosPrivate();
  const { userProfile, setUserProfile } = useAuthContext();
  const [popped, setPopped] = useState(false);
  const handleSubmit = async () => {
    try {
      const res = await axiosPrivate.post('/logout');
      if (res.status === 200) {
        localStorage.removeItem('token');
        setUserProfile(() => {});
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const LogoutPopup = (): JSX.Element => {
    return (
      <Link
        to="/"
        className="w-[270px] fixed bottom-[79px] z-10"
        onClick={() => {
          handleSubmit();
        }}
      >
        <div className="shadow-reg rounded-[14px] py-[22px] px-[15px] cursor-pointer">
          <span className="text-[14px] leading-[19px] font-bold">Log out @{userProfile?.userhandle}</span>
        </div>
      </Link>
    );
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className="my-[11px] w-[255px] h-[69px] flex rounded-full cursor-pointer hover:bg-blackHov"
        onClick={() => {
          setPopped(!popped);
        }}
      >
        <div className="flex grow justify-between items-center p-[11px]">
          <Avatar profile_pic={userProfile?.profile_pic} />
          <div className="grow pl-3">
            <h1 className="font-bold text-[14px] leading-[19px]">{userProfile?.username}</h1>
            <h2 className="text-dark-500 text-[14px] leading-[19px]">@{userProfile?.userhandle}</h2>
          </div>
          <div className="flex flex-col grow items-end">{moreNoBorder}</div>
        </div>
      </div>
      {popped ? <LogoutPopup /> : <></>}
    </>
  );
}
