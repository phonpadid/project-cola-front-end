import type { CompanyEntity } from './company.entity'
import type { PermissionEntity } from './permission.entity'
import type { UserEntity } from './user.entity'

export interface RoleEntity {
  id: string
  name: string | 'super-admin' | 'admin'
  users?: Partial<UserEntity>
  company?: Partial<CompanyEntity>
  permissions?: Partial<PermissionEntity>[]
}
