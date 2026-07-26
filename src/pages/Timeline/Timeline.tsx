import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import explore01 from '@/assets/images/explore-01.jpg';
import explore02 from '@/assets/images/explore-02.jpg';
import explore03 from '@/assets/images/explore-03.jpg';
import explore04 from '@/assets/images/explore-04.jpg';
import gallery01 from '@/assets/images/gallery-01.jpg';
import gallery02 from '@/assets/images/gallery-02.jpg';
import gallery03 from '@/assets/images/gallery-03.jpg';
import gallery04 from '@/assets/images/gallery-04.jpg';
import './Timeline.css';

const works = [
  { year: '2010', title: '作品名称 01', role: '角色名称 01', image: explore01 },
  { year: '2011', title: '作品名称 02', role: '角色名称 02', image: explore02 },
  { year: '2013', title: '作品名称 03', role: '角色名称 03', image: explore03 },
  { year: '2015', title: '作品名称 04', role: '角色名称 04', image: explore04 },
  { year: '2017', title: '作品名称 05', role: '角色名称 05', image: gallery01 },
  { year: '2019', title: '作品名称 06', role: '角色名称 06', image: gallery02 },
  { year: '2021', title: '作品名称 07', role: '角色名称 07', image: gallery03 },
  { year: '2023', title: '作品名称 08', role: '角色名称 08', image: gallery04 },
];

export function Timeline() {
  const { layout } = useParams();
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  useDocumentTitle('时间轴 · The Universe of Yang');

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.index));
      },
      { root, threshold: [0.35, 0.55, 0.75] },
    );
    root.querySelectorAll<HTMLElement>('.timeline-work').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
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
          <Link to="/explore#footprints">
            <b>地图足迹</b>
            <small>FOOTPRINTS</small>
          </Link>
          <Link to="/explore#style">
            <b>造型图鉴</b>
            <small>STYLE ARCHIVE</small>
          </Link>
        </nav>
        <Link to="/?version=7" className="back-home">
          返回首页 ↙
        </Link>
      </header>

      <div className="timeline-backgrounds" aria-hidden="true">
        {works.map((work, index) => (
          <img
            className={index === active ? 'is-active' : ''}
            src={work.image}
            alt=""
            key={work.year}
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

        {works.map((work, index) => (
          <section
            className={`timeline-work ${index % 2 ? 'is-right' : 'is-left'}`}
            data-index={index}
            key={work.year}
          >
            <div className="work-year">
              <span>{work.year}</span>
              <small>
                {String(index + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
              </small>
            </div>
            <article className="work-card">
              <div className="work-image">
                <img src={work.image} alt={`${work.title}预留图片`} />
              </div>
              <div className="work-info">
                <span>YANG / FILMOGRAPHY</span>
                <h2>{work.title}</h2>
                <p>饰演角色 · {work.role}</p>
                <button type="button">
                  查看作品详情 <i>↗</i>
                </button>
              </div>
            </article>
          </section>
        ))}
      </div>
    </div>
  );
}
