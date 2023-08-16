import { Link } from "react-router-dom";
import { useContext } from "react";
import { closeModalX } from "../../styles/assets/icons/iconData";
import {
  LOGIN_PAGE_CONTEXT,
  SIGNUP_PAGE_CONTEXT,
} from "../../contexts/userContext";

export default function CloseModal(): JSX.Element {
  const { setSignupPage } = useContext(SIGNUP_PAGE_CONTEXT);
  const { setLoginPage } = useContext(LOGIN_PAGE_CONTEXT);
  return (
    <Link
      to="/"
      className="h-[19px] w-[19px] ml-3"
      onClick={() => {
        if (setSignupPage) setSignupPage(0);
        if (setLoginPage) setLoginPage(0);
      }}
    >
      {closeModalX}
    </Link>
  );
}
