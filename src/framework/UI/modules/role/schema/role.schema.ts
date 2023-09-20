import type { CreateRoleDTO } from '@/interface-adapter/dto/role.dto'
import { array, object, string, type ObjectSchema } from 'yup'

export const permissionids: string[] = ['1', '2', '3', '4']

export interface RoleSchema extends Pick<CreateRoleDTO, 'name' | 'permissions'> {}

export const roleSchema: ObjectSchema<RoleSchema> = object({
  name: string().required('ກະລຸນາປ້ອນຊື່ບົດບາດ'),
  permissions: array()
    .of(string().oneOf(permissionids, 'ສິດບໍ່ຖືກຕ້ອງ').required('ກະລຸນາເລືອກສິດ'))
    .required('ກະລຸນາເລືອກສິດ')
})
