import { Link } from 'react-router-dom';
import {
  anniversaryCountdownCopy,
  getUpcomingAnniversaries,
  type UpcomingAnniversary,
} from '@/data/anniversaries';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import './Anniversaries.css';

function linkedCountdownCopy(event: UpcomingAnniversary) {
  if (event.kind === 'birthday') return anniversaryCountdownCopy(event);

  const name = event.kind === 'variety' ? event.title : event.role;
  const prefix = event.kind === 'variety'
    ? (event.days === 0 ? '今天是' : '距离')
    : '距离与';
  const suffix = event.kind === 'variety'
    ? `播出 ${event.anniversaryYear} 周年${event.days === 0 ? '纪念日' : `还有 ${event.days} 天`}`
    : `初见 ${event.anniversaryYear} 周年还有 ${event.days} 天`;

  return (
    <>
      {prefix}
      <Link className="anniversary-name-link" to={`/works/${event.id}`}>
        {name}
      </Link>
      {suffix}
    </>
  );
}

export function Anniversaries() {
  useDocumentTitle('纪念日 · The Universe of Yang');
  const anniversaries = getUpcomingAnniversaries();

  return (
    <div className="anniversaries-page">
      <header className="anniversaries-nav">
        <Link to="/" className="anniversaries-brand">
          <b>YANG / ARCHIVE</b>
          <small>THE UNIVERSE OF YANG</small>
        </Link>
        <nav aria-label="内容栏目导航">
          <Link to="/timeline/alternate">
            <b>时间轴</b>
            <small>TIMELINE</small>
          </Link>
          <Link className="is-active" to="/anniversaries">
            <b>纪念日</b>
            <small>ANNIVERSARIES</small>
          </Link>
        </nav>
        <Link to="/explore" className="anniversaries-back">
          返回探索大厅 ↙
        </Link>
      </header>

      <main className="anniversaries-main">
        <section className="anniversaries-intro">
          <span>LIGHT MEETS TIME · {String(anniversaries.length).padStart(2, '0')}</span>
          <h1>与他的纪念日</h1>
          <p>生日、角色初见与每一次如约重逢，都在时间长河里熠熠生辉。</p>
        </section>

        <section className="anniversary-list" aria-label="即将到来的纪念日">
          {anniversaries.map((event, index) => (
            <article className={index === 0 ? 'is-next' : ''} key={event.id}>
              <div className="anniversary-index">
                <span>{index === 0 ? 'NEXT' : String(index + 1).padStart(2, '0')}</span>
                <time
                  dateTime={`${event.targetYear}-${String(event.month).padStart(2, '0')}-${String(event.day).padStart(2, '0')}`}
                >
                  {String(event.month).padStart(2, '0')}.{String(event.day).padStart(2, '0')}
                </time>
              </div>
              <div className="anniversary-copy">
                <small>
                  {event.kind === 'birthday'
                    ? 'BIRTHDAY'
                    : `${event.kind === 'variety' ? 'VARIETY' : 'ROLE'} ANNIVERSARY · ${event.title}`}
                </small>
                <h2>{linkedCountdownCopy(event)}</h2>
                <p>
                  {event.kind === 'birthday'
                    ? `${event.targetYear} 年 · 第 ${event.anniversaryYear} 个生日`
                    : event.kind === 'variety'
                      ? `《${event.title}》· 初次播出于 ${event.originalDate}`
                      : `以${event.medium === 'film' ? '上映' : '播出'}日期为准`}
                </p>
              </div>
              <div className="anniversary-days" aria-label={`${event.days} 天`}>
                <strong>{event.days}</strong>
                <span>{event.days === 0 ? 'TODAY' : 'DAYS'}</span>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
