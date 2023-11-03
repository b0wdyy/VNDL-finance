import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react'
import { json } from '@remix-run/node'
import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { Form, useActionData, useSearchParams } from '@remix-run/react'
import { useEffect } from 'react'

import { login } from '~/services/auth.server'
import { createUserSession, requireLoggedOutUser } from '~/utils/session.server'

export const meta: MetaFunction = () => {
  return [{ title: 'Login' }]
}

export async function loader({ request }: LoaderFunctionArgs) {
  return requireLoggedOutUser(request)
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData()
  const email = form.get('email')
  const password = form.get('password')
  const redirectTo = form.get('redirectTo') || '/'

  if (typeof email !== 'string' || typeof password !== 'string') {
    return json(
      { error: 'Form not submitted correctly' },
      {
        status: 400,
      },
    )
  }

  if (!email || !password)
    return json(
      {
        error: 'Missing email or password',
      },
      {
        status: 400,
      },
    )

  const user = await login({ email, password })

  if (!user) {
    return json(
      { error: 'Invalid email or password' },
      {
        status: 401,
      },
    )
  }

  return createUserSession(user.uuid, redirectTo as string)
}

export default function Login() {
  const [searchParams] = useSearchParams()
  const data = useActionData<typeof action>()
  const toast = useToast()

  useEffect(() => {
    if (data?.error) {
      toast({
        status: 'error',
        title: 'Error',
        description: data.error,
      })
    }
  }, [data])

  return (
    <Grid templateColumns="repeat(7, 1fr)">
      <GridItem colSpan={4}></GridItem>
      <GridItem
        colSpan={3}
        borderTopLeftRadius="lg"
        borderBottomLeftRadius="lg"
        boxShadow="lg"
        h="100vh"
        display="grid"
        placeItems="center"
      >
        <Box
          as={Form}
          bg="gray.50"
          rounded="lg"
          boxShadow="md"
          p={8}
          w="75%"
          method="POST"
        >
          <Box>
            <Heading textAlign={'center'} mb={4}>
              VNDL Consulting
            </Heading>
          </Box>

          <Input
            type="hidden"
            name="redirectTo"
            value={searchParams.get('redirectTo') ?? undefined}
          />

          <FormControl mb={2}>
            <FormLabel>Email address</FormLabel>
            <Input bg="white" name="email" type="email" />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input bg="white" name="password" type="password" />
          </FormControl>

          <Button mt={8} colorScheme="blue" variant="outline" type="submit">
            Login
          </Button>
        </Box>
      </GridItem>
    </Grid>
  )
}
