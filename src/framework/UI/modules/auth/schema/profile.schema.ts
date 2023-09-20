import type { ChangePasswordDTO, UpdateProfileDTO } from '@/interface-adapter/dto/user.dto'
import { object, string, type ObjectSchema } from 'yup'

export const updateProfileSchema: ObjectSchema<Omit<UpdateProfileDTO, 'profile'>> = object({
  name: string().required('ກະລຸນາປ້ອນຊື່').max(100, 'ຕົວອັກສອນບໍ່ຄວນເກີນ 100 ຕົວ'),
  tel: string().required('ກະລຸນາປ້ອນເບີໂທ').max(20, 'ຕົວອັກສອນບໍ່ຄວນເກີນ 20 ຕົວ')
})

export const changePasswordSchema: ObjectSchema<ChangePasswordDTO> = object({
  oldPassword: string().required('ກະລຸນາປ້ອນລະຫັດເກົ່າ').max(30, 'ຕົວອັກສອນບໍ່ຄວນເກີນ 30 ຕົວ'),
  newPassword: string().required('ກະລຸນາປ້ອນລະຫັດໃໝ່').max(30, 'ຕົວອັກສອນບໍ່ຄວນເກີນ 30 ຕົວ')
})
