import type HeaderProps from '../../../types/headerProps';
import Searchbar from '../../../features/searchbar';
import News from '../../../features/news';
import WhoToFollow from '../../../features/followrec';
import Tos from '../../../features/tos';
import { userA, userB } from '../../../data/demoUsers';

export default function SignedInRSideMenu({ path }: HeaderProps): JSX.Element {
  return path === 'explore' ? (
    <div className="pl-5 pt-[11px] pb-[61px] flex flex-col max-w-[350px] min-h-screen maxRmenu:hidden">
      <div>
        <WhoToFollow suggestions={[userA, userB]} />
      </div>

      <Tos />
    </div>
  ) : (
    <div className="pl-5 pt-[11px] pb-[61px] flex flex-col max-w-[350px] min-h-screen maxRmenu:hidden">
      <div>
        <Searchbar />
      </div>

      <div>
        <News />
      </div>

      <div>
        <WhoToFollow suggestions={[userA, userB]} />
      </div>

      <div>
        <Tos />
      </div>
    </div>
  );
}
