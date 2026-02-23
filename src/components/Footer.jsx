import { Link } from 'react-router-dom';

const footerCss = `
  .footer {
    background: var(--navy-mid);
    border-top: 1px solid var(--navy-light);
    padding: 3rem 0 2rem;
    margin-top: auto;
  }

  .footer-inner {
    max-width: var(--max-w);
    margin: 0 auto;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 3rem;
    align-items: start;
  }

  .footer-brand p {
    font-family: var(--font-heading);
    font-weight: 700;
    color: var(--cream);
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .footer-brand span {
    font-size: var(--text-sm);
    color: var(--cream-muted);
  }

  .footer-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-nav a {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    color: var(--cream-dim);
  }

  .footer-nav a:hover {
    color: var(--cream);
  }

  .footer-external {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-external a {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    color: var(--cream-dim);
  }

  .footer-external a:hover {
    color: var(--gold);
  }

  .footer-bottom {
    max-width: var(--max-w);
    margin: 2rem auto 0;
    padding: 1.5rem 1.5rem 0;
    border-top: 1px solid var(--navy-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .footer-bottom span {
    font-size: var(--text-sm);
    color: var(--cream-muted);
  }

  @media (max-width: 640px) {
    .footer-inner {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

import { useEffect } from 'react';

export default function Footer() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = footerCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p>Alex Bird Becker</p>
          <span>Greater Philadelphia</span>
        </div>
        <nav className="footer-nav">
          <Link to="/about">About</Link>
          <Link to="/work">Work</Link>
          <Link to="/writing">Writing</Link>
          <Link to="/work-with-me">Work With Me</Link>
        </nav>
        <div className="footer-external">
          <a href="https://delcounplugged.org" target="_blank" rel="noopener noreferrer">Delco Unplugged</a>
          <a href="https://paunplugged.org" target="_blank" rel="noopener noreferrer">PA Unplugged</a>
          <a href="https://screenfreephilly.com" target="_blank" rel="noopener noreferrer">Screen Free Philly</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Alex Bird Becker</span>
        <span>Greater Philadelphia</span>
      </div>
    </footer>
  );
}
