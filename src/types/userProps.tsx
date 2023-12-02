import { Types } from 'mongoose';

export default interface UserProps {
  _id: Types.ObjectId;
  username: string;
  userhandle: string;
  birthdate: Date;
  joined_date: Date;

  profile_pic?: string;
  header_pic?: string;
  bio?: string;
  website?: string;
  location?: string;
}
