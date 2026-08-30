import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import './About.css';

const team = [
  { role: '出品', name: '杨洋官方后援会' },
  { role: '总策划', name: '' },
  { role: '视觉设计', name: '' },
  { role: '图片整理', name: '' },
  { role: '文案策划', name: '' },
  { role: '网站开发', name: '' },
];

export function About() {
  useDocumentTitle('关于本站 · The Universe of Yang');

  return (
    <div className="about-page">
      <header className="about-nav">
        <Link to="/" className="about-brand">
          <b>YANG / ARCHIVE</b>
          <small>THE UNIVERSE OF YANG</small>
        </Link>
        <span>ABOUT THE ARCHIVE</span>
        <Link to="/explore" className="about-back">
          返回探索大厅 ↙
        </Link>
      </header>

      <main className="about-main">
        <aside className="about-index" aria-label="页面目录">
          <span>ARCHIVE NOTES · 2026</span>
          <nav>
            <a href="#about">01 / 关于本站</a>
            <a href="#credits">02 / 来源与致谢</a>
            <a href="#copyright">03 / 图片来源与版权说明</a>
            <a href="#continuation">04 / 未完待续</a>
          </nav>
        </aside>

        <div className="about-content">
          <section id="about" className="about-section about-section--lead">
            <span className="about-number">01 / ABOUT</span>
            <h1>关于本站</h1>
            <p className="about-opening">若将一路走来的故事装订成册，该从哪一页写起？</p>
            <p>
              或许从一个角色第一次拥有姓名写起，从一部作品第一次与观众相见写起；从某一天郑重启程的期待写起，也从某一刻挥手作别的不舍写起。
            </p>
            <p>昨日的青涩仍可回望，今日的脚步依然坚定，下一程的故事，也正在前方等待落笔。</p>
            <p>
              我们相信，无论过了多少年，我们始终记得第一次与他初见的悸动；记得为一个角色辗转牵挂的朝夕；记得陪他走过一程又一程的欢喜。
            </p>
            <p>
              正是这些被共同珍藏的相遇、等待与欢喜，将素未谋面的我们联系在一起。于是，我们循着记忆的来处，将散落在不同年岁里的故事一一拾起，将珍重于心的瞬间一一收藏。
            </p>
            <p>因此，我们以时间为轴，以作品为章，将散落在不同年份里的角色、影像与重要时刻汇聚于此。</p>
            <p>
              让每一次相遇都有期可寻，让每一段故事都有章可循，让一路走来的万千种模样，都能在这里被再次看见。
            </p>
            <p>
              愿这一方天地，容得下曾经的怦然心动，也盛得住此后的山长水阔；愿屏幕之上的篇章不断翻新，屏幕之外的陪伴始终如一。
            </p>
            <blockquote>山海尚阔，新章未止。</blockquote>
          </section>

          <section id="credits" className="about-section">
            <span className="about-number">02 / CREDITS</span>
            <h2>来源与致谢</h2>
            <p>
              这个网站从一个念头开始，经由一次次讨论、整理、书写与修改，才有了如今的模样。每一页内容的呈现，都离不开许多人的共同参与与认真付出。
            </p>

            <div className="about-team" aria-label="制作团队">
              <h3>制作团队</h3>
              <dl>
                {team.map((member) => (
                  <div key={member.role}>
                    <dt>{member.role}</dt>
                    <dd>{member.name || <span aria-label="暂未填写">—</span>}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p>感谢每一位参与策划、设计、资料搜集、图片整理、文案撰写与网站制作的成员。</p>
            <p>
              因为一次次细致的搜寻与打磨，散落各处的片段得以在此相连；因为一份份真挚的热爱与用心，最初落于纸上的构想，终于成为此刻与你相见的模样。
            </p>
          </section>

          <section id="copyright" className="about-section">
            <span className="about-number">03 / SOURCES</span>
            <h2>图片来源与版权说明</h2>
            <p>
              本站为杨洋官方后援会策划制作的非商业性质粉丝网站，仅用于杨洋相关作品、角色、活动及公开资料的整理、记录、展示与纪念，不用于任何商业用途。
            </p>
            <p>
              本站所使用的图片已取得相关授权，在此特别感谢所有给予授权与支持的老师及创作者。图片主要整理自微博 @杨洋资讯站、@杨洋官方后援会、@追剧纪，杨洋相关影视作品官方账号，以及其他公开网络渠道。感谢所有记录、整理与分享这些珍贵影像的创作者与资料提供者。
            </p>
            <p>
              本站尊重所有图片、文字及相关素材的著作权与署名权。相关素材版权均归原作者、摄影师、版权方及相应官方机构所有，本站的收录与展示不代表对相关素材版权的取得，亦不进行任何形式的商业使用或二次授权。
            </p>
            <p>
              对于来源于公开网络、暂时无法追溯原始出处或完整署名信息的素材，我们已尽可能核实其来源。如本站内容存在来源标注遗漏、署名不当，或涉及未经许可使用等情况，敬请相关权利人联系我们。经核实后，我们将及时补充来源、更正署名或删除相关内容。
            </p>
            <p>最后，谨向所有为这些影像与故事留下记录的人致以感谢。</p>
            <blockquote>因为有人记录，昨日才有迹可循；因为有人珍藏，故事才得以再次相逢。</blockquote>
          </section>

          <section id="continuation" className="about-section">
            <span className="about-number">04 / TO BE CONTINUED</span>
            <h2>未完待续</h2>
            <p className="about-opening">此刻与你见面的，是本站的第一期。</p>
            <p>
              从最初的构想落到屏幕之上，我们先以时间为线，将一路走来的作品、角色与值得纪念的日期逐一整理，让散落在不同年月里的故事，在这里拥有一处可以循迹、可以重逢的坐标。
            </p>
            <p>但这并不是它最终的模样。</p>
            <p>
              关于杨洋，还有太多值得收藏的故事，也还有许多尚未实现的想法与创意。未来，我们会继续丰富本站的内容与形式，让更多记忆被妥帖安放，也让新的故事随着时间不断写入其中。
            </p>
            <p>
              我们也期待听见每一位来访者的声音。如果你对网站的内容、设计与使用体验有任何意见或建议，或是脑海中恰好有一个有趣的想法，欢迎告诉我们。也许下一次更新里，就会有一份灵感来自屏幕前的你。
            </p>
            <p>第一期是一次相见，也是一场启程。</p>
            <blockquote>页面仍在延展，故事仍在发生，我们与下一次更新，再见。</blockquote>
          </section>
        </div>
      </main>
    </div>
  );
}
