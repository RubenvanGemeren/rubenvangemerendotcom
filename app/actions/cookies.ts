'use server'

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

interface CookieOptions {
  secure?: boolean
  httpOnly?: boolean
  path?: string
  maxAge?: number
  domain?: string
  sameSite?: 'lax' | 'strict' | 'none'
}

export async function create(name: string, value: string, options: CookieOptions) {
  const cookieStore = await cookies()

  cookieStore.set(name, value, options)
}

export async function read(name: string) {
  const cookieStore = await cookies()

  return cookieStore.get(name)?.value
}

export async function remove(name: string) {
  const cookieStore = await cookies()

  cookieStore.delete(name)
}