import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { press } from '../data/press.js';

const aboutCss = `
  .about-bio {
    max-width: var(--max-w-prose);
    line-height: 1.8;
  }

  .about-bio p {
    margin-bottom: 1.25rem;
    font-size: var(--text-base);
  }

  .about-layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 5rem;
    align-items: start;
  }

  .about-sidebar {
    position: sticky;
    top: 80px;
  }

  .timeline {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--navy-light);
  }

  .timeline-item:last-child {
    border-bottom: none;
  }

  .timeline-year {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--gold);
    padding-top: 0.1rem;
  }

  .timeline-desc {
    font-size: var(--text-sm);
    color: var(--cream-dim);
    line-height: 1.5;
  }

  .timeline-desc strong {
    font-family: var(--font-heading);
    font-weight: 600;
    color: var(--cream);
    display: block;
    margin-bottom: 0.1rem;
  }

  .pull-quote {
    margin: 4rem 0;
    padding: 2rem 0 2rem 2rem;
    border-left: 3px solid var(--gold);
  }

  .pull-quote p {
    font-style: italic;
    font-size: clamp(1.2rem, 2.5vw, 1.6rem);
    color: var(--cream);
    line-height: 1.5;
  }

  /* ── Press Grid ── */
  .press-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .press-card {
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: border-color var(--transition);
    text-decoration: none;
  }

  .press-card:hover {
    border-color: var(--gold);
  }

  .press-pub {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 0.02em;
  }

  .press-type-badge {
    display: inline-block;
    font-family: var(--font-heading);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: var(--navy-light);
    color: var(--cream-muted);
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
    margin-left: 0.5rem;
  }

  .press-headline {
    font-size: var(--text-sm);
    color: var(--cream);
    line-height: 1.4;
    font-family: var(--font-heading);
    font-weight: 500;
  }

  .press-date {
    font-size: 0.8rem;
    color: var(--cream-muted);
    font-family: var(--font-heading);
    margin-top: auto;
  }

  @media (max-width: 900px) {
    .about-layout { grid-template-columns: 1fr; gap: 3rem; }
    .about-sidebar { position: static; }
    .press-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 580px) {
    .press-grid { grid-template-columns: 1fr; }
  }
`;

const timeline = [
  { year: '2021', title: 'Elementary Teacher', desc: '4th & 5th grade, Delaware County' },
  { year: '2022', title: 'Researcher', desc: 'Graduate work on child development & technology' },
  { year: '2023', title: 'Delco Unplugged', desc: 'Founded Delaware County\'s first digital wellbeing advocacy group' },
  { year: '2024', title: 'PA Unplugged', desc: 'Co-launched statewide coalition; advocacy in Harrisburg begins' },
  { year: '2025', title: 'Screen Free Philly', desc: 'Co-founded regional digital detox and community events initiative' },
  { year: '2026', title: 'Phone-Free Schools Act', desc: 'Coalition pushing SB 1234 through the Pennsylvania Senate' },
];

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function About() {
  useEffect(() => {
    document.title = 'About — Alex Bird Becker';
    const style = document.createElement('style');
    style.textContent = aboutCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <main>
      <div className="page-header container">
        <span className="section-label">About</span>
        <h1>Researcher. Teacher. Advocate.</h1>
      </div>

      <hr className="divider" />

      <section className="section">
        <div className="container">
          <div className="about-layout">
            <div className="about-bio">
              <p>
                I'm Alex Bird Becker — a researcher by training, a former 4th and 5th grade
                elementary school teacher by vocation, and an organizer by necessity. I live in
                Delaware County, Pennsylvania, with my husband and two kids.
              </p>
              <p>
                After years in the classroom watching what smartphones and social media were doing
                to children, I started asking hard questions — about school technology policies,
                about the role of EdTech vendors in public education, and about what parents
                actually had the power to change. The answers led me to organizing.
              </p>
              <p>
                In 2023, I founded <strong style={{ color: 'var(--cream)' }}>Delco Unplugged</strong>,
                which became one of the most active digital wellbeing advocacy groups in
                Pennsylvania. We go beyond phone pledges — we host community events, push school
                boards, and build the kind of offline connection that screens have eroded.
              </p>
              <p>
                That work grew into{' '}
                <strong style={{ color: 'var(--cream)' }}>PA Unplugged</strong>, a statewide
                coalition I co-lead with Kristen Beddard. We're a network of hyper-local groups
                across Pennsylvania working toward the Phone-Free Schools Act and a broader
                reckoning with how technology shapes childhood.
              </p>
              <p>
                I also build the digital tools that advocacy organizations need but can't always
                find — bill trackers, action guides, survey dashboards, coalition sites. If you
                have a mission and need infrastructure to match, let's talk.
              </p>

              <div className="pull-quote">
                <p>
                  "The work is not getting kids off their phones. The work is rebuilding the
                  conditions in which childhood can actually flourish."
                </p>
              </div>
            </div>

            <div className="about-sidebar">
              <span className="section-label" style={{ marginBottom: '1.25rem', display: 'block' }}>Timeline</span>
              <ul className="timeline">
                {timeline.map(item => (
                  <li className="timeline-item" key={item.year + item.title}>
                    <span className="timeline-year">{item.year}</span>
                    <span className="timeline-desc">
                      <strong>{item.title}</strong>
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Press */}
      <hr className="divider" />

      <section className="section" id="press">
        <div className="container">
          <span className="section-label">Press</span>
          <h2 style={{ marginBottom: '2rem' }}>In the news</h2>
          {press.length > 0 ? (
            <div className="press-grid">
              {press.map(item => (
                <a
                  key={item.publication + item.date}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-card"
                >
                  <span className="press-pub">
                    {item.publication}
                    <span className="press-type-badge">{item.type}</span>
                  </span>
                  <p className="press-headline">{item.headline}</p>
                  <span className="press-date">{formatDate(item.date)}</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-muted">Press mentions coming soon.</p>
          )}
        </div>
      </section>

      <hr className="divider" />

      {/* CTA */}
      <section className="section-sm" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '0.75rem' }}>Want to bring me to your event?</h2>
          <p style={{ marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            I speak on digital wellbeing, advocacy strategy, and building grassroots coalitions.
          </p>
          <Link to="/speaking" className="btn btn-primary">Speaking & Consulting</Link>
        </div>
      </section>
    </main>
  );
}
