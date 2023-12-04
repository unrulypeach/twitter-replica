import { Types } from 'mongoose';

export interface ShortUserProps {
  _id: Types.ObjectId;
  username: string;
  userhandle: string;
  profile_pic: string;
}
export interface TweetProps {
  _id: Types.ObjectId;
  content: string;
  uid: ShortUserProps;
  comments: Array<Types.ObjectId>;
  likes: Array<Types.ObjectId>;
  date: string;
}

export interface TweetPopulatedCommentsProps {
  _id: Types.ObjectId;
  content: string;
  uid: ShortUserProps;
  comments: Array<TweetProps>;
  likes: Array<Types.ObjectId>;
  date: string;
}
