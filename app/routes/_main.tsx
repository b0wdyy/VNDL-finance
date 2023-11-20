import { Grid, GridItem } from '@chakra-ui/react'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

import { TheSidebar } from '~/components/layout/the-sidebar'
import { requireUserId } from '~/utils/session.server'

export const loader = ({ request }: LoaderFunctionArgs) => {
  return requireUserId(request)
}

export default function MainLayout() {
  return (
    <Grid bg="gray.100" templateColumns={'repeat(4, 1fr)'}>
      <TheSidebar />

      <GridItem p={8} colSpan={3}>
        <Outlet />
      </GridItem>
    </Grid>
  )
}
