import type { UserEntity } from '@/entities/user.entity'
import { AuthenticationMapper } from '@/framework/apis/axios/mapper/authentication.maper'
import { UserMapper } from '@/framework/apis/axios/mapper/user.mapper'
import type { IAuthenticationApi } from '@/interface-adapter/apis/authentication.api'
import type { LoginReqDTO, LoginResDTO } from '@/interface-adapter/dto/login.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { AxiosApi } from './axios.api'
import { UserMapper } from './mapper/user.mapper'
import { AuthenticationMapper } from './mapper/authentication.maper'

@singleton()
export class AuthenticationApi implements IAuthenticationApi {
  constructor(
    @inject(AxiosApi) private _api: AxiosApi,
    @inject(AuthenticationMapper) private _authMapper: AuthenticationMapper,
    @inject(UserMapper) private _userMapper: UserMapper
  ) {}

  async login(input: LoginReqDTO): Promise<IResponse<LoginResDTO>> {
    const result = await this._api.sendReq({ url: 'auth/login', method: 'POST', data: input })

    const data = this._authMapper.toEntity(result.data)

    // this._api.axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

    return { data, status: 'success', message: 'ເຂົ້າສູ່ລະບົບສຳເລັດແລ້ວ' }
  }

  async getAuth(): Promise<IResponse<UserEntity>> {
    const result = await this._api.sendReq({
      url: 'admin/user-profile',
      method: 'GET'
    })

    const data = this._userMapper.toEntity(result.data)

    return { data, status: 'success' }
  }

  async logout(): Promise<IResponse<string>> {
    const result = await this._api.sendReq({
      url: 'auth/logout',
      method: 'POST'
    })

    // this._api.axios.defaults.headers.common['Authorization'] = ''

    return { data: result.data, status: 'success', message: 'ອອກຈາກລະບົບແລ້ວ' }
  }
}
