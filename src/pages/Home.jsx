import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { press } from '../data/press.js';

const homeCss = `
  /* Hero */
  .home-hero {
    padding: 8rem 0 6rem;
    max-width: 760px;
  }

  .hero-headline {
    font-size: var(--text-hero);
    font-weight: 800;
    color: var(--cream);
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }

  .hero-sub {
    font-style: italic;
    font-size: var(--text-lg);
    color: var(--cream-dim);
    line-height: 1.65;
    margin-bottom: 2.5rem;
    max-width: 560px;
  }

  .hero-ctas {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  /* Pillars */
  .pillars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .pillar {
    background: var(--navy-mid);
    padding: 2rem 1.75rem;
  }

  .pillar-num {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
    display: block;
  }

  .pillar h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  .pillar p {
    font-size: var(--text-sm);
    line-height: 1.6;
  }

  /* Community section */
  .community-section {
    padding: 6rem 0;
  }

  .community-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: start;
  }

  .community-copy h2 {
    font-size: var(--text-xl);
    margin-bottom: 1.25rem;
  }

  .community-copy p {
    margin-bottom: 1rem;
    line-height: 1.75;
  }

  .community-copy p:last-child {
    margin-bottom: 0;
  }

  .retreat-hint {
    margin-top: 2rem;
    padding: 1.5rem;
    border: 1px solid var(--navy-light);
    border-left: 3px solid var(--gold);
    border-radius: 0 var(--radius) var(--radius) 0;
  }

  .retreat-hint p {
    font-style: italic;
    font-size: var(--text-sm);
    color: var(--cream-dim);
    margin: 0;
  }

  /* Subscribe */
  .subscribe-box {
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    padding: 2rem;
  }

  .subscribe-box h3 {
    margin-bottom: 0.4rem;
  }

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

  /* Press */
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

  @media (max-width: 860px) {
    .pillars { grid-template-columns: 1fr; gap: 0; }
    .community-inner { grid-template-columns: 1fr; gap: 3rem; }
  }

  @media (max-width: 560px) {
    .home-hero { padding: 5rem 0 3.5rem; }
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
    style.textContent = homeCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <main>
      {/* Hero */}
      <div className="container">
        <div className="home-hero">
          <h1 className="hero-headline">
            Building healthier childhoods, offline and on.
          </h1>
          <p className="hero-sub">
            I'm an advocate, community organizer, and builder working at the intersection of
            digital wellbeing, policy, and the kind of in-person connection that screens
            can't replace.
          </p>
          <div className="hero-ctas">
            <Link to="/work" className="btn btn-primary">See My Work</Link>
            <Link to="/speaking" className="btn btn-outline">Work With Me</Link>
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* Pillars */}
      <section className="section">
        <div className="container">
          <div className="pillars">
            <div className="pillar">
              <span className="pillar-num">01</span>
              <h3>Advocacy & Policy</h3>
              <p>
                Co-leading PA Unplugged's statewide push for the Phone-Free Schools Act.
                Organizing communities, coordinating with legislators, building the coalition.
              </p>
            </div>
            <div className="pillar">
              <span className="pillar-num">02</span>
              <h3>Community & Gatherings</h3>
              <p>
                Hosting screen-free events, offline socials, and building spaces for
                families to connect without devices. Retreats in the works.
              </p>
            </div>
            <div className="pillar">
              <span className="pillar-num">03</span>
              <h3>Speaking & Consulting</h3>
              <p>
                Speaking on digital wellbeing and advocacy strategy. Building tools and
                infrastructure for mission-aligned organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Community */}
      <section className="community-section">
        <div className="container">
          <div className="community-inner">
            <div className="community-copy">
              <span className="section-label">Community</span>
              <h2>The antidote to screens is each other.</h2>
              <p>
                Policy matters. But so does building actual community — the kind where
                people put their phones away and show up for each other in person.
              </p>
              <p>
                Through Delco Unplugged and Screen Free Philly, I organize gatherings,
                events, and offline social spaces for families across the Philadelphia
                region. These aren't lectures about screen time. They're just good excuses
                to be together without devices.
              </p>
              <p>
                I'm experienced facilitating community experiences of all sizes — from
                neighborhood parent nights to multi-organization events — and I'm available
                to bring that to groups, schools, and organizations looking to build more
                offline culture.
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
    </main>
  );
}
