import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { press } from '../data/press.js';
import ContactForm from '../components/ContactForm.jsx';

const css = `
  /* ── Hero ── */
  .lp-hero {
    padding: 7rem 0 6rem;
    max-width: 780px;
  }

  .lp-hero h1 {
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 3.5vw, 2.5rem);
    font-weight: 500;
    color: var(--cream);
    line-height: 1.35;
    margin-bottom: 2.5rem;
    max-width: 680px;
  }

  .lp-hero p {
    font-style: italic;
    font-size: var(--text-lg);
    color: var(--cream-dim);
    line-height: 1.65;
    margin-bottom: 2.5rem;
    max-width: 560px;
  }

  .lp-hero-ctas {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  /* ── About ── */
  .lp-about {
    max-width: 620px;
  }

  .lp-about p {
    font-size: var(--text-lg);
    line-height: 1.75;
  }

  /* ── Work ── */
  .lp-orgs {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: 3rem;
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .lp-org-row {
    display: grid;
    grid-template-columns: 180px 1fr auto;
    gap: 1.5rem;
    align-items: center;
    padding: 1.5rem 1.75rem;
    background: var(--navy-mid);
    border-bottom: 1px solid var(--navy-light);
    transition: background var(--transition);
  }

  .lp-org-row:last-child {
    border-bottom: none;
  }

  .lp-org-row:hover {
    background: #1f3550;
  }

  .lp-org-name {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1rem;
    color: var(--cream);
  }

  .lp-org-desc {
    font-size: var(--text-sm);
    color: var(--cream-dim);
    line-height: 1.5;
  }

  .lp-projects {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .lp-project-card {
    background: var(--navy-mid);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-decoration: none;
    transition: background var(--transition);
  }

  .lp-project-card:hover {
    background: #1f3550;
  }

  .lp-project-card h3 {
    font-size: 1rem;
    color: var(--cream);
  }

  .lp-project-card p {
    font-size: var(--text-sm);
    line-height: 1.5;
    flex: 1;
  }

  .lp-project-link {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--gold);
    margin-top: 0.25rem;
  }

  /* ── Collaborate ── */
  .lp-collab-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: 4rem;
  }

  .lp-collab-card {
    background: var(--navy-mid);
    padding: 1.75rem;
  }

  .lp-collab-card h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .lp-collab-card p {
    font-size: var(--text-sm);
    line-height: 1.6;
  }

  .lp-form-intro {
    max-width: 480px;
    margin-bottom: 2rem;
  }

  .lp-form-intro h2 {
    font-size: var(--text-xl);
    margin-bottom: 0.4rem;
  }

  .lp-form-intro p {
    font-size: var(--text-sm);
  }

  /* ── Community ── */
  .lp-community-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: start;
  }

  .lp-community-copy h2 {
    font-size: var(--text-xl);
    margin-bottom: 1.25rem;
  }

  .lp-community-copy p {
    margin-bottom: 1rem;
    line-height: 1.75;
  }

  .lp-community-copy p:last-child { margin-bottom: 0; }

  .retreat-hint {
    margin-top: 2rem;
    padding: 1.5rem;
    border-left: 3px solid var(--gold);
    border-radius: 0 var(--radius) var(--radius) 0;
  }

  .retreat-hint p {
    font-style: italic;
    font-size: var(--text-sm);
    color: var(--cream-dim);
    margin: 0;
  }

  /* ── Subscribe ── */
  .subscribe-box {
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    padding: 2rem;
  }

  .subscribe-box h3 { margin-bottom: 0.4rem; }

  .subscribe-box > p {
    font-size: var(--text-sm);
    margin-bottom: 1.25rem;
    line-height: 1.5;
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

  .subscribe-note {
    margin-top: 0.75rem;
    font-family: var(--font-heading);
    font-size: var(--text-sm);
  }
  .subscribe-note.success { color: var(--gold); }
  .subscribe-note.error   { color: #e08080; }

  /* ── Press ── */
  .press-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 2rem;
    list-style: none;
    margin-top: 1.25rem;
  }

  .press-row a {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--cream-muted);
    transition: color var(--transition);
  }

  .press-row a:hover { color: var(--cream); }

  /* ── Responsive ── */
  @media (max-width: 860px) {
    .lp-org-row { grid-template-columns: 1fr; gap: 0.5rem; }
    .lp-projects { grid-template-columns: 1fr 1fr; }
    .lp-collab-grid { grid-template-columns: 1fr 1fr; }
    .lp-community-inner { grid-template-columns: 1fr; gap: 3rem; }
  }

  @media (max-width: 560px) {
    .lp-hero { padding: 5rem 0 3.5rem; }
    .lp-projects { grid-template-columns: 1fr; }
    .lp-collab-grid { grid-template-columns: 1fr; }
    .subscribe-row { flex-direction: column; }
  }
`;

const orgs = [
  {
    name: 'Delco Unplugged',
    role: 'Founder',
    desc: "Delaware County's hub for digital wellbeing — events, school board organizing, and offline community.",
    url: 'https://delcounplugged.org',
  },
  {
    name: 'PA Unplugged',
    role: 'Co-Leader',
    desc: 'A statewide coalition organizing across PA to take childhood offline and back into the real world.',
    url: 'https://paunplugged.org',
  },
  {
    name: 'Screen Free Philly',
    role: 'Co-Founder',
    desc: 'A hub for screen-free events across the Philadelphia region — organizing, promoting, and connecting people to offline experiences.',
    url: 'https://screenfreephilly.com',
  },
];

