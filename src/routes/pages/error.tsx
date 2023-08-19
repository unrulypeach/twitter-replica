import { useRouteError } from 'react-router-dom';

export default function ErrorPage(): JSX.Element {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <div>
        <span>{'Hmm...this page doesn’t exist. Try searching for something else.'}</span>
      </div>
      <div>
        <button type="button" className="btn-primary-med">
          Search
        </button>
      </div>
    </div>
  );
}
