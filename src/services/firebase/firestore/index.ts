import {
  getDoc,
  doc,
  collection,
  getCountFromServer,
  type DocumentSnapshot,
  type DocumentData,
  query,
  collectionGroup,
  where,
  addDoc,
  getDocs,
  setDoc,
  Timestamp,
  orderBy,
  limit,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';
import { db, storage } from '../../../configs/firebase-config';
import { StringFormat, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

/* 
  PROFILE AND FOLLOW FUNCTIONS
*/

export async function getUserProfile(params: string): Promise<DocumentSnapshot<DocumentData>> {
  const userProfileRef = collection(db, 'user-profiles');

  const userQuery = query(userProfileRef, where('userhandle', '==', params));
  const userSnap = await getDocs(userQuery);
  const result = [];
  userSnap.forEach((doc) => {
    result.push(doc.data());
  });
  return result[0];
}

export async function getUserProfileByUid(uid: string) {
  const userRef = collection(db, 'user-profiles');

  const userQuery = query(userRef, where('uid', '==', uid));
  const userSnap = await getDocs(userQuery);
  const result = [];
  userSnap.forEach((doc) => {
    result.push(doc.data());
    console.log(doc.id, '=>', doc.data());
  });
  return result;
}

export async function getUserFollowing(params: string): Promise<number> {
  const userFollowingCollection = collection(db, 'follows', params, 'following');
  const snapshot = await getCountFromServer(userFollowingCollection);
  return snapshot.data().count;
}

// TODO: this should eventually become a cloud function and the number should
// be updated to user-profiles/{userhandle} doc
export async function getUserFollowers(params: string): Promise<Array<string>> {
  const userQuery = query(collectionGroup(db, 'following'), where('userhandle', '==', params));
  const querySnapshot = await getDocs(userQuery);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.ref.parent.parent.id);
  });
  return data;
  // return querySnapshot;
  /* const userQuerySnapshot = await getCountFromServer(userQuery);
  return userQuerySnapshot.data().count; */
}

export async function follow(currUser: string, params: string): Promise<void> {
  const today = await getFirestoreTime();
  const userRef = doc(db, `follows/${currUser}`);
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const userFollowRef = doc(db, `follows/${currUser}/following/${params}`);

  getDoc(userRef)
    .then((theDoc) => {
      if (theDoc.exists()) {
        void setDoc(userFollowRef, { userhandle: params, date: today });
      } else {
        // TODO:
        // - create doc under user
        void setDoc(doc(db, 'follows', currUser), {});
        // - then create follow
        void setDoc(userFollowRef, { userhandle: params, date: today });
      }
    })
    .catch((error) => {
      console.error(error.code);
    });
}

export async function unfollow(currUser: string, forUser: StringFormat): Promise<void> {
  const followDoc = doc(db, `follows/${currUser}/following/${forUser}`);
  await deleteDoc(followDoc);
}

/* 
  POST FUNCTIONS
*/

export async function post(
  currUser: string,
  username: string,
  userPic: string | undefined,
  content: string | undefined,
  photoFile?: File | Array<File>,
): Promise<void> {
  const now = await getFirestoreTime();
  const userPostsColl = collection(db, `posts/${currUser}/user-posts`);
  const colCount = await getCountFromServer(userPostsColl);
  const seqNum = colCount.data().count;
  const profile_pic = photoFile ? await uploadPostPhoto(currUser, photoFile) : null;
  const postData = profile_pic
    ? userPic
      ? {
          userhandle: currUser,
          username,
          userPic,
          time: now,
          content,
          seq: seqNum,
          likes: [],
          profile_pic,
        }
      : {
          userhandle: currUser,
          username,
          time: now,
          content,
          seq: seqNum,
          likes: [],
          profile_pic,
        }
    : userPic
    ? {
        userhandle: currUser,
        username,
        userPic,
        time: now,
        content,
        seq: seqNum,
        likes: [],
      }
    : {
        userhandle: currUser,
        username,
        time: now,
        content,
        seq: seqNum,
        likes: [],
      };
  addDoc(userPostsColl, postData).catch((error) => {
    console.error(error.code);
  });
}

export async function uploadPostPhoto(user: string, file: File): Promise<string> {
  const newImageRef = ref(storage, `${user}/${file.name}`);
  await uploadBytesResumable(newImageRef, file);

  const publicImageUrl = await getDownloadURL(newImageRef);
  return publicImageUrl;
}

// fetch 10 recent posts for specific user
export async function getPosts(currUser: string, quantity?: number): Promise<any[]> {
  const userPostsColl = collection(db, `posts/${currUser}/user-posts`);
  const quer = query(userPostsColl, orderBy('seq', 'desc'), limit(quantity ?? 10));

  const querSnap = await getDocs(quer);
  const posts = [];
  querSnap.forEach((doc) => {
    posts.push({ id: doc.id, path: doc.ref.path, ...doc.data() });
  });
  return posts;
  // querSnap.map((doc) => {{id: doc.id, ...doc.data()}})
}

// TODO: fetch more posts
// export async function getMorePosts(){};

export async function getHomePosts() {
  const postColl = collectionGroup(db, 'user-posts');
  const quer = query(postColl, orderBy('time'), limit(10));

  const querSnap = await getDocs(quer);
  const posts = [];
  querSnap.forEach((doc) => {
    posts.push({ id: doc.id, path: doc.ref.path, ...doc.data() });
  });
  return posts;
}

export async function postReply(
  currUserhandle: string,
  currUsername: string,
  postUser: string,
  postId: string,
  reply: string,
) {
  const now = await getFirestoreTime();
  const postRef = collection(db, `posts/${postUser}/user-posts/${postId}/comments`);
  const docRef = await addDoc(postRef, {
    userhandle: currUserhandle,
    username: currUsername,
    content: reply,
    time: now,
    likes: [],
  });
}

export async function getReplies(postUser: string, postId: string) {
  const postQuery = await getDocs(collection(db, `posts/${postUser}/user-posts/${postId}/comments`));
  const replies = [];
  postQuery.forEach((doc) => {
    replies.push({ id: doc.id, path: doc.ref.path, ...doc.data() });
  });
  return replies;
}

// like a post
export async function likeThisPost(currUser: string, postPath: string): Promise<void> {
  const postRef = doc(db, postPath);
  await updateDoc(postRef, {
    likes: arrayUnion(currUser),
  });
}

export async function unlikeThisPost(currUser: string, postPath: string): Promise<void> {
  const postRef = doc(db, postPath);
  await updateDoc(postRef, {
    likes: arrayRemove(currUser),
  });
}

/* 
  UTILITY FUNCTIONS
*/

export async function getFirestoreTime(params?: Date): Promise<Timestamp> {
  if (params === undefined) {
    return Timestamp.fromDate(new Date());
  } else {
    return Timestamp.fromDate(params);
  }
}

export function changeFirestoreTime(secs: number, nanosecs: number): Date {
  const tsDate = new Timestamp(secs, nanosecs);
  return tsDate.toDate();
}
