import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Footer } from '@/components/common/Footer';
import { Navigation } from '@/components/common/Navigation';
import '@/layouts/RootLayout.css';

export function RootLayout() {
  return (
    <div className="site-shell">
      <Navigation />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
