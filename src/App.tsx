import LSideMenu from './routes/pages/lSideMenu';
import SignupPopup from './components/signup';
import LoginPopup from './components/login';

import HomePg from './routes';
import BookmarksPage from './routes/pages/bookmarksPg';
import ExplorePage from './routes/pages/explorePg';
import MessagesPage from './routes/pages/messagesPg';
import NotificationsPage from './routes/pages/notificationsPg';
import ProfilePage from './routes/pages/profilePg';

import { AuthProvider } from './contexts/authContext';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import PostPg from './routes/pages/postPg';
import ErrorPage from './routes/pages/error';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePg />,
        children: [
          { path: 'signup', element: <SignupPopup /> },
          { path: 'login', element: <LoginPopup /> },
        ],
      },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'messages', element: <MessagesPage /> },
      { path: 'bookmarks', element: <BookmarksPage /> },
      {
        path: ':userhandle',
        element: <ProfilePage />,
      },
      {
        path: ':userhandle/p/:postId',
        element: <PostPg />,
      },
    ],
  },
]);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

function Layout(): JSX.Element {
  return (
    <>
      <AuthProvider>
        <div className="flex flex-row justify-center">
          <div className="h-screen sticky top-0">
            <LSideMenu />
          </div>
          <Outlet />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
