import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { press } from '../data/press.js';

const homeCss = `
  /* ── Hero ── */
  .home-hero {
    padding: 8rem 0 6rem;
    position: relative;
  }

  .hero-eyebrow {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.25rem;
    display: block;
  }

  .hero-headline {
    font-size: var(--text-hero);
    font-weight: 800;
    color: var(--cream);
    max-width: 820px;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }

  .hero-sub {
    font-family: var(--font-body);
    font-style: italic;
    font-size: var(--text-lg);
    color: var(--cream-dim);
    max-width: 560px;
    line-height: 1.6;
    margin-bottom: 2.5rem;
  }

  .hero-ctas {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  /* ── Organizations ── */
  .orgs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .org-card {
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
    transition: border-color var(--transition);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .org-card:hover {
    border-color: var(--gold);
  }

  .org-card h3 {
    font-size: var(--text-lg);
  }

  .org-card p {
    font-size: var(--text-sm);
    flex: 1;
  }

  .org-card a.card-link {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--gold);
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .org-card a.card-link:hover {
    color: var(--gold-dim);
  }

  /* ── Projects ── */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .project-card {
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: border-color var(--transition);
  }

  .project-card:hover {
    border-color: var(--gold);
  }

  .project-card h3 { font-size: 1.05rem; }
  .project-card p  { font-size: var(--text-sm); flex: 1; }

  /* ── Consulting Strip ── */
  .consulting-strip {
    background: var(--navy-mid);
    border-top: 1px solid var(--navy-light);
    border-bottom: 1px solid var(--navy-light);
    padding: 3.5rem 0;
    text-align: center;
  }

  .consulting-strip h2 {
    font-size: var(--text-xl);
    max-width: 640px;
    margin: 0 auto 1.5rem;
  }

  /* ── Press Strip ── */
  .press-strip {
    padding: 3rem 0;
  }

  .press-strip-label {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--cream-muted);
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .press-strip-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem 2rem;
    list-style: none;
  }

  .press-strip-list a {
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: var(--text-sm);
    color: var(--cream-muted);
    transition: color var(--transition);
    letter-spacing: 0.02em;
  }

  .press-strip-list a:hover {
    color: var(--cream);
  }

  /* ── Events / Subscribe ── */
  .events-section {
    padding: 5rem 0;
  }

  .events-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .events-copy h2 {
    font-size: var(--text-xl);
    margin-bottom: 1rem;
  }

  .events-copy p {
    margin-bottom: 0.75rem;
  }

  .subscribe-form {
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    padding: 2rem;
  }

  .subscribe-form h3 {
    margin-bottom: 0.5rem;
  }

  .subscribe-form p {
    font-size: var(--text-sm);
    margin-bottom: 1.25rem;
  }

  .subscribe-row {
    display: flex;
    gap: 0.75rem;
  }

  .subscribe-row input {
    flex: 1;
    background: var(--navy);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius);
    color: var(--cream);
    font-family: var(--font-body);
    font-size: var(--text-base);
    padding: 0.75rem 1rem;
    outline: none;
    transition: border-color var(--transition);
  }

  .subscribe-row input::placeholder { color: var(--cream-muted); }
  .subscribe-row input:focus { border-color: var(--gold); }

  .subscribe-status {
    margin-top: 0.75rem;
    font-family: var(--font-heading);
    font-size: var(--text-sm);
  }

  .subscribe-status.success { color: var(--gold); }
  .subscribe-status.error   { color: #e08080; }

  /* ── Blog Teaser ── */
  .blog-teaser {
    padding: 4rem 0;
    text-align: center;
  }

  .blog-teaser p {
    font-style: italic;
    font-size: var(--text-lg);
    max-width: 500px;
    margin: 0 auto 1.5rem;
  }

  @media (max-width: 900px) {
    .orgs-grid, .projects-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 640px) {
    .home-hero { padding: 5rem 0 4rem; }
    .orgs-grid, .projects-grid { grid-template-columns: 1fr; }
    .events-inner { grid-template-columns: 1fr; gap: 2.5rem; }
    .subscribe-row { flex-direction: column; }
  }
`;

