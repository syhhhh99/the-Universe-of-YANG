import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { timelineWorks, type TimelineWork } from '@/data/timelineWorks';
import { getImageAdjustment } from '@/data/imageAdjustments';
import explore01 from '@/assets/images/explore-01.jpg';
import explore02 from '@/assets/images/explore-02.jpg';
import explore03 from '@/assets/images/explore-03.jpg';
import explore04 from '@/assets/images/explore-04.jpg';
import './Timeline.css';

const timelineBackgrounds = [explore01, explore02, explore03, explore04];
const TIMELINE_IMAGE_RATIO = 1.66;

function parseImagePosition(position = '50% 50%') {
  const [x = '50%', y = '50%'] = position.split(/\s+/);
  return { x: Number.parseFloat(x), y: Number.parseFloat(y) };
}

function getReleaseYear(work: TimelineWork) {
  return work.releaseDate?.slice(0, 4) ?? '待定';
}

export function Timeline() {
  const { layout } = useParams();
  const [activeBackground, setActiveBackground] = useState(0);
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef(false);
  useDocumentTitle('时间轴 · The Universe of Yang');

  useEffect(() => {
    const carousel = window.setInterval(
      () => setActiveBackground((value) => (value + 1) % timelineBackgrounds.length),
      6500,
    );
    return () => window.clearInterval(carousel);
  }, []);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const handleTimelineWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      event.preventDefault();
      if (wheelLockRef.current) return;

      const direction = Math.sign(event.deltaY);
      const currentPage = Math.round(root.scrollTop / root.clientHeight);
      const targetPage = Math.min(
        timelineWorks.length,
        Math.max(0, currentPage + direction),
      );
      if (targetPage === currentPage) return;

      wheelLockRef.current = true;
      root.scrollTo({
        top: targetPage * root.clientHeight,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 620);
    };

    root.addEventListener('wheel', handleTimelineWheel, { passive: false });
    return () => root.removeEventListener('wheel', handleTimelineWheel);
  }, []);

  if (layout !== 'alternate') return <Navigate to="/timeline/alternate" replace />;

  return (
    <div className="timeline-page">
      <header className="timeline-nav">
        <Link to="/" className="timeline-brand">
          <b>YANG / ARCHIVE</b>
          <small>THE UNIVERSE OF YANG</small>
        </Link>
        <nav aria-label="内容栏目导航">
          <Link className="is-active" to="/timeline/alternate">
            <b>时间轴</b>
            <small>TIMELINE</small>
          </Link>
          <Link to="/anniversaries">
            <b>纪念日</b>
            <small>ANNIVERSARIES</small>
          </Link>
        </nav>
        <Link to="/explore" className="back-home">
          返回探索大厅 ↙
        </Link>
      </header>

      <div className="timeline-backgrounds" aria-hidden="true">
        {timelineBackgrounds.map((background, index) => (
          <img
            className={index === activeBackground ? 'is-active' : ''}
            src={background}
            alt=""
            key={background}
          />
        ))}
        <div className="timeline-background-veil" />
      </div>

      <div className="timeline-scroll" ref={scrollRef}>
        <section className="timeline-intro">
          <span>FILMOGRAPHY · PHASE 01</span>
          <h1>时间轴</h1>
          <p>光阴刻下深浅的纹路，每一帧都是与你的初见。</p>
          <i aria-hidden="true">向下浏览</i>
        </section>

        {timelineWorks.map((work, index) => (
          <section
            className={`timeline-work ${index % 2 ? 'is-right' : 'is-left'}`}
            data-index={index}
            id={work.id}
            key={work.id}
          >
            <div className="work-year">
              <span>{getReleaseYear(work)}</span>
              <small>
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(timelineWorks.length).padStart(2, '0')}
              </small>
            </div>
            <article className="work-card">
              <div className="work-image">
                {work.image ? (
                  <img
                    src={work.image}
                    alt={`${work.title}剧照 1`}
                    style={(() => {
                      const imageRatio = imageRatios[work.id] ?? TIMELINE_IMAGE_RATIO;
                      const fitByWidth = imageRatio <= TIMELINE_IMAGE_RATIO;
                      const position = parseImagePosition(work.imagePosition);
                      const baseLeft = fitByWidth
                        ? 50
                        : 50 + (imageRatio / TIMELINE_IMAGE_RATIO - 1) * (50 - position.x);
                      const baseTop = fitByWidth
                        ? 50 + (TIMELINE_IMAGE_RATIO / imageRatio - 1) * (50 - position.y)
                        : 50;
                      const adjustment = getImageAdjustment(
                        work.id,
                        0,
                        'timeline',
                      );
                      return {
                        width: fitByWidth ? '100%' : 'auto',
                        height: fitByWidth ? 'auto' : '100%',
                        left: `calc(${baseLeft}% + ${adjustment.offsetX}%)`,
                        top: `calc(${baseTop}% + ${adjustment.offsetY}%)`,
                        transform: `translate(-50%, -50%) scale(${adjustment.scale})`,
                      };
                    })()}
                    onLoad={(event) => {
                      const ratio = event.currentTarget.naturalWidth / event.currentTarget.naturalHeight;
                      setImageRatios((current) => current[work.id] === ratio
                        ? current
                        : { ...current, [work.id]: ratio });
                    }}
                  />
                ) : (
                  <div
                    className="work-image-placeholder"
                    role="img"
                    aria-label={`${work.title}图片待更新`}
                  >
                    <span>IMAGE PENDING</span>
                    <strong>图片待更新</strong>
                    <small>{work.id}</small>
                  </div>
                )}
              </div>
              <div className="work-info">
                <span>YANG / FILMOGRAPHY · {work.id}</span>
                <h2 className={work.title.length > 8 ? 'is-long-title' : undefined}>{work.title}</h2>
                <div className="work-meta">
                  <p>{work.medium === 'film' ? '上映年份' : '播出年份'} · {getReleaseYear(work)}</p>
                  {work.medium !== 'variety' ? <p>饰演角色 · {work.role ?? '角色待更新'}</p> : null}
                </div>
                <Link className="work-detail-entry" to={`/works/${work.id}`}>
                  查看作品详情 <i>↗</i>
                </Link>
              </div>
            </article>
          </section>
        ))}
      </div>

    </div>
  );
}
