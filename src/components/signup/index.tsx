import SignupModal from '../../features/signupModal';
import { useContext } from 'react';
import CreateAccount from '../../features/createAccount';
import CreateUsername from '../../features/createUsername';
import CreatePw from '../../features/createPw';
import PickApfp from '../../features/pickApfp';
import { SIGNUP_PAGE_CONTEXT } from '../../contexts/userContext';

export default function SignupPopup(): JSX.Element {
  const { signupPage } = useContext(SIGNUP_PAGE_CONTEXT);
  const renderComponent = (): JSX.Element => {
    switch (signupPage) {
      case 0:
        return <SignupModal />;
      case 1: // set userName, birthdate, email
        return <CreateAccount />;
      case 2:
        return <CreatePw />;
      case 3:
        return <PickApfp />;
      case 4:
        return <CreateUsername />;
      default:
        return <SignupModal />;
    }
  };
  return (
    <div className="fixed w-full h-full flex flex-row items-center justify-center z-20">
      <div className="bg-darkClear fixed top-0 bottom-0 left-0 right-0" />
      <div className="z-10 h-[650px] min-w-[600px] max-w-[80vw] min-h-[400px] max-h-[650px] bg-white rounded-[16px]">
        {renderComponent()}
      </div>
    </div>
  );
}
