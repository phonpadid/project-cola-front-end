import type { IFile } from '../interfaces/file.interface'

export interface CreateCompanyDTO {
  name: string
  email: string
  phone: string
  address: string
  logo?: IFile
  user?: {
    profile?: IFile
    username: string
    password: string
  }
}
export interface UpdateCompanyDTO extends Omit<CreateCompanyDTO, 'user'> {}
