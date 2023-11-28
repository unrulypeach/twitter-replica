import { Types } from 'mongoose';

interface ShortUserProps {
  _id: Types.ObjectId;
  username: string;
  userhandle: string;
  profile_pic: string;
}
export default interface TweetProps {
  _id: Types.ObjectId;
  content: string;
  uid: ShortUserProps;
  comments: Array<Types.ObjectId>;
  likes: Array<Types.ObjectId>;
  date: string;
}
