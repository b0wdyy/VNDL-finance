import { Box, Grid, Heading } from '@chakra-ui/react'
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { BalanceCard } from '~/components/dashboard/cards/balance-card'
import { ExpenseCard } from '~/components/dashboard/cards/expense-card'
import { IncomeCard } from '~/components/dashboard/cards/income-card'
import { getUser } from '~/utils/session.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'VNDL Finance - Dashboard' },
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
      <Heading bg="white" as="h2" mt={-8} mx={-8} p={6}>
        Welcome {user.username}
      </Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} my={8}>
        <BalanceCard />
        <IncomeCard />
        <ExpenseCard />
      </Grid>
    </Box>
  )
}
