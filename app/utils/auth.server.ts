import bcrypt from 'bcryptjs'

import { db } from '~/utils/db.server'

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  })
  if (!user) {
    return null
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password)
  if (!isCorrectPassword) {
    return null
  }

  return {
    uuid: user.uuid,
    email: user.email,
  }
}
