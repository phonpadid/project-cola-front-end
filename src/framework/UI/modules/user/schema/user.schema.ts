import type { UserDTO } from '@/interface-adapter/dto/user.dto'
import { object, string, type ObjectSchema, date } from 'yup'

export interface UserSchema extends Omit<UserDTO, 'profile' | 'company'> {}

export const userSchema: ObjectSchema<UserSchema> = object({
  name: string().required('ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້').max(100, 'ຕົວອັກສອນບໍ່ຄວນເກີນ 100 ຕົວອັກສອນ'),
  email: string()
    .required('ກະລຸນາປ້ອນອີເມວຜູ້ໃຊ້')
    .email('ອີເມວບໍ່ຖືກຕ້ອງ')
    .max(100, 'ຕົວອັກສອນບໍ່ຄວນເກີນ 100 ຕົວອັກສອນ'),
  password: string().required('ກະລຸນາປ້ອນລະຫັດຜ່ານ').max(100, 'ຕົວອັກສອນບໍ່ຄວນເກີນ 100 ຕົວອັກສອນ'),
  tel: string().max(50, 'ຕົວອັກສອນບໍ່ຄວນເກີນ 50 ຕົວອັກສອນ'),
  datetime: date()
    .required('ກະລຸນາປ້ອນວັນທີເດືອນປີ'),
  role: object({
    id: string().required('ກະລຸນາປ້ອນຊື່ບົດບາດຜູ້ໃຊ້')
  }) 
})
