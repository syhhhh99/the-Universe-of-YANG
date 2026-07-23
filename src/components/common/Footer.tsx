import { SITE_NAME } from '@/constants/navigation';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>{SITE_NAME}</span>
        <span>Under development</span>
      </div>
    </footer>
  );
}
