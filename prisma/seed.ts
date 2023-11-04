import { InvoiceStatus, InvoiceType } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { db } from '~/utils/db.server'

async function seed() {
  const user = await db.user.create({
    data: {
      email: 'bowdy@vndl.com',
      first_name: 'Bodhi',
      last_name: 'Vandael',
      username: 'bowdy',
      avatar_url: 'https://placedog.net/500',
      password: bcrypt.hashSync('password', 10),
    },
  })

  await Promise.all(
    getInvoices().map((invoice) =>
      db.invoice.create({
        data: {
          ...invoice,
          user_uuid: user.uuid,
        },
      }),
    ),
  )
}

function getInvoices() {
  return [
    {
      amount_due: 100.22,
      created_at: new Date(),
      currency: 'USD',
      date: new Date(),
      due_date: new Date(),
      invoice_number: 'INV-0001',
      remittance_address: '123 Main St',
      status: InvoiceStatus.PAID,
      type: InvoiceType.INCOMING,
      vendor_name: 'Acme Inc',
      vendor_vat_number: '123456789',
      updated_at: new Date(),
    },
    {
      amount_due: 100.22,
      created_at: new Date(),
      currency: 'USD',
      date: new Date(),
      due_date: new Date(),
      invoice_number: 'INV-0001',
      remittance_address: '123 Main St',
      status: InvoiceStatus.PAID,
      type: InvoiceType.INCOMING,
      vendor_name: 'Acme Inc',
      vendor_vat_number: '123456789',
      updated_at: new Date(),
    },
    {
      amount_due: 100.22,
      created_at: new Date(),
      currency: 'USD',
      date: new Date(),
      due_date: new Date(),
      invoice_number: 'INV-0001',
      remittance_address: '123 Main St',
      status: InvoiceStatus.PAID,
      type: InvoiceType.INCOMING,
      vendor_name: 'Acme Inc',
      vendor_vat_number: '123456789',
      updated_at: new Date(),
    },
  ]
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})
