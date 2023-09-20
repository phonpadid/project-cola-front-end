import type { UserEntity } from '@/entities/user.entity'
import type { LoginReqDTO, LoginResDTO } from '@/interface-adapter/dto/login.dto'
import type { ChangePasswordDTO, UpdateProfileDTO } from '@/interface-adapter/dto/user.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { ChangePasswordUseCase } from './use-case/change-password.use-case'
import { GetAuthUseCase } from './use-case/get-auth.use-case'
import { AuthenticationUseCase } from './use-case/login.use-case'
import { LogoutUseCase } from './use-case/logout.use-case'
import { UpdateProfileUseCase } from './use-case/update-profile.use-case'

@singleton()
export class AuthenticationService {
  constructor(
    @inject(AuthenticationUseCase) private _login: AuthenticationUseCase,
    @inject(LogoutUseCase) private _logout: LogoutUseCase,
    @inject(GetAuthUseCase) private _getAuth: GetAuthUseCase,
    @inject(UpdateProfileUseCase) private _updateProfile: UpdateProfileUseCase,
    @inject(ChangePasswordUseCase) private _changePassword: ChangePasswordUseCase
  ) {}

  async login(input: LoginReqDTO): Promise<void | IResponse<LoginResDTO>> {
    return await this._login.execute(input)
  }

  async logout(): Promise<void | IResponse<string>> {
    return await this._logout.execute()
  }

  async getAuth(): Promise<void | IResponse<UserEntity>> {
    return await this._getAuth.execute()
  }

  async updateProfile(input: UpdateProfileDTO): Promise<void | IResponse<UserEntity>> {
    return await this._updateProfile.execute(input)
  }

  async changePassword(input: ChangePasswordDTO): Promise<void | IResponse<UserEntity>> {
    return await this._changePassword.execute(input)
  }
}
