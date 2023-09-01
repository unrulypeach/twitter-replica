import type TweetProps from '../../types/tweetProps';

export default function TweetContent({ text, imgLink }: TweetProps): JSX.Element {
  const img = <img className="rounded-2xl" alt="" src={imgLink} />;
  return (
    <div>
      <div>
        <div>
          <span>{text}</span>
        </div>
        <div>{imgLink ? img : <></>}</div>
      </div>
    </div>
  );
}
