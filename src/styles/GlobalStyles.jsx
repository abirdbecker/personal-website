import { useEffect } from 'react';

const css = `
  /* ── Custom Properties ─────────────────────────────────── */
  :root {
    --navy:        #0e1a2b;
    --navy-mid:    #1a2d45;
    --navy-light:  #253d5c;
    --cream:       #f5efe4;
    --cream-dim:   #c8bfb0;
    --cream-muted: #8a8070;
    --gold:        #c9a84c;
    --gold-dim:    #a07830;

    --font-heading: 'DM Sans', sans-serif;
    --font-body:    'Lora', serif;

    --text-hero: clamp(2.5rem, 6vw, 5rem);
    --text-xl:   clamp(1.5rem, 3vw, 2.25rem);
    --text-lg:   1.25rem;
    --text-base: 1.0625rem;
    --text-sm:   0.875rem;

    --radius: 6px;
    --radius-lg: 12px;
    --transition: 200ms ease;
    --max-w: 1100px;
    --max-w-prose: 680px;
  }

  /* ── Reset ──────────────────────────────────────────────── */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--navy);
    color: var(--cream-dim);
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    color: var(--gold);
    text-decoration: none;
    transition: color var(--transition);
  }

  a:hover {
    color: var(--gold-dim);
  }

  /* ── Typography ─────────────────────────────────────────── */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    color: var(--cream);
    line-height: 1.2;
    font-weight: 700;
  }

  h1 { font-size: var(--text-hero); font-weight: 800; }
  h2 { font-size: var(--text-xl); }
  h3 { font-size: var(--text-lg); }

  p { color: var(--cream-dim); }

  /* ── Layout Helpers ─────────────────────────────────────── */
  .container {
    max-width: var(--max-w);
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .section {
    padding: 5rem 0;
  }

  .section-sm {
    padding: 3rem 0;
  }

  /* ── Buttons ─────────────────────────────────────────────── */
  .btn {
    display: inline-block;
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.75rem 1.75rem;
    border-radius: var(--radius);
    cursor: pointer;
    transition: background var(--transition), color var(--transition), border-color var(--transition);
    text-decoration: none;
    border: 2px solid transparent;
  }

  .btn-primary {
    background: var(--gold);
    color: var(--navy);
    border-color: var(--gold);
  }

  .btn-primary:hover {
    background: var(--gold-dim);
    border-color: var(--gold-dim);
    color: var(--navy);
  }

  .btn-outline {
    background: transparent;
    color: var(--cream);
    border-color: var(--navy-light);
  }

  .btn-outline:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  /* ── Cards ───────────────────────────────────────────────── */
  .card {
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
    transition: border-color var(--transition);
  }

  .card:hover {
    border-color: var(--gold);
  }

  .card h3 {
    font-size: var(--text-lg);
    margin-bottom: 0.5rem;
  }

  .card p {
    font-size: var(--text-sm);
    color: var(--cream-dim);
    line-height: 1.6;
  }

  /* ── Section Headers ─────────────────────────────────────── */
  .section-label {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.75rem;
    display: block;
  }

  /* ── Page Header ─────────────────────────────────────────── */
  .page-header {
    padding: 6rem 0 3rem;
  }

  .page-header h1 {
    font-size: var(--text-xl);
    max-width: 700px;
  }

  /* ── Divider ─────────────────────────────────────────────── */
  .divider {
    border: none;
    border-top: 1px solid var(--navy-light);
    margin: 0;
  }

  /* ── Form Elements ───────────────────────────────────────── */
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-group label {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--cream-dim);
    letter-spacing: 0.02em;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius);
    color: var(--cream);
    font-family: var(--font-body);
    font-size: var(--text-base);
    padding: 0.75rem 1rem;
    outline: none;
    transition: border-color var(--transition);
    width: 100%;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: var(--cream-muted);
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    border-color: var(--gold);
  }

  .form-group select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%238a8070' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  /* ── Utility ─────────────────────────────────────────────── */
  .text-muted {
    color: var(--cream-muted);
    font-size: var(--text-sm);
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    .grid-2, .grid-3 {
      grid-template-columns: 1fr;
    }

    .section {
      padding: 3.5rem 0;
    }

    .page-header {
      padding: 4rem 0 2rem;
    }
  }
`;

export default function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return null;
}
