import { moreNoBorder } from "../../styles/assets/icons/iconData";

export default function Tos(): JSX.Element {
  return (
    <div className="mb-[15px] max-w-[350px]">
      <nav className="flex felx-row flex-wrap px-[15px] text-greyTxt text-[12px] leading-[15px]">
        <a
          href="https://twitter.com/tos"
          className="pr-[11px] cursor-pointer hover:underline"
        >
          <span>Terms of Service</span>
        </a>

        <a
          href="https://twitter.com/privacy"
          className=" pr-[11px] cursor-pointer hover:underline"
        >
          <span>Privacy Policy</span>
        </a>

        <a
          href="https://support.twitter.com/articles/20170514"
          className=" pr-[11px] cursor-pointer hover:underline"
        >
          <span>Cookie Policy</span>
        </a>

        <a
          href="https://help.twitter.com/resources/accessibility"
          className=" pr-[11px] cursor-pointer hover:underline"
        >
          <span>Accessibility</span>
        </a>

        <a
          href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&amp;utm_source=twc&amp;utm_medium=web&amp;utm_campaign=ao&amp;utm_content=adsinfo"
          className=" pr-[11px] cursor-pointer hover:underline"
        >
          <span>Ads Info</span>
        </a>

        <a className=" pr-[11px] cursor-pointer hover:underline">
          <span>More </span>{" "}
          <span className="fill-greyTxt">{moreNoBorder}</span>
        </a>

        <a className=" pr-[11px]">
          <span>© 2023 Twitter, Inc.</span>
        </a>
      </nav>
    </div>
  );
}
