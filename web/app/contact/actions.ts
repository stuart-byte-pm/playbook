'use server'

export interface ContactFormState {
  success: boolean
  error: string | null
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name')
  const organisation = formData.get('organisation')
  const email = formData.get('email')
  const subject = formData.get('subject')
  const message = formData.get('message')

  /* Basic server-side validation */
  if (!name || !email || !subject || !message) {
    return { success: false, error: 'Please complete all required fields.' }
  }

  /* TODO: Wire up Resend to send email to hello@playbook-group.co.uk */
  /* For now, simulate a short delay and return success */
  await new Promise((resolve) => setTimeout(resolve, 600))

  console.log('[Contact stub] Form submission:', {
    name,
    organisation,
    email,
    subject,
    message,
  })

  return { success: true, error: null }
}
