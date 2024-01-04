// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECTID,
  storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APP_APPID,
};

// auth
const app = initializeApp(firebaseConfig);
// export default app;
// export const auth = getAuth(app);
/* export const auth = getAuth();
connectAuthEmulator(auth, 'http://localhost:9099'); */

// cloud storage
// export const storage = getStorage();
export const storage = getStorage(app);
// export const storageRef = ref(storage);
/* if (location.hostname === 'localhost') {
  connectStorageEmulator(storage, 'localhost', 9199);
} */

// firestore
// export const db = getFirestore(app);
/* export const db = getFirestore();
if (location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
} */
