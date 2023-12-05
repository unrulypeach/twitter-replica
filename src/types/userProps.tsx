import { Types } from 'mongoose';

export default interface UserProps {
  _id: Types.ObjectId;
  username: string;
  userhandle: string;
  birthdate: string;
  joined_date: string;

  profile_pic?: string;
  header_pic?: string;
  bio?: string;
  website?: string;
  location?: string;
}
