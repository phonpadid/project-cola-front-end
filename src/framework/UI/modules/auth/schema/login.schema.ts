import type { LoginReqDTO } from '@/interface-adapter/dto/login.dto'
import { object, string, type ObjectSchema } from 'yup'

export const loginSchema: ObjectSchema<LoginReqDTO> = object({
  email: string().required('ກະລຸນາປ້ອນອີເມວ'),
  password: string().required('ກະລຸນາປ້ອນລະຫັດຜ່ານ')
})
