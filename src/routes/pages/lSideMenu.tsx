import SignedInLSideMenu from '../../components/sidemenu/left/signedInLSideMenu';
import SignedOutLSideMenu from '../../components/sidemenu/left/signedOutLSideMenu';
import { useAuthContext } from '../../contexts/authContext';

export default function LSideMenu(): JSX.Element {
  const { currentUser } = useAuthContext();

  return <>{currentUser.uid ? <SignedInLSideMenu /> : <SignedOutLSideMenu />}</>;
}
