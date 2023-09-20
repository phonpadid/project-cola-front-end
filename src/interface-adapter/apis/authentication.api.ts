import type { UserEntity } from '@/entities/user.entity'
import type { LoginReqDTO, LoginResDTO } from '../dto/login.dto'
import type { ChangePasswordDTO, UpdateProfileDTO } from '../dto/user.dto'
import type { IResponse } from '../interfaces/response.interface'

export interface IAuthenticationApi {
  login(input: LoginReqDTO): Promise<IResponse<LoginResDTO>>

  getAuth(): Promise<IResponse<UserEntity>>

  updateProfile(input: UpdateProfileDTO): Promise<IResponse<UserEntity>>

  changePassword(input: ChangePasswordDTO): Promise<IResponse<UserEntity>>

  logout(): Promise<IResponse<string>>
}
