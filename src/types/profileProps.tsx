export default interface ProfileProps {
  userHandle?: string;
  userName?: string;
  email?: string;
  photoURL?: string;
  backgroundPic?: string;
  bio?: string;
  birthday?: Date;
  location?: string;
  website?: string;
  joinedDate?: Date;
  following?: number;
  followers?: number;
  uid?: string;
}
