import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  // Notify Alex of new subscriber
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin: 0; padding: 0; background: #0e1a2b; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
  <div style="max-width: 480px; margin: 0 auto; padding: 24px;">
    <div style="background: #1a2d45; border-radius: 12px; padding: 28px;">
      <h2 style="color: #c9a84c; margin: 0 0 12px; font-size: 18px;">New subscriber</h2>
      <p style="color: #c8bfb0; font-size: 15px; margin: 0;">
        <a href="mailto:${email}" style="color: #f5efe4;">${email}</a>
        signed up via alexbirdbecker.com
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Alex Bird Becker Site <hello@alexbirdbecker.com>',
      to: 'abirdbecker@gmail.com',
      subject: `New subscriber: ${email}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to process subscription' });
    }

    // Send welcome email to subscriber
    await resend.emails.send({
      from: 'Alex Bird Becker <hello@alexbirdbecker.com>',
      to: email,
      subject: 'You\'re on the list.',
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin: 0; padding: 0; background: #0e1a2b; font-family: Georgia, 'Times New Roman', serif;">
  <div style="max-width: 520px; margin: 0 auto; padding: 40px 24px;">
    <div style="background: #1a2d45; border-radius: 12px; padding: 36px;">
      <h2 style="color: #f5efe4; font-size: 22px; margin: 0 0 16px; font-family: -apple-system, sans-serif;">You're in.</h2>
      <p style="color: #c8bfb0; font-size: 16px; line-height: 1.7; margin: 0 0 16px;">
        Thanks for signing up. I'll send updates when there's something worth reading — events,
        essays, and news from the digital wellbeing advocacy world.
      </p>
      <p style="color: #c8bfb0; font-size: 16px; line-height: 1.7; margin: 0 0 24px;">
        In the meantime, you can find me at the links below.
      </p>
      <div style="border-top: 1px solid #253d5c; padding-top: 20px; display: flex; gap: 16px; flex-wrap: wrap;">
        <a href="https://delcounplugged.org" style="color: #c9a84c; font-size: 14px; font-family: -apple-system, sans-serif; font-weight: 600;">Delco Unplugged</a>
        <a href="https://paunplugged.org" style="color: #c9a84c; font-size: 14px; font-family: -apple-system, sans-serif; font-weight: 600;">PA Unplugged</a>
        <a href="https://alexbirdbecker.com" style="color: #c9a84c; font-size: 14px; font-family: -apple-system, sans-serif; font-weight: 600;">alexbirdbecker.com</a>
      </div>
    </div>
    <p style="color: #8a8070; font-size: 12px; text-align: center; margin-top: 16px;">
      Alex Bird Becker · Delaware County, PA
    </p>
  </div>
</body>
</html>`,
    });

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Failed to process subscription' });
  }
}
