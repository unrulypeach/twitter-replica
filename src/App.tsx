import EditProfile from './features/editProfile';
import LSideMenu from './routes/pages/lSideMenu';
import SignupPopup from './components/signup';
import LoginPopup from './components/login';

import HomePg from './routes';
import BookmarksPage from './routes/pages/bookmarksPg';
import ExplorePage from './routes/pages/explorePg';
import MessagesPage from './routes/pages/messagesPg';
import NotificationsPage from './routes/pages/notificationsPg';
import ProfilePage from './routes/pages/profilePg';
import { getUserProfile } from './services/firebase/firestore';

import { AuthProvider } from './contexts/authContext';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Layout />,
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
        path: ':userHandle',
        element: <ProfilePage />,
        loader: async ({ params }) => {
          return (await getUserProfile(params.userHandle)) ?? null;
        },
        children: [{ path: 'settings', element: <EditProfile /> }],
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
          <div className="border-r-[1px] border-searchbar h-screen">
            <LSideMenu />
          </div>
          <Outlet />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
