import WhoToFollow from '../../features/followrec';
import Header from '../../features/header';
import Post from '../../features/post';
import Searchbar from '../../features/searchbar';
import News from '../../features/news';
import Tabbar from '../../features/tabbar';
import Tos from '../../features/tos';
import { userA, userB } from '../../data/demoUsers';
import NoHome from '../../components/noContent/noHome';
import { useAuthContext } from '../../contexts/authContext';
import Tweet from '../../features/tweet';
import { useState, useEffect } from 'react';
import { getPosts } from '../../services/firebase/firestore';

export default function SignedInHome(): JSX.Element {
  const [posts, setPosts] = useState<JSX.Element[]>([]);

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
            imgLink={post.imgLink ?? ''}
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
  }, [userProfile?.userHandle, userProfile?.userName]);

  return (
    <div className="flex flex-row">
      <div>
        <div>
          <Header path="Home" />
        </div>

        <div>
          <Tabbar path="Home" />
        </div>

        <div>
          <Post setPosts={setPosts} />
        </div>

        <div>
          {/* need to fetch posts */}
          {posts || <NoHome />}
        </div>
      </div>

      <div className="pl-5 pt-[11px] pb-[61px] flex flex-col border-l-[1px] border-searchbar max-w-[350px] min-h-screen">
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
    </div>
  );
}
