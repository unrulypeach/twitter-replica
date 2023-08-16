import MenuItem from "./menuitem";
import { explore, setting } from "../../../styles/assets/icons/iconData";

export default function SignedOutLSideMenu(): JSX.Element {
  return (
    <div className="flex flex-col">
      <MenuItem title="Explore" iconData={explore} />
      <MenuItem title="Settings" iconData={setting} />
    </div>
  );
}
