import type { Prisma } from '@prisma/client'

import { db } from '~/utils/db.server'

const DEFAULT_USER_FIELDS = {
  uuid: true,
  username: true,
  email: true,
  avatar_url: true,
  first_name: true,
  last_name: true,
}

export async function getUserByEmail(
  email: string,
  fields?: Prisma.UserSelect,
) {
  return await db.user.findUnique({
    select: { ...DEFAULT_USER_FIELDS, ...fields },
    where: {
      email,
    },
  })
}

export async function getUserByUuid(uuid: string, fields?: Prisma.UserSelect) {
  return await db.user.findUnique({
    select: { ...DEFAULT_USER_FIELDS, ...fields },
    where: {
      uuid,
    },
  })
}
