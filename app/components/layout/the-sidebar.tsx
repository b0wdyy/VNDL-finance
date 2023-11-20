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
  Text,
} from '@chakra-ui/react'
import { NavLink } from '@remix-run/react'
import { File, Grid, LogOut, Settings } from 'react-feather'

export const TheSidebar = () => {
  return (
    <Box
      as="nav"
      bg="white"
      boxShadow="lg"
      borderTopRightRadius="lg"
      borderBottomRightRadius="lg"
      h="100vh"
      w="100%"
      p={8}
    >
      <Heading as="h1" fontWeight="bold" size="md" letterSpacing="wide">
        <Text fontWeight="light" as="span">
          VNDL
        </Text>{' '}
        Finance
      </Heading>

      <List spacing={4} mt={8}>
        <Box position="relative" mt={8} p={2}>
          <Divider />
          <AbsoluteCenter bg="white" px="4" color="gray.300">
            Common
          </AbsoluteCenter>
        </Box>

        <ListItem>
          <ChakraLink
            as={NavLink}
            _hover={{
              textDecoration: 'none',
            }}
            _activeLink={{
              color: 'purple.500',
              bg: 'purple.100',
              rounded: 'md',
              fontWeight: 'bold',
            }}
            display="block"
            color="gray.500"
            p={4}
            to="/"
          >
            <Flex alignItems="center" gap={4}>
              <ChakraGrid
                w={10}
                h={10}
                placeItems="center"
                bg="gray.200"
                rounded="md"
              >
                <Icon boxSize={5} as={Grid} />
              </ChakraGrid>
              Dashboard
            </Flex>
          </ChakraLink>
        </ListItem>

        <ListItem>
          <ChakraLink
            as={NavLink}
            _hover={{
              textDecoration: 'none',
            }}
            _activeLink={{
              color: 'purple.500',
              bg: 'purple.100',
              rounded: 'md',
              fontWeight: 'bold',
            }}
            display="block"
            color="gray.500"
            p={4}
            to="/invoices"
          >
            <Flex alignItems="center" gap={4}>
              <ChakraGrid
                w={10}
                h={10}
                placeItems="center"
                bg="gray.200"
                rounded="md"
              >
                <Icon boxSize={5} as={File} />
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
          <ChakraLink
            as={NavLink}
            _hover={{
              textDecoration: 'none',
            }}
            _activeLink={{
              fill: 'white',
              color: 'purple.500',
              bg: 'purple.100',
              rounded: 'md',
              fontWeight: 'bold',
            }}
            display="block"
            color="gray.500"
            p={4}
            to="/settings"
          >
            <Flex alignItems="center" gap={4}>
              <ChakraGrid
                w={10}
                h={10}
                placeItems="center"
                bg="gray.200"
                rounded="md"
              >
                <Icon boxSize={5} as={Settings} />
              </ChakraGrid>
              Settings
            </Flex>
          </ChakraLink>
        </ListItem>

        <ListItem p={4} as="form" action="/logout" method="post">
          <Flex
            as={Button}
            type="submit"
            variant="unstyled"
            fontWeight="normal"
            alignItems="center"
            color="gray.500"
            gap={4}
          >
            <ChakraGrid
              w={10}
              h={10}
              placeItems="center"
              bg="gray.200"
              rounded="md"
            >
              <Icon boxSize={5} as={LogOut} />
            </ChakraGrid>
            Logout
          </Flex>
        </ListItem>
      </List>
    </Box>
  )
}
