import { Box, Heading } from '@chakra-ui/react'
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getUser } from '~/utils/session.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'Index' },
    { name: 'description', content: 'VNDL consulting finance application' },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request)

  return json({
    user: {
      username: user?.username,
    },
  })
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <Box>
      <Heading as="h2">Welcome {user.username}</Heading>
    </Box>
  )
}
