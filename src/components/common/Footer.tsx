import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer" aria-label="网站信息">
      <div className="footer-inner">
        <Link className="footer-link" to="/about" aria-label="前往关于本站与来源致谢页面">
          © 2026 The Universe of Yang Yang · 关于本站 · 来源与致谢
        </Link>
      </div>
    </footer>
  );
}
