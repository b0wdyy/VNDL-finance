import {
  Box,
  Heading,
  List,
  ListItem,
  Link as ChakraLink,
  Flex,
  Icon,
  Grid as ChakraGrid,
  Divider,
  AbsoluteCenter,
  Button,
} from '@chakra-ui/react'
import { Link } from '@remix-run/react'
import { File, Grid, LogOut, Settings, Users } from 'react-feather'

export const TheSidebar = () => {
  return (
    <Box
      as="nav"
      boxShadow="lg"
      borderTopRightRadius="lg"
      borderBottomRightRadius="lg"
      h="100vh"
      w="100%"
      p={8}
    >
      <Heading as="h1" fontWeight="light" size="md" letterSpacing="wide">
        VNDL finance
      </Heading>

      <List spacing={4} mt={8}>
        <Box position="relative" mt={8} p={2}>
          <Divider />
          <AbsoluteCenter bg="white" px="4" color="gray.300">
            Common
          </AbsoluteCenter>
        </Box>

        <ListItem>
          <ChakraLink as={Link} to="/">
            <Flex alignItems="center" gap={4}>
              <ChakraGrid
                w={8}
                h={8}
                placeItems="center"
                bg="gray.200"
                rounded="full"
              >
                <Icon as={Grid} />
              </ChakraGrid>
              Dashboard
            </Flex>
          </ChakraLink>
        </ListItem>

        <ListItem>
          <ChakraLink as={Link} to="/invoices">
            <Flex alignItems="center" gap={4}>
              <ChakraGrid
                w={8}
                h={8}
                placeItems="center"
                bg="gray.200"
                rounded="full"
              >
                <Icon as={File} />
              </ChakraGrid>
              Invoices
            </Flex>
          </ChakraLink>
        </ListItem>

        <Box position="relative" mt={12} p={2}>
          <Divider />
          <AbsoluteCenter bg="white" px="4" color="gray.300">
            Profile
          </AbsoluteCenter>
        </Box>

        <ListItem>
          <ChakraLink as={Link} to="/settings">
            <Flex alignItems="center" gap={4}>
              <ChakraGrid
                w={8}
                h={8}
                placeItems="center"
                bg="gray.200"
                rounded="full"
              >
                <Icon as={Settings} />
              </ChakraGrid>
              Settings
            </Flex>
          </ChakraLink>
        </ListItem>

        <ListItem>
          <ChakraLink as={Link} to="/admin">
            <Flex alignItems="center" gap={4}>
              <ChakraGrid
                w={8}
                h={8}
                placeItems="center"
                bg="gray.200"
                rounded="full"
              >
                <Icon as={Users} />
              </ChakraGrid>
              Admin
            </Flex>
          </ChakraLink>
        </ListItem>

        <ListItem as="form" action="/logout" method="post">
          <Flex
            as={Button}
            type="submit"
            variant="unstyled"
            fontWeight="normal"
            alignItems="center"
            gap={4}
          >
            <ChakraGrid
              w={8}
              h={8}
              placeItems="center"
              bg="gray.200"
              rounded="full"
            >
              <Icon as={LogOut} />
            </ChakraGrid>
            Logout
          </Flex>
        </ListItem>
      </List>
    </Box>
  )
}
