import bcrypt from 'bcryptjs'

import { getUserByEmail } from './user.service'

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const user = await getUserByEmail(email)
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
