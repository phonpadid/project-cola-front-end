import type { CreateCompanyDTO, UpdateCompanyDTO } from '@/interface-adapter/dto/company.dto'
import { object, string, type ObjectSchema } from 'yup'

export const createCompanySchema: ObjectSchema<Omit<CreateCompanyDTO, 'logo'>> = object({
  name: string().required('ກະລຸນາປ້ອນຊື່ບໍລິສັດ'),
  email: string().required('ກະລຸນາປ້ອນອີເມວ'),
  phone: string().required('ກະລຸນາປ້ອນເບີໂທ'),
  address: string().required('ກະລຸນາປ້ອນທີ່ຢູ່'),
  user: object({
    username: string().required('ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້'),
    password: string().required('ກະລຸນາປ້ອນລະຫັດຜ່ານ')
  })
})

export const editCompanySchema: ObjectSchema<Omit<UpdateCompanyDTO, 'logo'>> = object({
  name: string().required('ກະລຸນາປ້ອນຊື່ບໍລິສັດ'),
  email: string().required('ກະລຸນາປ້ອນອີເມວ'),
  phone: string().required('ກະລຸນາປ້ອນເບີໂທ'),
  address: string().required('ກະລຸນາປ້ອນທີ່ຢູ່')
})
