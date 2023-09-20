import type { CompanyEntity } from '@/entities/company.entity'
import type { RoleEntity } from '@/entities/role.entity'
import type { IFile } from '../interfaces/file.interface'

export interface UpdateProfileDTO {
  name: string
  tel: string
  profile?: IFile
}

export interface ChangePasswordDTO {
  oldPassword: string
  newPassword: string
}

export interface UserDTO {
  name: string
  email: string
  profile?: IFile
  password: string
  tel?: string
  role: Partial<Pick<RoleEntity, 'id'>>
  company?: Partial<CompanyEntity>
}
