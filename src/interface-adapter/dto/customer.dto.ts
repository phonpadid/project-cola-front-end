import type { IFile } from '../interfaces/file.interface'

export interface CustomerDTO {
  name: string
  email: string
  phone: string
  address: string
  logo?: IFile
}
