import Header from '../../features/header';
import Post from '../../features/post';
import Tabbar from '../../features/tabbar';
import NoHome from '../../components/noContent/noHome';
import { useAuthContext } from '../../contexts/authContext';
import Tweet from '../../features/tweet';
import { useState, useEffect } from 'react';
import SignedInRSideMenu from '../../components/sidemenu/right/signedInRSideMenu';
import axios from '../../api/axios';
import type { TweetProps } from '../../types/tweetProps';

export default function SignedInHome(): JSX.Element {
  const [posts, setPosts] = useState<JSX.Element[]>([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const { userProfile } = useAuthContext();
  useEffect(() => {
    const postz = async (): Promise<void> => {
      if (!userProfile?.userhandle) {
        return;
      }
      try {
        const postRes = await axios.get<TweetProps[]>('/post/homepage');
        const mappedPosts: Array<JSX.Element> = postRes.data.map((post: TweetProps) => {
          return (
            <Tweet
              key={post._id}
              _id={post._id}
              uid={post.uid}
              content={post.content}
              // imgLink={post?.profile_pic ?? ''}
              // path={post?.path}
              date={post.date}
              likes={post?.likes}
              comments={post?.comments}
            />
          );
        });
        setPosts(mappedPosts);
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
