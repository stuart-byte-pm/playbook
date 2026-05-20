/**
 * Email template for new contact form submissions.
 * Sent via Resend from the contact form Server Action.
 */

export interface ContactNotificationParams {
  name: string
  email: string
  organisation: string
  subject: string
  message: string
  formSource: string
  submittedAt: Date
}

const BRAND = {
  gold: '#af7e56',
  teal: '#264852',
  sand: '#ebe7dc',
  black: '#000000',
  white: '#ffffff',
} as const

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  }).format(date)
}

function sourceLabel(source: string): string {
  switch (source) {
    case 'homepage':
      return 'Homepage enquiry form'
    case 'contact-page':
      return 'Contact page form'
    default:
      return source
  }
}

export function renderContactNotification(params: ContactNotificationParams): {
  subject: string
  html: string
  text: string
} {
  const safeName = escapeHtml(params.name)
  const safeEmail = escapeHtml(params.email)
  const safeOrg = escapeHtml(params.organisation || '—')
  const safeSubject = escapeHtml(params.subject || 'No subject')
  const safeMessage = escapeHtml(params.message).replace(/\n/g, '<br />')
  const safeSource = escapeHtml(sourceLabel(params.formSource))
  const timestamp = formatTimestamp(params.submittedAt)

  const subject = `New enquiry from ${params.name} — ${params.subject || 'Playbook website'}`

  const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.sand};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:${BRAND.black};">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${BRAND.sand};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background-color:${BRAND.white};border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background-color:${BRAND.teal};padding:32px;color:${BRAND.white};">
              <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.gold};margin-bottom:8px;">Playbook Advisory Group</div>
              <h1 style="margin:0;font-size:24px;font-weight:600;line-height:1.3;color:${BRAND.white};">New enquiry received</h1>
              <p style="margin:8px 0 0;font-size:14px;color:${BRAND.sand};">${safeSource} · ${escapeHtml(timestamp)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:15px;line-height:1.5;">
                <tr>
                  <td style="padding:8px 0;color:#666;width:140px;vertical-align:top;">Name</td>
                  <td style="padding:8px 0;color:${BRAND.black};font-weight:500;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#666;vertical-align:top;">Email</td>
                  <td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:${BRAND.gold};text-decoration:none;font-weight:500;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#666;vertical-align:top;">Organisation</td>
                  <td style="padding:8px 0;color:${BRAND.black};">${safeOrg}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#666;vertical-align:top;">Subject</td>
                  <td style="padding:8px 0;color:${BRAND.black};font-weight:500;">${safeSubject}</td>
                </tr>
              </table>
              <hr style="border:none;border-top:1px solid ${BRAND.sand};margin:24px 0;" />
              <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#666;margin-bottom:12px;">Message</div>
              <div style="font-size:15px;line-height:1.6;color:${BRAND.black};white-space:pre-wrap;">${safeMessage}</div>
            </td>
          </tr>
          <tr>
            <td style="background-color:${BRAND.sand};padding:20px 32px;font-size:12px;color:#666;text-align:center;">
              You can also view this submission in the WordPress admin under <strong>Form submissions</strong>.<br />
              Reply directly to this email to respond to ${safeName}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const text = `New enquiry via the Playbook website
${sourceLabel(params.formSource)} · ${timestamp}

Name: ${params.name}
Email: ${params.email}
Organisation: ${params.organisation || '—'}
Subject: ${params.subject || 'No subject'}

Message:
${params.message}

---
You can also view this submission in the WordPress admin under "Form submissions".
Reply directly to this email to respond to ${params.name}.`

  return { subject, html, text }
}
