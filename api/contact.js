import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, org, inquiryType, message } = req.body;

  if (!name || !email || !inquiryType || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin: 0; padding: 0; background: #0e1a2b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <div style="background: #1a2d45; border-radius: 12px; overflow: hidden;">
      <div style="background: #253d5c; padding: 24px 28px;">
        <h2 style="color: #f5efe4; margin: 0; font-size: 18px;">New inquiry — alexbirdbecker.com</h2>
        <p style="color: #c9a84c; margin: 4px 0 0; font-size: 14px; font-weight: 600;">${inquiryType}</p>
      </div>
      <div style="padding: 28px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #253d5c; width: 100px;">
              <span style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8a8070;">Name</span>
            </td>
            <td style="padding: 10px 0 10px 16px; border-bottom: 1px solid #253d5c; color: #f5efe4; font-size: 15px;">
              ${name}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #253d5c;">
              <span style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8a8070;">Email</span>
            </td>
            <td style="padding: 10px 0 10px 16px; border-bottom: 1px solid #253d5c; color: #f5efe4; font-size: 15px;">
              <a href="mailto:${email}" style="color: #c9a84c;">${email}</a>
            </td>
          </tr>
          ${org ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #253d5c;">
              <span style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8a8070;">Org</span>
            </td>
            <td style="padding: 10px 0 10px 16px; border-bottom: 1px solid #253d5c; color: #f5efe4; font-size: 15px;">
              ${org}
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #253d5c;">
              <span style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8a8070;">Type</span>
            </td>
            <td style="padding: 10px 0 10px 16px; border-bottom: 1px solid #253d5c; color: #f5efe4; font-size: 15px;">
              ${inquiryType}
            </td>
          </tr>
        </table>

        <div style="margin-top: 20px;">
          <p style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8a8070; margin: 0 0 8px;">Message</p>
          <div style="background: #0e1a2b; border-radius: 8px; padding: 16px;">
            <p style="color: #c8bfb0; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
        </div>
      </div>
    </div>
    <p style="color: #8a8070; font-size: 12px; text-align: center; margin-top: 16px;">Sent via alexbirdbecker.com contact form</p>
  </div>
</body>
</html>`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Alex Bird Becker Site <hello@alexbirdbecker.com>',
      to: 'abirdbecker@gmail.com',
      replyTo: email,
      subject: `[${inquiryType}] Message from ${name}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Send error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
