import SignedInRSideMenu from '../../components/sidemenu/right/signedInRSideMenu';

export default function PostPg(): JSX.Element {
  return (
    <div className="flex flex-row">
      <div className="flex flex-row justify-between w-[600px]">
        <div>
          <span>Post</span>
        </div>
      </div>

      <div>
        <SignedInRSideMenu path="notifications" />
      </div>
    </div>
  );
}
