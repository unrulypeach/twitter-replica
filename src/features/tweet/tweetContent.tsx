import type TweetProps from "../../types/tweetProps";

export default function TweetContent({
  text,
  imgLink,
}: TweetProps): JSX.Element {
  return (
    <div>
      <div>
        <div>
          <span>{text} </span>
        </div>
        {imgLink !== undefined ? <img src={imgLink} /> : <></>}
      </div>
    </div>
  );
}
