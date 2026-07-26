import { Outlet, ScrollRestoration } from 'react-router-dom';

export function RootLayout() {
  return (
    <div>
      <main id="main-content">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
