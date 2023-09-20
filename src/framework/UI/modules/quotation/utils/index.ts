import type { QuotationStatus } from '@/entities/quotation.entity'

export const stautsOptions: QuotationStatus[] = [
  'created',
  'in progress',
  'complate',
  'approve',
  'canceled'
]

export function setColorOfTagStatus(status: QuotationStatus): string {
  switch (status) {
    case 'created':
      return 'warning'
    case 'in progress':
      return 'primary'
    case 'complate':
      return 'info'
    case 'approve':
      return 'success'
    case 'canceled':
      return 'danger'
    default:
      return 'primary'
  }
}