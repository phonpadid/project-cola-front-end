import type { UpdateCompanyDTO } from '@/interface-adapter/dto/company.dto'
import { object, string, type ObjectSchema } from 'yup'

export const companySchema: ObjectSchema<Omit<UpdateCompanyDTO, 'logo'>> = object({
  name: string().required('ກະລຸນາປ້ອນຊື່').max(100, 'ຕົວອັກສອນບໍ່ຄວນເກີນ 100 ຕົວ'),
  email: string()
    .required('ກະລຸນາປ້ອນອີເມວ')
    .email('ອີເມວບໍ່ຖືກຕ້ອງ')
    .max(100, 'ຕົວອັກສອນບໍ່ຄວນເກີນ 100 ຕົວ'),
  phone: string().required('ກະລຸນາປ້ອນເບີໂທ').max(20, 'ຕົວອັກສອນບໍ່ຄວນເກີນ 20 ຕົວ'),
  address: string().required('ກະລຸນາປ້ອນທີ່ຢູ່')
})
