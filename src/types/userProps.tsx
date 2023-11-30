export default interface UserProps {
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