function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="subscribe-form">
      <h3>Stay in the loop</h3>
      <p>Events, essays, and updates on digital wellbeing advocacy — a few times a year.</p>
      <form onSubmit={handleSubmit}>
        <div className="subscribe-row">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? '…' : 'Subscribe'}
          </button>
        </div>
        {status === 'success' && (
          <p className="subscribe-status success">You're in. Talk soon.</p>
        )}
        {status === 'error' && (
          <p className="subscribe-status error">Something went wrong. Try again.</p>
        )}
      </form>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = 'Alex Bird Becker';
    const style = document.createElement('style');
    style.textContent = homeCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="home-hero">
        <div className="container">
          <span className="hero-eyebrow">Advocate · Organizer · Builder</span>
          <h1 className="hero-headline">
            Building the infrastructure for healthier childhoods.
          </h1>
          <p className="hero-sub">
            I organize communities, build digital tools, and create coalitions that make it
            easier for families to push back on Big Tech — and push forward in schools and
            legislatures.
          </p>
          <div className="hero-ctas">
            <Link to="/work" className="btn btn-primary">See My Work</Link>
            <Link to="/speaking" className="btn btn-outline">Work With Me</Link>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Organizations */}
      <section className="section">
        <div className="container">
          <span className="section-label">Organizations</span>
          <h2 style={{ marginBottom: '2rem' }}>Where I organize</h2>
          <div className="orgs-grid">
            {[
              {
                name: 'Delco Unplugged',
                desc: "Delaware County's most active digital wellbeing advocacy group — hosting events, building community, and organizing families to push for phone-free schools.",
                url: 'https://delcounplugged.org',
                role: 'Founder & Lead Organizer',
              },
              {
                name: 'PA Unplugged',
                desc: 'A statewide coalition of hyper-local advocacy groups working to pass the Phone-Free Schools Act and reshape how Pennsylvania schools approach technology.',
                url: 'https://paunplugged.org',
                role: 'Co-Leader',
              },
              {
                name: 'Screen Free Philly',
                desc: 'A regional initiative promoting offline connection, digital detox, and in-person community events across the Philadelphia area.',
                url: 'https://screenfreephilly.org',
                role: 'Co-Founder',
              },
            ].map(org => (
              <div className="org-card" key={org.name}>
                <h3>{org.name}</h3>
                <span className="text-muted">{org.role}</span>
                <p>{org.desc}</p>
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  Visit site →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Projects */}
      <section className="section">
        <div className="container">
          <span className="section-label">Tools Built</span>
          <h2 style={{ marginBottom: '2rem' }}>Advocacy infrastructure</h2>
          <div className="projects-grid">
            {[
              {
                name: 'PA Bill Tracker',
                desc: 'A real-time tracker monitoring Pennsylvania legislation relevant to screen time, phone-free schools, and child digital wellbeing.',
                for: 'Advocates, parents, and coalition members',
                url: 'https://paunplugged.org',
              },
              {
                name: 'EdTech Advocacy Dashboard',
                desc: "A personalized action guide that helps PA parents understand what their school's tech policy looks like — and exactly what to do about it.",
                for: 'Parents and school advocates',
                url: 'https://paunplugged.org/ed-tech-guide',
              },
              {
                name: 'Parent EdTech Survey',
                desc: 'A statewide data collection tool giving PA Unplugged real evidence on how schools use technology — and how parents feel about it.',
                for: 'Coalition data and legislative advocacy',
                url: 'https://paunplugged.org/ed-tech-survey',
              },
            ].map(p => (
              <div className="project-card" key={p.name}>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <span className="text-muted">For: {p.for}</span>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  View →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting strip */}
      <div className="consulting-strip">
        <div className="container">
          <h2>I build advocacy infrastructure for mission-aligned organizations.</h2>
          <p style={{ marginBottom: '1.75rem', maxWidth: '540px', margin: '0 auto 1.75rem' }}>
            Bill trackers, action guides, survey dashboards, coalition sites — tools that help
            communities organize and legislators pay attention.
          </p>
          <Link to="/speaking" className="btn btn-primary">Let's work together</Link>
        </div>
      </div>

      {/* Press strip */}
      {press.length > 0 && (
        <div className="press-strip">
          <div className="container">
            <p className="press-strip-label">As seen in</p>
            <ul className="press-strip-list">
              {press.map(item => (
                <li key={item.publication + item.date}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.publication}
                  </a>
                </li>
              ))}
            </ul>
            <p style={{ textAlign: 'center', marginTop: '1.25rem' }}>
              <Link to="/about#press" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                View all press coverage →
              </Link>
            </p>
          </div>
        </div>
      )}

      <hr className="divider" />

      {/* Events + Subscribe */}
      <section className="events-section">
        <div className="container">
          <div className="events-inner">
            <div className="events-copy">
              <span className="section-label">Community</span>
              <h2>Offline, together.</h2>
              <p>
                Digital detox gatherings, phone-free family events, community organizing
                workshops — I'm building more in-person spaces for families who want connection
                without screens.
              </p>
              <p>Events are forming now. Get on the list and I'll let you know first.</p>
            </div>
            <SubscribeForm />
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Blog teaser */}
      <div className="blog-teaser">
        <div className="container">
          <span className="section-label">Writing</span>
          <p>
            Essays on digital wellbeing, advocacy strategy, and what it takes to build
            community in the age of the smartphone.
          </p>
          <Link to="/blog" className="btn btn-outline">Read the blog</Link>
        </div>
      </div>
    </main>
  );
}
