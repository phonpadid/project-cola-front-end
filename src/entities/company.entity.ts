import type { BankEntity } from './bank.entity'
import type { UserEntity } from './user.entity'

export interface CompanyEntity {
  id: string
  name: string
  email: string
  phone: string
  address: string
  logo?: string
  users?: Partial<UserEntity>[]
  banks?: Partial<BankEntity>[]
}
