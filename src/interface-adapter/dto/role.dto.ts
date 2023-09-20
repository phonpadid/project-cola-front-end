import type { CompanyEntity } from '@/entities/company.entity'

export interface CreateRoleDTO {
  name: string
  company: Partial<CompanyEntity>
  permissions: string[]
}

export interface UpdateRoleDTO extends Omit<CreateRoleDTO, 'company'> {}
