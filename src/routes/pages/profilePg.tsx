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
import { useAuthContext } from '../../contexts/authContext';

export default function ProfilePage(): JSX.Element {
  const { userProfile } = useAuthContext();
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const noUser = pathWoBackslash().toLowerCase();
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [posts, setPosts] = useState<JSX.Element[]>([]);

  // get user
  useEffect(() => {
    setLoading(true);
    const userDataFetch = async () => {
      if (noUser) {
        setPosts([]);
        const fetchUser = await getUserProfile(noUser);
        setUserData(() => fetchUser);
        setLoading(() => false);
      }
    };
    userDataFetch().catch(console.error);
  }, [noUser, userProfile]);

  // get user posts
  useEffect(() => {
    setPostLoading(true);
    if (userData?.userHandle) {
      const { userHandle, userName } = userData;
      const postz = async (): Promise<void> => {
        const dlPosts = await getPosts(userHandle);
        const x = dlPosts.map((post, i) => {
          return (
            <Tweet
              key={i}
              id={post.id}
              userName={userName}
              userHandle={userHandle}
              userPic={post?.userPic ?? ''}
              text={post.content}
              imgLink={post.photoURL ?? ''}
              date={post.time}
              likes={post?.likes}
              path={post?.path}
            />
          );
        });
        setPosts(() => x);
        setPostLoading(false);
      };
      postz().catch(console.error);
      console.log('posts fetched');
    }
  }, [userData]);

  return (
    <>
      <div className="flex flex-row">
        <div className="w-[600px] shrink-1 border-r-[1px] border-r-searchbar">
          <div>
            <Header path="Profile" />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-[415px]">
              <div className="loader" />
            </div>
          ) : (
            <>{!userData ? <p>THIS ACCOUNT DOES NOT EXIST</p> : <Profile data={userData} setData={setUserData} />}</>
          )}

          {userData && (
            <div>
              <Tabbar path="" />
            </div>
          )}

          {postLoading ? (
            <div className="flex justify-center pt-[40px]">
              <div className="loader" />
            </div>
          ) : (
            <>
              {posts.length > 0 ? (
                posts
              ) : (
                <div className="flex justify-center p-[28px] text-dark-600">
                  <p>No tweets yet.</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="sticky top-0 self-start">
          <SignedInRSideMenu path="" />
        </div>
      </div>
      <Outlet />
    </>
  );
}
