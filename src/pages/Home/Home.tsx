import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function Home() {
  useDocumentTitle();

  return (
    <section className="container page-placeholder">
      <div>
        <h1>Home</h1>
        <p>This project is under development.</p>
      </div>
    </section>
  );
}
