import Header from '../../features/header';
import SignedInRSideMenu from '../../components/sidemenu/right/signedInRSideMenu';
import Tabbar from '../../features/tabbar';
import Profile from '../../components/user/profile';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPosts, getUserProfile } from '../../services/firebase/firestore';
import Tweet from '../../features/tweet';
import { pathWoBackslash } from '../../scripts/utils';
import type { DocumentData } from 'firebase/firestore';

export default function ProfilePage(): JSX.Element {
  // const loaderData = useLoaderData();
  // const userData = loaderData.data();
  const [userData, setUserData] = useState<DocumentData | undefined>(null);
  const noUser = pathWoBackslash().toLowerCase();

  // const userData = userDataFetch.data();
  const [posts, setPosts] = useState<JSX.Element[]>([]);

  // get user
  useEffect(() => {
    const userDataFetch = async () => {
      if (noUser) {
        const fetchUser = await getUserProfile(noUser);
        const usersData = fetchUser.data();
        setUserData(() => usersData);
      }
    };
    userDataFetch().catch(console.error);
  }, [noUser]);

  // get user posts
  useEffect(() => {
    if (userData?.userHandle) {
      const { userHandle, userName } = userData;
      const postz = async (): Promise<void> => {
        const dlPosts = await getPosts(userHandle);
        console.log(dlPosts);
        const x = dlPosts.map((post, i) => {
          return (
            <Tweet
              key={i}
              id={post.id}
              userName={userName}
              userHandle={userHandle}
              text={post.content}
              imgLink={''}
              date={post.time}
              likes={post?.likes}
            />
          );
        });
        setPosts(() => x);
      };
      postz().catch(console.error);
      console.log('posts fetched');
    }
  }, [userData]);

  return (
    <>
      <div className="flex flex-row">
        <div className="max-w-[600px] w-full shrink-0">
          <div>
            <Header path="Profile" />
          </div>

          <div>{userData ? <Profile data={userData} /> : `@${noUser}`}</div>

          {userData && (
            <div>
              <Tabbar path="" />
            </div>
          )}

          {!userData && <p>THIS ACCOUNT DOESNT EXIST</p>}

          {posts && posts}
        </div>

        <div>
          <SignedInRSideMenu path="" />
        </div>
      </div>
      <Outlet />
    </>
  );
}
