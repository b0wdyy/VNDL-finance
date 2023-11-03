import { db } from '~/utils/db.server'

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email,
    },
  })
}

export async function getUserById(uuid: string) {
  return await db.user.findUnique({
    where: {
      uuid,
    },
  })
}
