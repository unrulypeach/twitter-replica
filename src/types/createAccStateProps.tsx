import type InewUser from "./InewUser";
export default interface CreateAccStateProps {
  setSignupPage?: React.Dispatch<React.SetStateAction<number>>;
  setNewUserData?: React.Dispatch<React.SetStateAction<InewUser>>;
  newUserData?: InewUser;
}
