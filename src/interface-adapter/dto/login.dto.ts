import type { UserEntity } from '@/entities/user.entity'

export interface LoginReqDTO {
  email: string
  password: string
}
export interface LoginResDTO {
  user: UserEntity
  token: string
}
