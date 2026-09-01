import { type CSSProperties, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import workDetailsData from '@/data/workDetails.json';
import { timelineStillGalleries } from '@/data/timelineStills';
import { timelineWorks } from '@/data/timelineWorks';
import { getImageAdjustment } from '@/data/imageAdjustments';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import './WorkDetail.css';

interface WorkDetailRecord {
  description: string | null;
  quotes: string[];
}

const workDetails = workDetailsData as Record<string, WorkDetailRecord>;

function dateLabel(date: string | null | undefined) {
  if (!date) return '待更新';
  return date.replaceAll('-', '.');
}

export function WorkDetail() {
  const { workId } = useParams();
  const work = timelineWorks.find((item) => item.id.toLowerCase() === workId?.toLowerCase());
  const details = work ? workDetails[work.id] : undefined;
  const images = work ? (timelineStillGalleries[work.id] ?? []) : [];
  const [activeImage, setActiveImage] = useState(0);
  const [viewportRatio, setViewportRatio] = useState(() =>
    typeof window === 'undefined' ? 16 / 9 : window.innerWidth / window.innerHeight,
  );
  const [imageRatios, setImageRatios] = useState<Record<number, number>>({});

  useDocumentTitle(work ? `${work.title} · 作品详情` : '作品详情');

  useEffect(() => {
    setActiveImage(0);
  }, [workId]);

  useEffect(() => {
    const updateViewportRatio = () => setViewportRatio(window.innerWidth / window.innerHeight);
    window.addEventListener('resize', updateViewportRatio);
    return () => window.removeEventListener('resize', updateViewportRatio);
  }, []);

  useEffect(() => {
    if (images.length < 2) return;
    const carousel = window.setInterval(
      () => setActiveImage((current) => (current + 1) % images.length),
      6000,
    );
    return () => window.clearInterval(carousel);
  }, [images.length, workId]);

  if (!work) return <Navigate to="/timeline/alternate" replace />;

  const quotes = details?.quotes ?? [];
  const quoteLaneCount = Math.min(4, quotes.length);
  const quoteLanes = Array.from({ length: quoteLaneCount }, (_, laneIndex) =>
    quotes.filter((_, quoteIndex) => quoteIndex % quoteLaneCount === laneIndex),
  );
  const releaseLabel = work.medium === 'film' ? '上映日期' : '播出日期';

  return (
    <div className="work-detail-page">
      <div className="work-detail-background" aria-hidden="true">
        {images.map((image, index) => {
          const imageAdjustment = getImageAdjustment(work.id, index, 'detail');
          const imageRatio = imageRatios[index] ?? viewportRatio;
          const isPortrait = imageRatio < 1;
          const fitByWidth = !isPortrait && imageRatio <= viewportRatio;
          const baseLeft = isPortrait ? (imageRatio / viewportRatio) * 50 : 50;
          return (
            <img
              className={index === activeImage ? 'is-active' : ''}
              src={image}
              alt=""
              style={{
                width: fitByWidth ? '100%' : 'auto',
                height: fitByWidth ? 'auto' : '100%',
                left: `calc(${baseLeft}% + ${imageAdjustment.offsetX}%)`,
                top: `calc(50% + ${imageAdjustment.offsetY}%)`,
                transform: `translate(-50%, -50%) scale(${imageAdjustment.scale})`,
              }}
              onLoad={(event) => {
                const ratio = event.currentTarget.naturalWidth / event.currentTarget.naturalHeight;
                setImageRatios((current) => current[index] === ratio ? current : { ...current, [index]: ratio });
              }}
              key={image}
            />
          );
        })}
        <div className="work-detail-veil" />
        <div className="work-detail-grain" />
      </div>

      <header className="work-detail-nav">
        <Link className="work-detail-brand" to="/">
          <b>YANG / ARCHIVE</b>
          <small>THE UNIVERSE OF YANG</small>
        </Link>
        <span>FILMOGRAPHY · {work.id}</span>
        <Link className="work-detail-return" to={`/timeline/alternate#${work.id}`}>
          返回时间轴 ↙
        </Link>
      </header>

      {quoteLanes.length ? (
        <section className="work-quote-field" aria-label={`${work.role ?? work.title}角色台词`}>
          <span className="work-quote-heading">LINES / VOICE OF THE ROLE</span>
          {quoteLanes.map((laneQuotes, index) => (
            <div
              className={`work-quote-lane lane-${index + 1}`}
              style={
                {
                  '--quote-duration': `${22 + index * 5}s`,
                  '--quote-mobile-duration': `${16 + index * 3}s`,
                  '--quote-delay': `${index * -6}s`,
                } as CSSProperties
              }
              key={`quote-lane-${index}`}
            >
              <div>
                {[...laneQuotes, ...laneQuotes].map((quote, quoteIndex) => (
                  <span aria-hidden={quoteIndex >= laneQuotes.length} key={`${quote}-${quoteIndex}`}>
                    “{quote}”
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <main className="work-detail-panel">
        <div className="work-detail-index">
          <span>{work.id}</span>
          <i />
          <span>{work.releaseDate?.slice(0, 4) ?? 'COMING SOON'}</span>
        </div>

        <h1 className={work.title.length > 9 ? 'is-long-title' : undefined}>{work.title}</h1>
        {work.medium !== 'variety' && work.role ? (
          <p className="work-detail-role">杨洋 饰 {work.role}</p>
        ) : null}

        <dl className="work-detail-dates">
          <div>
            <dt>开机日期</dt>
            <dd>{dateLabel(work.productionStartDate)}</dd>
          </div>
          <div>
            <dt>杀青日期</dt>
            <dd>{dateLabel(work.wrapDate)}</dd>
          </div>
          <div>
            <dt>{releaseLabel}</dt>
            <dd>{dateLabel(work.releaseDate)}</dd>
          </div>
        </dl>

        {details?.description ? (
          <section className="work-detail-description">
            <span>CHARACTER PROFILE / 角色简介</span>
            {details.description.split('\n').map((paragraph, index) =>
              paragraph.trim() ? <p key={index}>{paragraph}</p> : null,
            )}
          </section>
        ) : null}
      </main>
    </div>
  );
}
