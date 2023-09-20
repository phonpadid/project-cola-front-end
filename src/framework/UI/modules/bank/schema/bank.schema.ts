import type { BankDTO } from '@/interface-adapter/dto/bank.dto'
import { object, string, type ObjectSchema } from 'yup'

//@ts-ignore
export const bankSchema: ObjectSchema<BankDTO> = object({
  bankName: string().required('ກະລຸນາປ້ອນຊື່'),
  accountName: string().required('ກະລຸນາປ້ອນຊື່ທະນາຄານ'),
  accountNumber: string().required('ກະລຸນາປ້ອນເລກບັນຊີ'),
  description: string()
})
