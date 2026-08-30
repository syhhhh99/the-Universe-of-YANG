import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import entryBackground from '@/assets/images/entry-background.jpg';
import exploreBackground from '@/assets/images/explore-01.jpg';
import './Home.css';

export function Home() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useDocumentTitle('The Universe of Yang · 首页');

  const enterArchive = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    window.setTimeout(() => navigate('/explore', { viewTransition: true }), 1050);
  };

  return (
    <div className={`home ${isTransitioning ? 'is-transitioning' : ''}`}>
      <header className="home-nav">
        <a className="home-brand" href="#top">
          YANG / ARCHIVE
        </a>
      </header>

      <main id="top">
        <section className="home-hero">
          <div
            className="explore-transition-background"
            style={{ backgroundImage: `url(${exploreBackground})` }}
            aria-hidden="true"
          />
          <div
            className="entry-background"
            style={{ backgroundImage: `url(${entryBackground})` }}
            aria-hidden="true"
          >
            <div className="entry-glow" />
            <div className="entry-stars" />
          </div>

          <div className="entry-title">
            <span className="entry-title__eyebrow">A LIVING ARCHIVE OF LIGHT &amp; TIME</span>
            <h1>
              the Universe of <strong>YANG</strong>
            </h1>
            <p>杨洋在哪我在哪，羊毛陪你闯天下</p>
            <button type="button" className="entry-button" onClick={enterArchive}>
              <span>点击进入</span>
              <b>ENTER THE ARCHIVE</b>
              <i aria-hidden="true">→</i>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
