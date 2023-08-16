export default function ErrorPage(): JSX.Element {
  return (
    <div>
      <div>
        <span>
          {"Hmm...this page doesn’t exist. Try searching for something else."}
        </span>
      </div>
      <div>
        <button type="button" className="btn-primary-med">
          Search
        </button>
      </div>
    </div>
  );
}
