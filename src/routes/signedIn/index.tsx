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
import TweetProps from '../../types/tweetProps';

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
        const postRes = await axios.get<TweetProps[]>('/post/homepage');
        const mappedPosts: Array<JSX.Element> = postRes.data.map((post: TweetProps) => {
          return (
            <Tweet
              key={post._id}
              _id={post._id}
              uid={post.uid}
              content={post.content}
              /* username={post?.uid.username}
              userhandle={post?.uid.userhandle}
              userPic={post?.userPic ?? ''} */
              // imgLink={post?.profile_pic ?? ''}
              // path={post?.path}
              date={post.date}
              likes={post?.likes}
              comments={post?.comments}
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