const projects = [
  { name: 'PA Bill Tracker', desc: 'Pennsylvania legislation on phone-free schools, social media safety, student privacy, and childhood independence — tracked daily.', url: 'https://bills.paunplugged.org/' },
  { name: 'EdTech Advocacy Guide', desc: 'A personalized action guide helping PA parents understand and push back on school tech policy.', url: 'https://edtechguide.paunplugged.org/' },
  { name: 'EdTech Survey Dashboard', desc: 'Real-time results from a statewide Pennsylvania survey on parent and caregiver perspectives on screen time in school.', url: 'https://dashboard.paunplugged.org/' },
];

const collabs = [
  { title: 'Co-host a gathering', desc: 'Collaborate on a screen-free event, community gathering, or offline social experience for parents, families, or any group that wants to disconnect together.' },
  { title: 'Speaking', desc: 'I speak on digital wellbeing, phone-free schools, advocacy strategy, and building grassroots coalitions. Schools, conferences, parent nights, podcasts.' },
  { title: 'Build a tool', desc: 'Need a bill tracker, action guide, survey dashboard, or coalition site? I build the digital infrastructure that turns organizing into action.' },
  { title: 'Coaching on screens', desc: 'One-on-one or small group coaching for adults or kids navigating their relationship with technology — practical, research-informed, non-judgmental.' },
  { title: 'Family tech agreements', desc: 'Help families develop their own norms around devices — not rules handed down, but something everyone actually buys into.' },
  { title: 'Something else', desc: "If you're working on anything in this space and think there might be a fit, reach out. I'm open to conversations I haven't had yet." },
];

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
    <div className="subscribe-box">
      <h3>Stay in the loop</h3>
      <p>Events, gatherings, and occasional writing — a few times a year, nothing more.</p>
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
        {status === 'success' && <p className="subscribe-note success">You're in.</p>}
        {status === 'error' && <p className="subscribe-note error">Something went wrong. Try again.</p>}
      </form>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = 'Alex Bird Becker';
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section id="hero">
        <div className="container">
          <div className="lp-hero">
            <h1>
              I work on digital wellbeing for people of all ages — through policy advocacy,
              coalition building, and tools that turn organizing into action.
            </h1>
            <div className="lp-hero-ctas">
              <a href="#work" className="btn btn-primary">See My Work</a>
              <a href="#collaborate" className="btn btn-outline">Work With Me</a>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Work */}
      <section id="work" className="section">
        <div className="container">
          <span className="section-label">Work</span>
          <h2 style={{ marginBottom: '2rem' }}>Organizations & tools</h2>

          <div className="lp-orgs">
            {orgs.map(org => (
              <div className="lp-org-row" key={org.name}>
                <span className="lp-org-name">{org.name}</span>
                <span className="lp-org-desc">{org.desc}</span>
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ whiteSpace: 'nowrap', fontSize: 'var(--text-sm)' }}
                >
                  Visit →
                </a>
              </div>
            ))}
          </div>

          <div className="lp-projects">
            {projects.map(p => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-project-card"
              >
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <span className="lp-project-link">View →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Collaborate */}
      <section id="collaborate" className="section">
        <div className="container">
          <span className="section-label">Work With Me</span>
          <h2 style={{ marginBottom: '0.75rem' }}>Let's work together.</h2>
          <p style={{ maxWidth: '520px', marginBottom: '2.5rem' }}>
            There are a lot of ways we could collaborate. A few examples — but if
            something else comes to mind, I'd still love to hear from you.
          </p>

          <div className="lp-collab-grid">
            {collabs.map(c => (
              <div className="lp-collab-card" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="lp-form-intro">
            <h2>Get in touch.</h2>
            <p>Tell me what you're working on or what you have in mind.</p>
          </div>
          <ContactForm defaultType="" />
        </div>
      </section>

      <hr className="divider" />

      {/* Community */}
      <section id="community" className="section">
        <div className="container">
          <div className="lp-community-inner">
            <div className="lp-community-copy">
              <span className="section-label">Community</span>
              <h2>The antidote to screens is each other.</h2>
              <p>
                Policy matters. But so does building actual community — the kind where
                people put their phones away and show up for each other in person.
              </p>
              <p>
                Through Delco Unplugged and Screen Free Philly, I organize gatherings,
                events, and offline social spaces across the Philadelphia region.
                These aren't lectures about screen time. They're just good excuses
                to be together without devices.
              </p>
              <div className="retreat-hint">
                <p>
                  Working toward something bigger: a multi-day offline retreat for families
                  who want to disconnect together. If that sounds like you, get on the list.
                </p>
              </div>
            </div>
            <SubscribeForm />
          </div>
        </div>
      </section>

      {/* Press */}
      {press.length > 0 && (
        <>
          <hr className="divider" />
          <section className="section-sm">
            <div className="container">
              <span className="text-muted" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.75rem' }}>As seen in</span>
              <ul className="press-row">
                {press.map(item => (
                  <li key={item.publication + item.date}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.publication}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      {/* About */}
      <hr className="divider" />
      <section id="about" className="section">
        <div className="container">
          <span className="section-label">About</span>
          <div className="lp-about">
            <p>
              Alex lives in Delaware County, PA with her family. She is passionate about civics, culture, and
              language. She believes in what becomes possible when people act in service of
              something larger than themselves.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
