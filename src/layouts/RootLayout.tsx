import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Footer } from '@/components/common/Footer';
import './RootLayout.css';

export function RootLayout() {
  return (
    <div className="site-shell">
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
