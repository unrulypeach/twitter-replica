import Header from "../../features/header";
import { pathWoBackslash } from "../../scripts/utils";

export default function MessagesPage(): JSX.Element {
  return (
    <div className="flex flex-row">
      <div>
        <div>
          <Header path={pathWoBackslash()} />
        </div>

        <div>
          <div>
            <span className="text-[29px] leading-[34px] font-extrabold">
              Welcome to your inbox!
            </span>
          </div>

          <div>
            <span className="text-[14px] leading-[19px] text-greyTxt">
              Drop a line, share Tweets and more with private conversations
              between you and others on Twitter.{" "}
            </span>
          </div>

          <div>
            <button className="btn-primary-big">
              <span>Write a message</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div>
          <span className="text-[29px] leading-[34px] font-extrabold">
            {" "}
            Select a message
          </span>
        </div>

        <div>
          <span className="text-[14px] leading-[19px] text-greyTxt">
            Choose from your existing conversations, start a new one, or just
            keep swimming.
          </span>
        </div>

        <div>
          <button className="btn-primary-big">
            <span>Write a message</span>
          </button>
        </div>
      </div>
    </div>
  );
}
