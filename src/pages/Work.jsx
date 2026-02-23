import { useEffect } from 'react';

const workCss = `
  .work-orgs {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 800px;
  }

  .work-org-item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem 2rem;
    align-items: start;
    padding: 2rem;
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    transition: border-color var(--transition);
  }

  .work-org-item:hover {
    border-color: var(--gold);
  }

  .work-org-item h3 {
    font-size: var(--text-lg);
    margin-bottom: 0.25rem;
  }

  .work-org-item .role-badge {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--gold);
    margin-bottom: 0.75rem;
    display: block;
  }

  .work-org-item p {
    font-size: var(--text-sm);
    line-height: 1.6;
  }

  .work-org-link {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 600;
    white-space: nowrap;
    align-self: flex-start;
    margin-top: 0.1rem;
  }

  /* Projects Grid */
  .projects-detail-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .project-detail-card {
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: border-color var(--transition);
  }

  .project-detail-card:hover {
    border-color: var(--gold);
  }

  .project-detail-card h3 {
    font-size: 1.05rem;
  }

  .project-detail-card .for-label {
    font-family: var(--font-heading);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--cream-muted);
  }

  .project-detail-card p {
    font-size: var(--text-sm);
    flex: 1;
    line-height: 1.6;
  }

  @media (max-width: 860px) {
    .projects-detail-grid { grid-template-columns: 1fr 1fr; }
    .work-org-item { grid-template-columns: 1fr; }
    .work-org-link { align-self: flex-start; }
  }

  @media (max-width: 560px) {
    .projects-detail-grid { grid-template-columns: 1fr; }
  }
`;

const orgs = [
  {
    name: 'Delco Unplugged',
    role: 'Founder & Lead Organizer',
    url: 'https://delcounplugged.org',
    desc: "Delaware County's hub for digital wellbeing — events, school board organizing, and offline community.",
  },
  {
    name: 'PA Unplugged',
    role: 'Co-Leader',
    url: 'https://paunplugged.org',
    desc: 'A statewide coalition organizing across PA to take childhood offline and back into the real world.',
  },
  {
    name: 'Screen Free Philly',
    role: 'Co-Founder',
    url: 'https://screenfreephilly.com',
    desc: 'A hub for screen-free events across the Philadelphia region — organizing, promoting, and connecting people to offline experiences worth showing up for.',
  },
];

const projects = [
  {
    name: 'PA Bill Tracker',
    what: 'Pennsylvania legislation on phone-free schools, social media safety, student privacy, and childhood independence — tracked daily.',
    who: 'Advocates, parents, and coalition members who need to stay current on relevant bills without monitoring LRS full-time.',
    url: 'https://bills.paunplugged.org/',
  },
  {
    name: 'EdTech Advocacy Dashboard',
    what: 'A personalized action guide that walks PA parents through their school\'s technology policy and generates a specific action plan.',
    who: 'Parents and school-level advocates who want to start conversations with teachers, principals, and school boards.',
    url: 'https://edtechguide.paunplugged.org/',
  },
  {
    name: 'EdTech Survey Dashboard',
    what: 'Real-time results from a statewide Pennsylvania survey on parent and caregiver perspectives on screen time in school.',
    who: 'The coalition, for legislative testimony, media, and building the case for policy change.',
    url: 'https://dashboard.paunplugged.org/',
  },
];

export default function Work() {
  useEffect(() => {
    document.title = 'Work — Alex Bird Becker';
    const style = document.createElement('style');
    style.textContent = workCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <main>
      <div className="page-header container">
        <span className="section-label">Work</span>
        <h1>Organizations & Tools</h1>
      </div>

      <hr className="divider" />

      {/* Organizations */}
      <section className="section">
        <div className="container">
          <span className="section-label">Organizations</span>
          <h2 style={{ marginBottom: '2rem' }}>Where I organize</h2>
          <div className="work-orgs">
            {orgs.map(org => (
              <div className="work-org-item" key={org.name}>
                <div>
                  <h3>{org.name}</h3>
                  <span className="role-badge">{org.role}</span>
                  <p>{org.desc}</p>
                </div>
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-org-link btn btn-outline"
                >
                  Visit →
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
          <div className="projects-detail-grid">
            {projects.map(p => (
              <div className="project-detail-card" key={p.name}>
                <h3>{p.name}</h3>
                <p>{p.what}</p>
                <span className="for-label">For: {p.who}</span>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--gold)', marginTop: '0.25rem' }}
                >
                  View →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
