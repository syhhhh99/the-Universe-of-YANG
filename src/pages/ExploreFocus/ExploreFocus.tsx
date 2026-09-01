import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  anniversaryCountdownCopy,
  anniversaryDateLabel,
  getUpcomingAnniversaries,
} from '@/data/anniversaries';
import { timelineWorks } from '@/data/timelineWorks';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import explore01 from '@/assets/images/explore-01.jpg';
import explore02 from '@/assets/images/explore-02.jpg';
import explore03 from '@/assets/images/explore-03.jpg';
import explore04 from '@/assets/images/explore-04.jpg';
import './ExploreFocus.css';

const slides = [explore01, explore02, explore03, explore04];
const datedWorks = timelineWorks.filter((work) => work.releaseDate);
const firstYear = datedWorks[0]?.releaseDate?.slice(0, 4) ?? '2010';
const lastYear = datedWorks.at(-1)?.releaseDate?.slice(0, 4) ?? 'NOW';

export function ExploreFocus() {
  useDocumentTitle('时间入口 · The Universe of Yang');
  const [active, setActive] = useState(0);
  const [nextAnniversary, setNextAnniversary] = useState(() => getUpcomingAnniversaries()[0]);
  const countdownCopy = anniversaryCountdownCopy(nextAnniversary);

  useEffect(() => {
    const carousel = window.setInterval(
      () => setActive((value) => (value + 1) % slides.length),
      6500,
    );
    const refreshAnniversary = () => setNextAnniversary(getUpcomingAnniversaries()[0]);
    const clock = window.setInterval(refreshAnniversary, 60_000);
    window.addEventListener('focus', refreshAnniversary);

    return () => {
      window.clearInterval(carousel);
      window.clearInterval(clock);
      window.removeEventListener('focus', refreshAnniversary);
    };
  }, []);

  return (
    <div className="focus-page">
      <header className="focus-nav">
        <Link to="/" className="focus-brand">
          <b>YANG / ARCHIVE</b>
          <small>THE UNIVERSE OF YANG</small>
        </Link>
        <span className="focus-nav-title">TIME IN TWO FORMS</span>
        <Link to="/" className="focus-back">
          返回首页 ↙
        </Link>
      </header>

      <main className="focus-stage">
        <div className="focus-carousel" aria-label="杨洋照片轮播">
          {slides.map((slide, index) => (
            <img
              className={index === active ? 'is-active' : ''}
              src={slide}
              alt={`杨洋轮播照片 ${index + 1}`}
              key={slide}
            />
          ))}
        </div>
        <div className="focus-veil" />
        <div className="focus-grid" aria-hidden="true" />

        <section className="focus-intro">
          <span>THE SHAPE OF TIME · 01 / 02</span>
          <h1>
            <span className="focus-title-line">时间，以两种方式</span>
            <span className="focus-title-line">与他重逢</span>
          </h1>
          <p>一圈，将未至的日子写成期许；一线，把走过的年岁缀作星河。</p>
          <p>圆有归期，藏着未至的欢喜；线有来处，串起经年的篇章。</p>
        </section>

        <section className="focus-anniversary" aria-label="最近纪念日">
          <Link
            className="focus-orbit"
            to="/anniversaries"
            aria-label={`${countdownCopy}，点击查看更多纪念日`}
          >
            <span>
              {nextAnniversary.kind === 'birthday' ? 'UNTIL HIS BIRTHDAY' : 'NEXT ANNIVERSARY'}
            </span>
            <strong>
              {nextAnniversary.days === 0
                ? `${String(nextAnniversary.month).padStart(2, '0')}.${String(nextAnniversary.day).padStart(2, '0')}`
                : nextAnniversary.days}
            </strong>
            <p>{countdownCopy}</p>
            <small>
              {anniversaryDateLabel(nextAnniversary)} · {nextAnniversary.targetYear}
            </small>
            <i className="focus-ring focus-ring-one" />
            <i className="focus-ring focus-ring-two" />
          </Link>
          <Link className="focus-anniversary-more" to="/anniversaries">
            查看与他的全部纪念日 <i>↗</i>
          </Link>
        </section>

        <Link className="focus-timeline" to="/timeline/alternate">
          <div className="focus-timeline-number">
            <span>02</span>
            <small>THE LINE OF TIME</small>
          </div>
          <div className="focus-timeline-copy">
            <span>FILMOGRAPHY ARCHIVE</span>
            <h2>时间轴</h2>
            <p>沿正式播出与上映日期，重逢每一个角色与故事。</p>
          </div>
          <div className="focus-timeline-track" aria-hidden="true">
            <div className="focus-track-labels">
              <span>{firstYear}</span>
              <span>2015</span>
              <span>2020</span>
              <span>{lastYear}</span>
            </div>
            <div className="focus-track-line">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="focus-timeline-meta">
            <strong>{String(timelineWorks.length).padStart(2, '0')}</strong>
            <span>WORKS</span>
            <i>↗</i>
          </div>
        </Link>

        <div className="focus-carousel-controls" aria-label="照片切换">
          <span>{String(active + 1).padStart(2, '0')}</span>
          <div>
            {slides.map((_, index) => (
              <button
                type="button"
                className={index === active ? 'is-active' : ''}
                aria-label={`切换到第 ${index + 1} 张照片`}
                onClick={() => setActive(index)}
                key={index}
              />
            ))}
          </div>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
      </main>
    </div>
  );
}
