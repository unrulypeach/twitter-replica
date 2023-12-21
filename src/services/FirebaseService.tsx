import { storage } from '../configs/firebase-config';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import useAuthContext from '../hooks/useAuthContext';

export default function FirebaseService() {
  const { userProfile } = useAuthContext();

  async function uploadPostPhoto(user: string, file: File): Promise<string> {
    const newImageRef = ref(storage, `${user}/${file.name}`);
    await uploadBytesResumable(newImageRef, file);

    const publicImageUrl = await getDownloadURL(newImageRef);
    return publicImageUrl;
  }

  // uploads photo to cloud storage
  async function uploadUserPhoto(file: File): Promise<string | undefined> {
    try {
      const userUid = userProfile?._id.toString();
      const filePath = `${userUid}/${file.name}`;
      const newImageRef = ref(storage, filePath);
      await uploadBytesResumable(newImageRef, file);

      const publicImageUrl = await getDownloadURL(newImageRef);
      return publicImageUrl;
    } catch (error) {
      console.error('error uploading to cloud storage', error);
    }
  }

  async function uploadBgPhoto(file: File): Promise<string | undefined> {
    try {
      const userUid = userProfile?._id.toString();
      const filePath = `${userUid}/${file.name}`;
      const newImageRef = ref(storage, filePath);
      await uploadBytesResumable(newImageRef, file);

      const publicImageUrl = await getDownloadURL(newImageRef);
      return publicImageUrl;
    } catch (error) {
      console.error('error uploading to cloud storage:', error);
    }
  }

  return {
    uploadPostPhoto,
    uploadUserPhoto,
    uploadBgPhoto,
  };
}
