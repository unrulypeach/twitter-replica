import Header from '../../features/header';
import Post from '../../features/post';
import Tabbar from '../../features/tabbar';
import NoHome from '../../components/noContent/noHome';
import { useAuthContext } from '../../contexts/authContext';
import Tweet from '../../features/tweet';
import { useState, useEffect } from 'react';
import { getPosts } from '../../services/firebase/firestore';
import SignedInRSideMenu from '../../components/sidemenu/right/signedInRSideMenu';

export default function SignedInHome(): JSX.Element {
  const [posts, setPosts] = useState<JSX.Element[]>([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const { userProfile } = useAuthContext();
  useEffect(() => {
    const postz = async (): Promise<void> => {
      const userHandleOrError = userProfile?.userHandle ?? 'ERROR';
      if (userHandleOrError === 'ERROR') {
        return;
      }
      const dlPosts = await getPosts(userHandleOrError);
      const mappedPosts = dlPosts.map((post, i) => {
        return (
          <Tweet
            key={i}
            id={post.id}
            userName={userProfile?.userName ?? 'ERROR'}
            userHandle={userHandleOrError}
            userPic={userProfile?.photoURL ?? ''}
            text={post.content}
            imgLink={post.photoURL ?? ''}
            date={post.time}
            likes={post?.likes}
            path={post?.path}
          />
        );
      });
      setPosts(mappedPosts);
    };
    postz().catch(console.error);
    console.log('posts fetched');
  }, [userProfile?.userHandle, userProfile?.userName, shouldUpdate]);

  return (
    <div className="flex flex-row">
      <div className="border-r-[1px] border-r-searchbar">
        <div>
          <Header path="Home" />
        </div>

        <div>
          <Tabbar path="Home" />
        </div>

        <div>
          <Post setShouldUpdate={setShouldUpdate} />
        </div>

        <div>
          {/* need to fetch posts */}
          {posts || <NoHome />}
        </div>
      </div>

      <SignedInRSideMenu path="" />
    </div>
  );
}
