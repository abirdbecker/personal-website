import { useState } from 'react';

const formCss = `
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-width: 600px;
  }

  .contact-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  .contact-form-submit {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .contact-status {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    padding: 0.75rem 1rem;
    border-radius: var(--radius);
    flex: 1;
    min-width: 200px;
  }

  .contact-status.success {
    background: rgba(201, 168, 76, 0.12);
    border: 1px solid var(--gold);
    color: var(--gold);
  }

  .contact-status.error {
    background: rgba(200, 80, 80, 0.12);
    border: 1px solid #c05050;
    color: #e08080;
  }

  @media (max-width: 560px) {
    .contact-form-row {
      grid-template-columns: 1fr;
    }
  }
`;

import { useEffect } from 'react';

export default function ContactForm({ defaultType = '' }) {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = formCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [form, setForm] = useState({
    name: '',
    email: '',
    org: '',
    inquiryType: defaultType,
    message: '',
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setForm({ name: '', email: '', org: '', inquiryType: defaultType, message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <div className="form-group">
          <label htmlFor="cf-name">Name *</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cf-email">Email *</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="contact-form-row">
        <div className="form-group">
          <label htmlFor="cf-org">Organization (optional)</label>
          <input
            id="cf-org"
            name="org"
            type="text"
            placeholder="School, org, company"
            value={form.org}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cf-type">Inquiry Type *</label>
          <select
            id="cf-type"
            name="inquiryType"
            required
            value={form.inquiryType}
            onChange={handleChange}
          >
            <option value="">Select one…</option>
            <option value="Speaking">Speaking</option>
            <option value="Consulting/Build">Consulting / Build</option>
            <option value="Partnership">Partnership</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cf-message">Message *</label>
        <textarea
          id="cf-message"
          name="message"
          required
          placeholder="Tell me about your event, project, or idea."
          rows={5}
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form-submit">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        {status === 'success' && (
          <p className="contact-status success">Message sent! I'll be in touch soon.</p>
        )}
        {status === 'error' && (
          <p className="contact-status error">Something went wrong. Try emailing me directly.</p>
        )}
      </div>
    </form>
  );
}
