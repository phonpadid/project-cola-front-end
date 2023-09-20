import type { CustomerDTO } from '@/interface-adapter/dto/customer.dto'
import { object, string, type ObjectSchema } from 'yup'

//@ts-ignore
export const customerSchema: ObjectSchema<Omit<CustomerDTO, 'logo'>> = object({
  name: string().required('ກະລຸນາປ້ອນຊື່ລູກຄ້າ'),
  email: string().required('ກະລຸນາປ້ອນອີເມວ'),
  phone: string().required('ກະລຸນາປ້ອນເບີໂທ'),
  address: string().required('ກະລຸນາປ້ອນທີ່ຢູ່')
})
