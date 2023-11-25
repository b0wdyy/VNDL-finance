'use client'
import { DollarSign } from 'react-feather'

import type { ContextMenuAction } from '~/types/context-menu'

import { DashboardCard } from '../card'

export function ExpenseCard() {
  const menuActions: ContextMenuAction[] = [
    {
      text: 'Add expense',
      type: 'ADD_EXPENSE',
      onClick: () => {
        console.log('we can go ahead and add a new expense')
      },
    },
  ]

  return (
    <DashboardCard
      title="Expenses"
      amount={543.22}
      icon={DollarSign}
      contextMenuActions={menuActions}
    />
  )
}
