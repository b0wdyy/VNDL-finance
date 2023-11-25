import { DollarSign } from 'react-feather'

import type { ContextMenuAction } from '~/types/context-menu'

import { DashboardCard } from '../card'

export function IncomeCard() {
  const contextMenuActions: ContextMenuAction[] = [
    {
      text: 'Add income',
      type: 'ADD_INCOME',
      onClick: () => {
        console.log('we can go ahead and add an income')
      },
    },
  ]
  return (
    <DashboardCard
      title="Income"
      amount={543.22}
      icon={DollarSign}
      contextMenuActions={contextMenuActions}
    />
  )
}
