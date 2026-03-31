'use server'

export interface ContactFormState {
  success: boolean
  error: string | null
}

/**
 * Submit a contact form to the WordPress REST endpoint.
 * Stores the submission in WordPress and triggers an email notification.
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

  /* Basic server-side validation */
  if (!name || !email || !message) {
    return { success: false, error: 'Please complete all required fields.' }
  }

  const wpBaseUrl = process.env.WORDPRESS_API_URL
  if (!wpBaseUrl) {
    console.error('[contact] WORDPRESS_API_URL is not set')
    return { success: false, error: 'Form configuration error. Please try again later.' }
  }

  // Derive the WP REST base from the existing env var
  // WORDPRESS_API_URL = https://cms.playbook-group.co.uk/wp-json/wp/v2
  // We need:           https://cms.playbook-group.co.uk/wp-json/playbook/v1/contact
  const wpJsonBase = wpBaseUrl.replace(/\/wp\/v2\/?$/, '')
  const endpoint = `${wpJsonBase}/playbook/v1/contact`

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        organisation: organisation || '',
        subject: subject || '',
        message,
        form_source: formSource || 'contact-page',
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error(`[contact] WordPress API returned ${res.status}:`, body)
      return { success: false, error: 'Something went wrong. Please try again or email us directly.' }
    }

    return { success: true, error: null }
  } catch (err) {
    console.error('[contact] Failed to submit form:', err)
    return { success: false, error: 'Something went wrong. Please try again or email us directly.' }
  }
}
