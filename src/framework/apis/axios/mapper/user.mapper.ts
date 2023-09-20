import type { PermissionEntity } from '@/entities/permission.entity'
import type { RoleEntity } from '@/entities/role.entity'
import type { UserEntity } from '@/entities/user.entity'
import type { IMapper } from '@/interface-adapter/mapper'
import { injectable } from 'tsyringe'

@injectable()
export class UserMapper implements IMapper<any, UserEntity> {
  toEntity(res: any): UserEntity {
    return {
      id: res.user.id,
      name: res.user.name,
      email: res.user.email,
      tel: res.user.tel,
      profile_url: res.user.profile_url,
      createdAt: new Date(res.user.created_at),
      roles: res.user.roleUser.map((item: string): RoleEntity => ({ name: item })),
      permissions: res.user.permissionRole.map(
        (item: string): PermissionEntity => ({ name: item })
      )
    }
  }
}
