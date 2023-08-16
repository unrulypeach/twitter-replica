export default function styleWrapper(OriginalComponent: React.FC): JSX.Element {
  return (
    <div className="flex flex-row text-center border-b-[1px] border-searchbar">
      <OriginalComponent />
    </div>
  );
}
