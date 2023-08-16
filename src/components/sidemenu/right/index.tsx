import SignedOutRSideMenu from "./signedOutRSideMenu";

/* import SignedInRSideMenu from "./signedInRSideMenu";
import type HeaderProps from "../../../types/headerProps";

export default function RightSideMenu({ path }: HeaderProps): JSX.Element {
  return <SignedInRSideMenu path={path} />;
} */

export default function RightSideMenu(): JSX.Element {
  return <SignedOutRSideMenu />;
}
