import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { logoutUser } from '~/utils/session.server'

export const action = async ({ request }: ActionFunctionArgs) =>
  logoutUser(request)

export const loader = async () => redirect('/')
