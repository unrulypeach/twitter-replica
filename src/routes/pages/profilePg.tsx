import Header from '../../features/header';
import SignedInRSideMenu from '../../components/sidemenu/right/signedInRSideMenu';
import Tabbar from '../../features/tabbar';
import Profile from '../../components/user/profile';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Tweet from '../../features/tweet';
import { pathWoBackslash, htmlDecode } from '../../scripts/utils';
import axios from '../../api/axios';
import { handleAxiosError } from '../../scripts/errorHandling';
import type UserProps from '../../types/userProps';
import type { ShortUserProps, TweetProps } from '../../types/tweetProps';
import { Types } from 'mongoose';

interface ProfilePosts {
  user: ShortUserProps;
  posts: Array<TweetProps>;
}

export default function ProfilePage(): JSX.Element {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const userParam = pathWoBackslash();
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [posts, setPosts] = useState<JSX.Element[]>([]);
  function deleteTweetFromState(postid: Types.ObjectId) {
    setPosts((prevPosts) => {
      return prevPosts.filter((item) => item.props._id !== postid);
    });
  }
  // get user
  useEffect(() => {
    setLoading(true);
    const userDataFetch = async () => {
      if (userParam) {
        try {
          setPosts([]);
          const fetchUser = await axios.get<UserProps>(`/user/${userParam}`);
          setUserData(() => fetchUser.data);
          setLoading(() => false);
        } catch (error) {
          handleAxiosError(error);
        }
      }
    };
    void userDataFetch();
  }, [userParam]);

  // get user posts
  useEffect(() => {
    setPostLoading(true);
    const postz = async () => {
      if (userData?.userhandle) {
        // const { userhandle, username } = userData;
        try {
          const postRes = await axios.get<ProfilePosts>(`/user/${userData?._id}/posts`);
          const { user, posts } = postRes.data;
          const x: Array<JSX.Element> = posts.map((post: TweetProps) => {
            const decodedContent = htmlDecode(post.content);
            return (
              <Tweet
                key={post._id}
                _id={post._id}
                uid={user}
                content={decodedContent}
                // imgLink={post?.profile_pic ?? ''}
                // path={post?.path}
                date={post.date}
                likes={post?.likes}
                comments={post?.comments}
                deleteTweet={deleteTweetFromState}
              />
            );
          });
          setPosts(() => x);
          setPostLoading(false);
        } catch (error) {
          handleAxiosError(error);
        }
      }
    };
    void postz();
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
            <>
              {!userData ? <p>THIS ACCOUNT DOES NOT EXIST</p> : <Profile data={userData} setUserData={setUserData} />}
            </>
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
