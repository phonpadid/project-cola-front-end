import type { Currency, QuotationStatus } from '@/entities/quotation.entity'
import { ObjectSchema, array, date, number, object, string } from 'yup'
import { stautsOptions } from '../utils'

export interface IItemSchema {
  name: string
  description?: string
  price?: number
  qty?: number
}

export const itemSchema = object<IItemSchema>({
  name: string().required('ກະລຸນາປ້ອນຊື່ລາຍການ').max(100, 'ຊື່ລາຍການບໍ່ຄວນເກີນ 100 ຕົວອັກສອນ'),
  description: string().notRequired(),
  price: number().notRequired(),
  qty: number().notRequired()
})

export interface IFromSchema {
  name: string
  phone: string
  email?: string
  address?: string
}

const from = object<IFromSchema>({
  name: string().required('ກະລຸນາປ້ອນຊື່ບໍລິສັດ').max(100, 'ຊື່ບໍລິສັດບໍ່ຄວນເກີນ 100 ຕົວອັກສອນ'),
  phone: string().required('ກະລຸນາປ້ອນເບີໂທ'),
  email: string().email('ອີເມວບໍ່ຖືກຕ້ອງ').notRequired(),
  address: string().notRequired()
})

export interface IQuotationSchema {
  name: string
  from: IFromSchema
  billTo: string
  currency: Currency
  date: Date[]
  tax?: number
  discount?: number
  note?: string
}

export const quotationSchema = object<IQuotationSchema>({
  name: string()
    .required('ກະລຸນາປ້ອນຊື່ໃບສະເໜີລາຄາ')
    .max(100, 'ຊື່ໃບສະເໜີລາຄາບໍ່ຄວນເກີນ 100 ຕົວອັກສອນ'),
  from,
  billTo: string().required('ກະລຸນາເລືອກສົ່ງໃຫ້ລູກຄ່າ'),
  currency: string().oneOf(['₭', '$', '฿'], 'ສະກຸນເງີນບໍ່ຖືກຕ້ອງ').required('ກະລຸນາເລືອກສະກຸນເງີນ'),
  date: array(date().required('ກະລຸນາເລືອກວັນທີ່')),
  tax: number().notRequired(),
  discount: number().notRequired(),
  note: string().notRequired()
})

export interface IChangeStatusSchema {
  status: QuotationStatus
}

export const changeStatusSchema: ObjectSchema<IChangeStatusSchema> = object({
  status: string().oneOf(stautsOptions).required('ກະລຸນາເລືອກສະຖານະ')
})
