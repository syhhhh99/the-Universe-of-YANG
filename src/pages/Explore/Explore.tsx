import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import explore01 from '@/assets/images/explore-01.jpg';
import explore02 from '@/assets/images/explore-02.jpg';
import explore03 from '@/assets/images/explore-03.jpg';
import explore04 from '@/assets/images/explore-04.jpg';
import './Explore.css';

const slides = [explore01, explore02, explore03, explore04];

function birthdayState() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  const year = value('year');
  const month = value('month');
  const day = value('day');
  const today = Date.UTC(year, month - 1, day);
  let birthdayYear = year;
  let target = Date.UTC(birthdayYear, 8, 9);
  if (today > target) { birthdayYear += 1; target = Date.UTC(birthdayYear, 8, 9); }
  return { days: Math.ceil((target - today) / 86400000), year: birthdayYear };
}

const entrances = [
  { number: '01', name: '时间轴', en: 'TIMELINE', copy: '沿正式播出日期，走过每一个角色与故事。', to: '/timeline/alternate', className: 'primary' },
  { number: '02', name: '地图足迹', en: 'FOOTPRINTS', copy: '在城市、片场与旅程之间发现他的坐标。', to: '/explore#footprints', className: '' },
  { number: '03', name: '造型图鉴', en: 'STYLE ARCHIVE', copy: '收藏角色、活动与时尚造型的光影切片。', to: '/explore#style', className: '' },
];

export function Explore() {
  useDocumentTitle('探索大厅 · The Universe of Yang');
  const [active, setActive] = useState(0);
  const [birthday, setBirthday] = useState(birthdayState);
  const birthdayCopy = useMemo(() => birthday.days === 0 ? '今天是杨洋生日' : birthday.days === 1 ? '明天见' : `距离杨洋生日还有 ${birthday.days} 天`, [birthday]);

  useEffect(() => {
    const carousel = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 6500);
    const clock = window.setInterval(() => setBirthday(birthdayState()), 60000);
    const refresh = () => setBirthday(birthdayState());
    window.addEventListener('focus', refresh);
    return () => { window.clearInterval(carousel); window.clearInterval(clock); window.removeEventListener('focus', refresh); };
  }, []);

  return (
    <div className="explore-page">
      <header className="explore-nav">
        <Link to="/" className="explore-brand"><b>YANG / ARCHIVE</b><small>THE UNIVERSE OF YANG</small></Link>
        <span className="slide-count">{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        <Link to="/?version=7" className="explore-back">返回首页 ↙</Link>
      </header>

      <main className="explore-stage">
        <div className="explore-carousel" aria-label="杨洋照片轮播">
          {slides.map((slide, index) => <img className={index === active ? 'is-active' : ''} src={slide} alt={`杨洋轮播照片 ${index + 1}`} key={slide} />)}
        </div>
        <div className="explore-shade" />

        <button className="birthday-orbit" type="button" aria-label={birthdayCopy}>
          <span className="orbit-copy">UNTIL HIS BIRTHDAY</span>
          <strong>{birthday.days === 0 ? '09.09' : birthday.days}</strong>
          <p>{birthdayCopy}</p>
          <small>SEPTEMBER 09 · {birthday.year}</small>
          <i className="orbit-ring orbit-ring--one" /><i className="orbit-ring orbit-ring--two" />
        </button>

        <nav className="explore-entrances" aria-label="内容栏目入口">
          {entrances.map((item) => <Link to={item.to} className={item.className} key={item.number}><span>{item.number}</span><div><b>{item.name}</b><small>{item.en}</small><p>{item.copy}</p></div><i>↗</i></Link>)}
        </nav>

        <div className="carousel-controls">
          <button type="button" onClick={() => setActive((active - 1 + slides.length) % slides.length)}>←</button>
          <div>{slides.map((_, index) => <button aria-label={`切换到第 ${index + 1} 张照片`} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} type="button" key={index} />)}</div>
          <button type="button" onClick={() => setActive((active + 1) % slides.length)}>→</button>
        </div>
      </main>
    </div>
  );
}
