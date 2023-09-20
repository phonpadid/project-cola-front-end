import type { PermissionEntity } from '@/entities/permission.entity'
import type { RoleEntity } from '@/entities/role.entity'
import type { LoginResDTO } from '@/interface-adapter/dto/login.dto'
import type { IMapper } from '@/interface-adapter/mapper'
import { injectable } from 'tsyringe'

@injectable()
export class AuthenticationMapper implements IMapper<any, LoginResDTO> {
  toEntity(res: any): LoginResDTO {
    return {
      token: res.access_token,
      user: {
        id: res.auth.user.id,
        name: res.auth.user.name,
        email: res.auth.user.email,
        tel: res.auth.user.tel,
        profile_url: res.auth.user.profile_url,
        createdAt: new Date(res.auth.user.created_at),
        roles: res.auth.user.roleUser.map((item: string): RoleEntity => ({ name: item })),
        permissions: res.auth.user.permissionRole.map(
          (item: string): PermissionEntity => ({ name: item })
        )
      }
    }
  }
}
