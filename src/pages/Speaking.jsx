import { useEffect } from 'react';
import ContactForm from '../components/ContactForm.jsx';

const speakingCss = `
  .speaking-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .topics-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 1.25rem;
  }

  .topics-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--navy-light);
    font-size: var(--text-sm);
    color: var(--cream-dim);
    line-height: 1.5;
  }

  .topics-list li:last-child {
    border-bottom: none;
  }

  .topic-dot {
    width: 6px;
    height: 6px;
    min-width: 6px;
    border-radius: 50%;
    background: var(--gold);
    margin-top: 0.45rem;
  }

  .formats-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .format-chip {
    background: var(--navy-light);
    color: var(--cream-dim);
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 500;
    padding: 0.35rem 0.85rem;
    border-radius: 100px;
  }

  .consulting-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 1rem;
  }

  .consulting-list li {
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--navy-light);
    font-size: var(--text-sm);
    color: var(--cream-dim);
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .consulting-list li:last-child {
    border-bottom: none;
  }

  .section-block {
    margin-bottom: 3rem;
  }

  .section-block h3 {
    margin-bottom: 0.5rem;
  }

  .section-block p {
    font-size: var(--text-sm);
    line-height: 1.6;
  }

  @media (max-width: 860px) {
    .speaking-layout { grid-template-columns: 1fr; gap: 3rem; }
  }
`;

const topics = [
  'Phone-free schools: the case, the policy, and the pushback',
  'How parents can organize at the local level — and win',
  'Tech in the classroom: what the research says and what parents can do',
  'Building coalitions across communities: lessons from PA Unplugged',
  'Advocacy infrastructure: how digital tools help grassroots groups scale',
  'Digital wellbeing for families: beyond screen time limits',
];

const formats = ['Keynote', 'Panel', 'Workshop', 'Podcast', 'Fireside chat', 'Parent night'];

const buildServices = [
  'Legislative bill trackers',
  'Parent action guides and personalized dashboards',
  'Community survey tools and data collection',
  'Coalition websites and action hubs',
  'Email list building and outreach infrastructure',
  'Resource libraries and advocacy toolkits',
];

export default function Speaking() {
  useEffect(() => {
    document.title = 'Speaking & Consulting — Alex Bird Becker';
    const style = document.createElement('style');
    style.textContent = speakingCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <main>
      <div className="page-header container">
        <span className="section-label">Speaking & Consulting</span>
        <h1>Bring Alex to your event.</h1>
      </div>

      <hr className="divider" />

      <section className="section">
        <div className="container">
          <div className="speaking-layout">
            <div>
              {/* Speaking */}
              <div className="section-block">
                <span className="section-label">Speaking</span>
                <h3>Topics</h3>
                <ul className="topics-list">
                  {topics.map(t => (
                    <li key={t}>
                      <span className="topic-dot" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="section-block">
                <h3>Formats</h3>
                <div className="formats-row">
                  {formats.map(f => (
                    <span className="format-chip" key={f}>{f}</span>
                  ))}
                </div>
              </div>

              <div className="section-block">
                <h3>Past engagements</h3>
                <p style={{ color: 'var(--cream-muted)', fontStyle: 'italic' }}>
                  Community forums, school board meetings, state advocacy days, and parent
                  education events across Pennsylvania and the greater Philadelphia region.
                  Booking details available on request.
                </p>
              </div>

              {/* Consulting */}
              <hr className="divider" style={{ margin: '2.5rem 0' }} />

              <div className="section-block">
                <span className="section-label">Consulting & Build</span>
                <h3>I build advocacy tools for mission-aligned organizations.</h3>
                <p style={{ marginTop: '0.75rem', marginBottom: '0' }}>
                  Parent groups, coalitions, and nonprofits often have more energy than
                  infrastructure. I build the digital scaffolding that turns organizing into
                  measurable action — and helps you tell that story to funders, legislators,
                  and the press.
                </p>
                <ul className="consulting-list">
                  {buildServices.map(s => (
                    <li key={s}>
                      <span className="topic-dot" style={{ marginTop: '0.45rem' }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>Get in touch</span>
              <h3 style={{ marginBottom: '1.5rem' }}>Tell me about your project or event</h3>
              <ContactForm defaultType="" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
