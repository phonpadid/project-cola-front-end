import type { RoleEntity } from '@/entities/role.entity'
import type { UserEntity } from '@/entities/user.entity'
import type { IAuthenticationApi } from '@/interface-adapter/apis/authentication.api'
import type { LoginReqDTO, LoginResDTO } from '@/interface-adapter/dto/login.dto'
import type { ChangePasswordDTO, UpdateProfileDTO } from '@/interface-adapter/dto/user.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { MemoryApi } from './memory.api'

@singleton()
export class AuthenticationMemoryApi implements IAuthenticationApi {
  constructor(@inject(MemoryApi) private readonly _memory: MemoryApi) {}

  async login(input: LoginReqDTO): Promise<IResponse<LoginResDTO>> {
    const user = this._memory.users.find(
      (user) => input.email === user.email && input.password === user.password
    )

    if (!user) {
      throw Error('ຂໍ້ມູນບໍ່ຖືກຕ້ອງ!')
    }

    const token = JSON.stringify({
      sub: user.id,
      username: user.name
    })

    return {
      data: { token, user },
      message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ!',
      status: 'success'
    }
  }

  async getAuth(): Promise<IResponse<UserEntity>> {
    const token = localStorage.getItem('token')

    if (!token) {
      throw Error('Token ບໍ່ມີ!')
    }

    const payload = JSON.parse(token)
    const user = this._memory.users.find((user) => payload.sub === user.id)

    if (user) {
      let _role: RoleEntity | undefined

      if (user.role.id !== undefined) {
        _role = this._memory.roles.find((role) => user.role.id === role.id)
      }

      if (_role) user.role = _role
    }

    return { data: user, status: 'success' }
  }

  async updateProfile(input: UpdateProfileDTO): Promise<IResponse<UserEntity>> {
    const token = localStorage.getItem('token')

    if (!token) {
      throw Error('ບໍ່ມີຂໍ້ມູນ')
    }

    const payload = JSON.parse(token)
    const user = this._memory.users.find((user) => user.id === payload.sub)

    if (!user) {
      throw Error('ບໍ່ມີຂໍ້ມູນ')
    }

    if (input.profile) {
      user.profile = input.profile.objectURL
    }

    user.name = input.name
    user.tel = input.tel

    return {
      data: user,
      message: 'ບັນທຶກສຳເລັດ',
      status: 'success'
    }
  }

  async changePassword(input: ChangePasswordDTO): Promise<IResponse<UserEntity>> {
    const user = this._memory.users.find((user) => user.password === input.oldPassword)

    if (!user) {
      throw Error('ລະຫັດເກົ່າບໍ່ຖືກຕ້ອງ')
    }

    user.password = input.newPassword

    return {
      data: user,
      message: 'ປ່ຽນລະຫັດຜ່ານສຳເລັດ',
      status: 'success'
    }
  }

  async logout(): Promise<IResponse<string>> {
    return { status: 'success', message: 'ອອກຈາກລະບົບສຳເລັດ' }
  }
}
