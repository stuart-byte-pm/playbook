'use server'

import { Resend } from 'resend'
import { renderContactNotification } from '@/lib/email/contact-notification'

export interface ContactFormState {
  success: boolean
  error: string | null
}

const FROM_ADDRESS = 'Playbook Website <hello@playbook-group.co.uk>'

/**
 * Submit a contact form.
 * Stores the submission in WordPress AND sends an email notification via Resend.
 * Each side runs independently — either can fail without breaking the other.
 */
export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string | null
  const organisation = formData.get('organisation') as string | null
  const email = formData.get('email') as string | null
  const subject = formData.get('subject') as string | null
  const message = formData.get('message') as string | null
  const formSource = formData.get('form_source') as string | null

  if (!name || !email || !message) {
    return { success: false, error: 'Please complete all required fields.' }
  }

  const payload = {
    name,
    email,
    organisation: organisation || '',
    subject: subject || '',
    message,
    formSource: formSource || 'contact-page',
  }

  const [wpResult, emailResult] = await Promise.allSettled([
    storeInWordPress(payload),
    sendEmailNotification(payload),
  ])

  if (wpResult.status === 'rejected') {
    console.error('[contact] WordPress storage failed:', wpResult.reason)
  }
  if (emailResult.status === 'rejected') {
    console.error('[contact] Email notification failed:', emailResult.reason)
  }

  // The form succeeds for the user as long as at least one side worked.
  // If both fail, surface an error so the user can retry.
  if (wpResult.status === 'rejected' && emailResult.status === 'rejected') {
    return {
      success: false,
      error: 'Something went wrong. Please try again or email us directly at hello@playbook-group.co.uk.',
    }
  }

  return { success: true, error: null }
}

interface SubmissionPayload {
  name: string
  email: string
  organisation: string
  subject: string
  message: string
  formSource: string
}

async function storeInWordPress(payload: SubmissionPayload): Promise<void> {
  const wpBaseUrl = process.env.WORDPRESS_API_URL
  if (!wpBaseUrl) {
    throw new Error('WORDPRESS_API_URL is not set')
  }

  const wpJsonBase = wpBaseUrl.replace(/\/wp\/v2\/?$/, '')
  const endpoint = `${wpJsonBase}/playbook/v1/contact`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      organisation: payload.organisation,
      subject: payload.subject,
      message: payload.message,
      form_source: payload.formSource,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`WordPress API returned ${res.status}: ${body}`)
  }
}

async function sendEmailNotification(payload: SubmissionPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_NOTIFICATION_EMAIL

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set')
  }
  if (!to) {
    throw new Error('CONTACT_NOTIFICATION_EMAIL is not set')
  }

  const resend = new Resend(apiKey)

  const { subject, html, text } = renderContactNotification({
    name: payload.name,
    email: payload.email,
    organisation: payload.organisation,
    subject: payload.subject,
    message: payload.message,
    formSource: payload.formSource,
    submittedAt: new Date(),
  })

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    replyTo: `${payload.name} <${payload.email}>`,
    subject,
    html,
    text,
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }
}
