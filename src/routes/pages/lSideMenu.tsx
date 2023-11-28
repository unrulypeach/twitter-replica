import SignedInLSideMenu from '../../components/sidemenu/left/signedInLSideMenu';
import SignedOutLSideMenu from '../../components/sidemenu/left/signedOutLSideMenu';
import { useAuthContext } from '../../contexts/authContext';

export default function LSideMenu(): JSX.Element {
  const { userProfile } = useAuthContext();

  return <>{userProfile?._id ? <SignedInLSideMenu /> : <SignedOutLSideMenu />}</>;
}
