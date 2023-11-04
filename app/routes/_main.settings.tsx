import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Image,
  Button,
  useToast,
} from '@chakra-ui/react'
import {
  unstable_parseMultipartFormData,
  redirect,
  json,
} from '@remix-run/node'
import type {
  MetaFunction,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from '@remix-run/node'
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react'
import { useEffect, useState } from 'react'

import { db } from '~/utils/db.server'
import { getUser, getUserUuidFromSession } from '~/utils/session.server'
import { uploadHandler } from '~/utils/upload.server'

export const meta: MetaFunction = () => [
  {
    title: 'VNDL finance - Settings',
  },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request)

  return {
    user,
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const form = await unstable_parseMultipartFormData(request, uploadHandler)
    const first_name = String(form.get('first_name'))
    const last_name = String(form.get('last_name'))
    const email = String(form.get('email'))
    const username = String(form.get('username'))
    const avatar = String(form.get('avatar'))
    const avatar_url = String(form.get('avatar_url'))

    const userUuid = await getUserUuidFromSession(request)
    const searchParams = new URLSearchParams([['redirectTo', '/settings']])

    if (!userUuid) return redirect(`/login?${searchParams}`)

    await db.user.update({
      where: {
        uuid: userUuid,
      },
      data: {
        first_name,
        last_name,
        email,
        username,
        // set avatar_url to avatar if it exists -> means it has uploaded to cloudinary, otherwise set it to avatar_url -> original
        avatar_url: avatar === 'null' ? avatar_url : avatar,
      },
    })

    return redirect('/settings')
  } catch (e: unknown) {
    console.log(e)
    return json({ message: 'Something went wrong' }, { status: 500 })
  }
}

export default function Settings() {
  const { user } = useLoaderData<typeof loader>()
  const data = useActionData<typeof action>()
  const navigation = useNavigation()
  const toast = useToast()
  const [image, setImage] = useState<string | null>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    setImage(URL.createObjectURL(file))
  }

  useEffect(() => {
    if (!data?.message) return

    toast({
      title: 'Error',
      description: data.message,
      status: 'error',
    })
  }, [data])

  return (
    <Box>
      <Heading as="h1" size="xl">
        Profile
      </Heading>

      <Box mt={8} as={Form} method="post" encType="multipart/form-data">
        <FormControl mb={2}>
          <FormLabel htmlFor="avatar">Avatar</FormLabel>
          <Image
            w={32}
            h={32}
            objectFit="cover"
            rounded="full"
            src={image ?? (user?.avatar_url || '')}
          />
          <Input
            type="hidden"
            defaultValue={user?.avatar_url || undefined}
            name="avatar_url"
          />
          <Input
            id="avatar"
            onChange={onFileChange}
            srOnly
            bg="white"
            name="avatar"
            type="file"
          />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel>Email address</FormLabel>
          <Input
            bg="white"
            defaultValue={user?.email}
            name="email"
            type="email"
          />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel>Username</FormLabel>
          <Input
            bg="white"
            defaultValue={user?.username}
            name="username"
            type="text"
          />
        </FormControl>

        <Flex gap={8}>
          <FormControl mb={2}>
            <FormLabel>First name</FormLabel>
            <Input
              bg="white"
              defaultValue={user?.first_name}
              name="first_name"
              type="text"
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Last name</FormLabel>
            <Input
              bg="white"
              defaultValue={user?.last_name}
              name="last_name"
              type="text"
            />
          </FormControl>
        </Flex>

        <Flex justifyContent="flex-end">
          <Button
            isLoading={navigation.state === 'submitting'}
            colorScheme="blue"
            variant="outline"
            type="submit"
          >
            Save
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}
