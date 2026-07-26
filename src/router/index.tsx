import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { Home } from '@/pages/Home/Home';
import { Explore } from '@/pages/Explore/Explore';
import { NotFound } from '@/pages/NotFound/NotFound';
import { Timeline } from '@/pages/Timeline/Timeline';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'explore', element: <Explore /> },
      { path: 'timeline/:layout', element: <Timeline /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
