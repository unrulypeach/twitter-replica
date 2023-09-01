import MenuItem from './menuitem';
import { explore, setting } from '../../../styles/assets/icons/iconData';

export default function SignedOutLSideMenu(): JSX.Element {
  return (
    <div className="border-r-[1px] border-searchbar med:left-0 h-full w-[200px] med:w-[88px] px-[8x] flex flex-col justify-between med:items-center">
      <div>
        <MenuItem title="Explore" iconData={explore} />
        <MenuItem title="Settings" iconData={setting} />
      </div>
    </div>
  );
}
