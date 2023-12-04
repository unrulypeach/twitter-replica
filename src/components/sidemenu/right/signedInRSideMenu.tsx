import type HeaderProps from '../../../types/headerProps';
import Searchbar from '../../../features/searchbar';
import News from '../../../features/news';
import WhoToFollow from '../../../features/followrec';
import Tos from '../../../features/tos';
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import { handleAxiosError } from '../../../scripts/errorHandling';
import { ShortUserProps } from '../../../types/tweetProps';

export default function SignedInRSideMenu({ path }: HeaderProps): JSX.Element {
  const [reccList, setReccList] = useState<ShortUserProps[]>([]);
  // fetch users
  useEffect(() => {
    Promise.all([axios.get('/user/BobRoss/short'), axios.get('/user/manenextdoor/short')])
      .then((res) => {
        const mappedRes = res.map((element) => {
          return element.data;
        });
        console.log(mappedRes);
        setReccList(mappedRes);
      })
      .catch((error) => handleAxiosError(error));
  }, []);

  return path === 'explore' ? (
    <div className="pl-5 pt-[11px] pb-[61px] flex flex-col max-w-[350px] min-h-screen maxRmenu:hidden">
      <div>
        <WhoToFollow suggestions={reccList} />
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
        <WhoToFollow suggestions={reccList} />
      </div>

      <div>
        <Tos />
      </div>
    </div>
  );
}
