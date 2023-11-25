import { DollarSign } from 'react-feather'

import { DashboardCard } from '../card'

export function BalanceCard() {
  return <DashboardCard title="Balance" amount={543.22} icon={DollarSign} />
}
