import { useContext } from "react";
import { LOGIN_PAGE_CONTEXT } from "../../contexts/userContext";
import LoginModal from "../../features/loginModal";
import EnterPw from "../../features/enterPw";

export default function LoginPopup(): JSX.Element {
  const { loginPage } = useContext(LOGIN_PAGE_CONTEXT);
  const renderComponent = (): JSX.Element => {
    switch (loginPage) {
      case 0:
        return <LoginModal />;
      case 1:
        return <EnterPw />;
      /*       case 2:
        return < />;
      case 3:
        return < />;
      case 4:
        return < />; */
      default:
        return <LoginModal />;
    }
  };
  return (
    <div className="fixed w-full h-full flex flex-row items-center justify-center z-20">
      <div className="bg-darkClear fixed top-0 bottom-0 left-0 right-0" />
      <div className="z-10 h-[650px] min-w-[600px] max-w-[80vw] min-h-[400px] max-h-[90vh] bg-white rounded-[16px]">
        {renderComponent()}
      </div>
    </div>
  );
}
