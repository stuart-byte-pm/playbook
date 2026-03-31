'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

/**
 * PASSWORD GATE — temporary page for pre-launch access control.
 * To remove: delete this file and web/middleware.ts, then redeploy.
 */

export default function PasswordPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(false)

    const res = await fetch('/api/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <Image
        src="/images/brand-assets/icon/Playbook_Icon_Black_RGB.svg"
        alt="Playbook Advisory Group"
        width={64}
        height={64}
        className="mb-10"
      />

      <form onSubmit={handleSubmit} className="flex w-full max-w-xs flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          autoFocus
          className="rounded-md border border-sand bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 outline-none focus:border-gold transition-colors"
        />

        <button
          type="submit"
          className="rounded-md bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-teal"
        >
          Enter
        </button>

        {error && (
          <p className="text-center text-sm text-gold">
            Incorrect password
          </p>
        )}
      </form>
    </div>
  )
}
