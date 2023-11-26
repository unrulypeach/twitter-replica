import Header from '../../features/header';
import Post from '../../features/post';
import Tabbar from '../../features/tabbar';
import NoHome from '../../components/noContent/noHome';
import { useAuthContext } from '../../contexts/authContext';
import Tweet from '../../features/tweet';
import { useState, useEffect } from 'react';
import { getHomePosts } from '../../services/firebase/firestore';
import SignedInRSideMenu from '../../components/sidemenu/right/signedInRSideMenu';
import axios from '../../api/axios';

export default function SignedInHome(): JSX.Element {
  const [posts, setPosts] = useState<JSX.Element[]>([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const { userProfile } = useAuthContext();
  useEffect(() => {
    const postz = async (): Promise<void> => {
      // const userhandleOrError = userProfile?.userhandle ?? 'ERROR';
      if (!userProfile?.userhandle) {
        return;
      }
      // const dlPosts = await getHomePosts();
      try {
        const postRes = await axios.get('/post/homepage');
        const mappedPosts = postRes.data.map((post) => {
          return (
            <Tweet
              key={post._id}
              id={post._id}
              username={post?.username}
              userhandle={post?.userhandle}
              userPic={post?.userPic ?? ''}
              text={post.content}
              imgLink={post?.profile_pic ?? ''}
              date={post.date}
              likes={post?.likes.length}
              path={post?.path}
            />
          );
        });
        setPosts(mappedPosts);
        console.log('home posts fetched:', postRes);
      } catch (err) {
        console.error(err);
      }
    };
    postz().catch(console.error);
  }, [userProfile?.userhandle, userProfile?.username, shouldUpdate]);

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
