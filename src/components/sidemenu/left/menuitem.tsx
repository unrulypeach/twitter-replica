import type IconProps from '../../../types/iconProps';
import { Link } from 'react-router-dom';
import { pathWoBackslash } from '../../../scripts/utils';
import { useAuthContext } from '../../../contexts/authContext';

export default function MenuItem({ title, iconData, filledIcon }: IconProps): JSX.Element {
  let lcTitle = title.toLowerCase();
  const location = pathWoBackslash().toLowerCase() || 'home';
  const { userProfile } = useAuthContext();

  if (lcTitle === 'profile') {
    if (userProfile?.userhandle) lcTitle = userProfile?.userhandle;
  }

  function Selected(): JSX.Element {
    return (
      <Link to={lcTitle === 'home' ? '/' : lcTitle} className="flex cursor-pointer py-[4px]">
        <div className="flex flex-row justify-center p-[11px] hover:bg-blackHov rounded-full">
          <div className="h-[24.5px] w-[24.5px]">{filledIcon}</div>
          <div className="text-[18px] leading-[23px] ml-[19px] mr-[15px] med:hidden">
            <span className="font-bold">{title}</span>
          </div>
        </div>
      </Link>
    );
  }

  function Unselected(): JSX.Element {
    return (
      <Link to={lcTitle === 'home' ? '/' : lcTitle} className="flex cursor-pointer py-[4px]">
        <div className="flex flex-row justify-center p-[11px] hover:bg-blackHov rounded-full">
          <div className="h-[24.5px] w-[24.5px]">{iconData}</div>
          <div className="text-[18px] leading-[23px] ml-[19px] mr-[15px] med:hidden">
            <span>{title}</span>
          </div>
        </div>
      </Link>
    );
  }
  return location === lcTitle ? <Selected /> : <Unselected />;
}
