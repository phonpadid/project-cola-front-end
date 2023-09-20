import type { RoleEntity } from './role.entity'

export type Permission = 'quotation' | 'invoice' | 'receipt' | 'purchase-order'

export interface PermissionEntity {
  id: string
  name: Permission
  roles?: Partial<RoleEntity>[]
}
