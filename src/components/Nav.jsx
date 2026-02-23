import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navCss = `
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(14, 26, 43, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid transparent;
    transition: border-color 200ms ease;
  }

  .nav.scrolled {
    border-bottom-color: var(--navy-light);
  }

  .nav-inner {
    max-width: var(--max-w);
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 112px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    line-height: 0;
  }

  .nav-logo img {
    height: 88px;
    width: auto;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
  }

  .nav-links a {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--cream-dim);
    letter-spacing: 0.02em;
    text-decoration: none;
    transition: color 200ms ease;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: var(--cream);
  }

  .nav-links .nav-cta {
    color: var(--gold);
    font-weight: 600;
  }

  .nav-links .nav-cta:hover {
    color: var(--gold-dim);
  }

  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 4px;
  }

  .nav-hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--cream);
    transition: transform 200ms ease, opacity 200ms ease;
  }

  .nav-hamburger.open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .nav-hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .nav-hamburger.open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  @media (max-width: 700px) {
    .nav-hamburger {
      display: flex;
    }

    .nav-links {
      display: none;
      position: absolute;
      top: 112px;
      left: 0;
      right: 0;
      background: var(--navy-mid);
      border-bottom: 1px solid var(--navy-light);
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      padding: 1rem 1.5rem 1.5rem;
    }

    .nav-links.open {
      display: flex;
    }

    .nav-links li {
      width: 100%;
    }

    .nav-links a {
      display: block;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--navy-light);
      font-size: 1rem;
    }

    .nav-links li:last-child a {
      border-bottom: none;
    }
  }

  /* Push page content below fixed nav */
  #root > div:first-of-type,
  main {
    padding-top: 112px;
  }
`;

const links = [
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/blog', label: 'Blog' },
  { to: '/speaking', label: 'Speaking', cta: true },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = navCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
          <img src="/logo-cream.svg" alt="Alex Bird Becker" />
        </Link>
        <button
          className={`nav-hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          {links.map(({ to, label, cta }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  [isActive ? 'active' : '', cta ? 'nav-cta' : ''].join(' ').trim()
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
