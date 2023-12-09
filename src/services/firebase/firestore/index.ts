import { type DocumentSnapshot, type DocumentData, collection, query, where, getDocs } from 'firebase/firestore';
import { db, storage } from '../../../configs/firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

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

/* 
  POST FUNCTIONS
*/

export async function uploadPostPhoto(user: string, file: File): Promise<string> {
  const newImageRef = ref(storage, `${user}/${file.name}`);
  await uploadBytesResumable(newImageRef, file);

  const publicImageUrl = await getDownloadURL(newImageRef);
  return publicImageUrl;
}
