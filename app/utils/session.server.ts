import { createCookieSessionStorage, redirect } from '@remix-run/node'

import { db } from './db.server'

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'VNDL-consulting_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession()
  session.set('userId', userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

export async function getUserUuidFromSession(request: Request) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') {
    return null
  }
  return userId
}

export async function getUser(request: Request) {
  const userUuid = await getUserUuidFromSession(request)
  if (typeof userUuid !== 'string') {
    return null
  }

  const user = await db.user.findUnique({
    where: {
      uuid: userUuid,
    },
  })

  if (!user) {
    throw await logoutUser(request)
  }

  return user
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname,
) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }
  return userId
}

export async function requireLoggedOutUser(request: Request) {
  const user = await getUser(request)

  if (user) {
    throw redirect('/')
  }

  return null
}

export async function logoutUser(request: Request) {
  const session = await getUserSession(request)

  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}
