import type { QuotationTypeDTO } from '@/interface-adapter/dto/quotationType.dto'
import { number, object, string, type ObjectSchema } from 'yup'

//@ts-ignore
export const quotationTypeSchema: ObjectSchema<QuotationTypeDTO> = object({
  name: string().required('ກະລຸນາປ້ອນຊື່ປະເພດໃບສະເໜີລາຄາ'),
  rateKip: number().required('ກະລຸນາປ້ອນລາຄາເງິນກີບ'),
  rateBath: number().required('ກະລຸນາປ້ອນລາຄາເງິນບາດ'),
  rateDollar: number().required('ກະລຸນາປ້ອນລາຄາເງິນໂດລາ')
})
