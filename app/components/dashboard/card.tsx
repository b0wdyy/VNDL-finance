import {
  Box,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { MoreHorizontal } from 'react-feather'

import type { ContextMenuAction } from '~/types/context-menu'

type DashboardCardProps = {
  title: string
  amount: number
  icon: any
  contextMenuActions?: ContextMenuAction[]
}

export function DashboardCard({
  title,
  amount,
  icon,
  contextMenuActions,
}: DashboardCardProps) {
  console.log(contextMenuActions)

  return (
    <Flex justify="space-between" p={4} rounded="md" bg="white">
      <Box>
        <Box
          bg="gray.200"
          rounded="md"
          w={8}
          h={8}
          display="grid"
          placeItems="center"
        >
          <Icon as={icon} color="purple.400" />
        </Box>

        <Stat mt={2}>
          <StatLabel>{title}</StatLabel>
          <StatNumber>&euro;{amount}</StatNumber>
        </Stat>
      </Box>

      {contextMenuActions ? (
        <Menu size="md">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<MoreHorizontal />}
            variant="outline"
          />
          <MenuList>
            {contextMenuActions?.map((action) => (
              <MenuItem key={action.type} onClick={action.onClick}>
                {action.text}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : null}
    </Flex>
  )
}
