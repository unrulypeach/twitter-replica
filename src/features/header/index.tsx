import type HeaderProps from "../../types/headerProps";
import { setting } from "../../styles/assets/icons/iconData";

export default function Header({ path }: HeaderProps): JSX.Element {
  function withSettings(): JSX.Element {
    return (
      <div className="flex flex-row justify-between w-full">
        <div>
          <span>{path}</span>
        </div>
        <div className="h-[19px] w-[19px]">
          <span>{setting}</span>
        </div>
      </div>
    );
  }
  const lcPath: string = path?.toLowerCase();
  const pathTwo: boolean = lcPath === "notifications";
  return (
    <div className="h-[50px] px-[15px]">
      <div className="h-full text-[19px] leading-[23px] font-bold flex items-center">
        {pathTwo ? withSettings() : <span>{path}</span>}
      </div>
    </div>
  );
}
