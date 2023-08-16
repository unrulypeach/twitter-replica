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
} from "firebase/firestore";
import { db } from "../../../configs/firebase-config";

/* 
  PROFILE AND FOLLOW FUNCTIONS
*/
export async function getUserProfile(
  params: string
): Promise<DocumentSnapshot<DocumentData>> {
  const userProfileRef = doc(db, "user-profiles", params);
  const docSnap = await getDoc(userProfileRef);
  return docSnap;
}

export async function getUserFollowing(params: string): Promise<number> {
  const userFollowingCollection = collection(
    db,
    "follows",
    params,
    "following"
  );
  const snapshot = await getCountFromServer(userFollowingCollection);
  return snapshot.data().count;
}

// TODO: this should eventually become a cloud function and the number should
// be updated to user-profiles/{userHandle} doc
export async function getUserFollowers(params: string): Promise<number> {
  const userQuery = query(
    collectionGroup(db, "following"),
    where("userHandle", "==", params)
  );
  const userQuerySnapshot = await getCountFromServer(userQuery);
  return userQuerySnapshot.data().count;
}

export async function follow(currUser: string, params: string): Promise<void> {
  const today = await getFirestoreTime();
  const userRef = doc(db, `follows/${currUser}`);
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const userFollowRef = doc(db, `follows/${currUser}/following/${params}`);

  getDoc(userRef)
    .then((theDoc) => {
      if (theDoc.exists()) {
        void setDoc(userFollowRef, { userHandle: params, date: today });
      } else {
        // TODO:
        // - create doc under user
        void setDoc(doc(db, "follows", currUser), {});
        // - then create follow
        void setDoc(userFollowRef, { userHandle: params, date: today });
      }
    })
    .catch((error) => {
      console.error(error.code);
    });
}

/* 
  POST FUNCTIONS
*/

export async function post(currUser: string, content: string): Promise<void> {
  const now = await getFirestoreTime();
  const userPostsColl = collection(db, `posts/${currUser}/user-posts`);
  const colCount = await getCountFromServer(userPostsColl);
  const seqNum = colCount.data().count;
  const postData = {
    time: now,
    content,
    seq: seqNum,
  };
  addDoc(userPostsColl, postData).catch((error) => {
    console.error(error.code);
  });
}

// fetch 10 recent posts

// THIS DOESNT WORK FOR A USER WITH ONLY ONE POST
export async function getPosts(
  currUser: string,
  quantity?: number
): Promise<any[]> {
  const userPostsColl = collection(db, `posts/${currUser}/user-posts`);
  const quer = query(
    userPostsColl,
    orderBy("seq", "desc"),
    limit(quantity ?? 10)
  );

  const querSnap = await getDocs(quer);
  const posts = [];
  querSnap.forEach((doc) => {
    posts.push(doc.data());
  });
  return posts;
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
