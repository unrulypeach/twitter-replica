import TabitemProfile from "./tabitemProfile";
import TabitemHome from "./tabitemHome";
import styleWrapper from "./styleWrapper";

interface TabbarProps {
  path: string;
}
export default function Tabbar({ path }: TabbarProps): JSX.Element {
  return path === "Home"
    ? styleWrapper(TabitemHome)
    : styleWrapper(TabitemProfile);
}
