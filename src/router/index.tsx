import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { Home } from '@/pages/Home/Home';
import { NotFound } from '@/pages/NotFound/NotFound';
import { Timeline } from '@/pages/Timeline/Timeline';
import { Anniversaries } from '@/pages/Anniversaries/Anniversaries';
import { ExploreFocus } from '@/pages/ExploreFocus/ExploreFocus';
import { WorkDetail } from '@/pages/WorkDetail/WorkDetail';
import { ImagePositionEditor } from '@/pages/ImagePositionEditor/ImagePositionEditor';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'explore', element: <ExploreFocus /> },
      { path: 'explore/time', element: <ExploreFocus /> },
      { path: 'timeline/:layout', element: <Timeline /> },
      { path: 'anniversaries', element: <Anniversaries /> },
      { path: 'works/:workId', element: <WorkDetail /> },
      { path: 'image-position-editor', element: <ImagePositionEditor /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
