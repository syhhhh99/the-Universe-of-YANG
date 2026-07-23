import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
export function NotFound() {
  useDocumentTitle('Not Found');
  return (
    <section className="container page-placeholder">
      <div>
        <p>404</p>
        <h1>Page not found</h1>
        <p>The requested archive section does not exist.</p>
        <Link className="button button--primary" to="/">
          Return home
        </Link>
      </div>
    </section>
  );
}
