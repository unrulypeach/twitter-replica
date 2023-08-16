import { type Auth } from "firebase/auth";

export default interface ICreateUser {
  email: string;
  password?: string;
  auth?: Auth;
}
