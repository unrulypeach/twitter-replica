import Header from "../../features/header";
import SignedInRSideMenu from "../../components/sidemenu/right/signedInRSideMenu";
import Tabbar from "../../features/tabbar";
import Profile from "../../components/user/profile";
import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../../services/firebase/firestore";
import Tweet from "../../features/tweet";
import { pathWoBackslash } from "../../scripts/utils";

export default function ProfilePage(): JSX.Element {
  const loaderData = useLoaderData();
  const [posts, setPosts] = useState<JSX.Element[]>([]);
  const userData = loaderData.data();
  const noUser = pathWoBackslash().toLowerCase();

  useEffect(() => {
    if (userData?.userHandle) {
      const { userHandle, userName } = userData;
      const postz = async (): Promise<void> => {
        const dlPosts = await getPosts(userHandle);
        const x = dlPosts.map((post, i) => {
          return (
            <Tweet
              key={i}
              userName={userName}
              userHandle={userHandle}
              text={post.content}
              imgLink={""}
              date={post.time}
            />
          );
        });
        setPosts(x);
        postz().catch(console.error);
        console.log("posts fetched");
      };
    }
  }, [loaderData]);

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
