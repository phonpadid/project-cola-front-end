import type { CompanyEntity } from './company.entity'
import type { RoleEntity } from './role.entity'

export interface UserEntity {
  id: string
  name: string
  email: string
  profile?: string
  password: string
  tel?: string
  createdAt: Date
  role: Partial<RoleEntity>
  company?: Partial<CompanyEntity>
}
