import type { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

import { requireLoggedOutUser } from '~/utils/session.server'

export const loader = ({ request }: LoaderFunctionArgs) => {
  return requireLoggedOutUser(request)
}

export default function AuthLayout() {
  return (
    <main>
      <Outlet />
    </main>
  )
}
