import type { QuotationEntity, QuotationStatus } from '@/entities/quotation.entity'
import { QuotationMapper } from '@/framework/apis/axios/mapper/quotation.mapper'
import type { IQuotationApi } from '@/interface-adapter/apis/quotation.api'
import type {
  CreateQuotationDTO,
  GetAllQuotationDTO,
  QueryQuotationDTO,
  UpdateQuotationDTO
} from '@/interface-adapter/dto/quotation.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IMapper } from '@/interface-adapter/mapper'
import { inject, singleton } from 'tsyringe'
import { MemoryApi } from './memory.api'

@singleton()
export class QuotationMemoryApi implements IQuotationApi {
  constructor(
    @inject(MemoryApi) private _memory: MemoryApi,
    @inject(QuotationMapper) private _mapper: IMapper<any, QuotationEntity, CreateQuotationDTO>
  ) {}

  async getAll(
    args: IGPaginate<QueryQuotationDTO>
  ): Promise<IResponse<IGPaginated<GetAllQuotationDTO>>> {
    const { page, limit, filter } = args
    let total = this._memory.quotetions.length
    const result = this._memory.quotetions

    let props: GetAllQuotationDTO[] = result.map((item): GetAllQuotationDTO => {
      const entity = this._mapper.toEntity(item)

      return {
        billTo: this._memory.customers.find((item) => entity.billTo.id === item.id)?.name as string,
        id: entity.id as string,
        name: entity.name as string,
        endDate: entity.endDate?.toLocaleDateString() as string,
        total: entity.total,
        status: entity.status,
        currency: entity.currency
      }
    })

    if (filter?.id) {
      props = props.filter((item) => {
        if (filter?.id) return item.id?.toLowerCase().includes(filter?.id.toLowerCase())
      })
      total = props.length
    }

    if (filter?.name) {
      props = props.filter((item) => {
        if (filter?.name) return item.name?.toLowerCase().includes(filter?.name.toLowerCase())
      })
      total = props.length
    }

    if (filter.billTo) {
      props = props.filter((item) => {
        if (filter.billTo) return item.billTo.toLowerCase().includes(filter.billTo.toLowerCase())
      })
      total = props.length
    }

    if (filter.endDate) {
      const startDay = new Date(filter.endDate).setHours(0, 0, 0, 0)
      const endDay = new Date(filter.endDate).setHours(23, 59, 59, 999)

      props = props.filter((item) => {
        if (filter.endDate) {
          return (
            Number(new Date(item.endDate)) >= startDay && Number(new Date(item.endDate)) <= endDay
          )
        }
      })
      total = props.length
    }

    if (filter.status) {
      props = props.filter((item) => item.status === filter.status)
      total = props.length
    }

    if (page && limit) {
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      props = props.slice(startIndex, endIndex)
    }

    return {
      data: { props, total },
      status: 'success'
    }
  }

  async create(item: CreateQuotationDTO): Promise<IResponse<QuotationEntity>> {
    const quoId = String(this._memory.quotetions.length + 1)

    item.items.forEach(({ name, price, qty, description, orderNumber }) => {
      this._memory.items.push({
        id: String(this._memory.items.length + 1),
        orderNumber: orderNumber ? orderNumber : 0,
        name,
        price,
        qty,
        description,
        quotation: { id: quoId }
      })
    })

    let total: number = 0
    item.items.forEach((item) => {
      if (item.price && item.qty) {
        total += item.price * item.qty
      }
    })

    this._memory.quotetions.push({
      id: quoId,
      name: item.name,
      from: { id: item.from.id },
      billTo: { id: item.billTo.id },
      currency: item.currency,
      items: this._memory.items.map(({ id }) => ({ id })),
      startDate: item.startDate,
      endDate: item.endDate,
      tax: item.tax,
      discount: item.discount,
      note: item.note,
      status: 'created',
      total
    })

    return { status: 'success', message: 'ສ້າງໃບສະເໜີລາຄາສຳເລັດ' }
  }

  async getOne(id: string): Promise<IResponse<QuotationEntity>> {
    const quotation = this._memory.quotetions.find((quo) => quo.id === id)
    const from = this._memory.company.find((com) => com.id === quotation?.from.id)
    const billTo = this._memory.customers.find((cus) => cus.id === quotation?.billTo.id)

    const quotationItemIds = quotation?.items.map((item) => item.id)
    const items = this._memory.items.filter((item) => quotationItemIds?.includes(item.id))

    if (!quotation) throw Error('ບໍ່ມີຂໍ້ມູນ')

    if (from) quotation.from = from
    if (billTo) quotation.billTo = billTo
    quotation.items = items

    return {
      data: quotation,
      status: 'success'
    }
  }

  async update(item: UpdateQuotationDTO, id: string): Promise<IResponse<QuotationEntity>> {
    const oldData = this._memory.quotetions.find((quo) => quo.id === id)

    if (!oldData) throw Error('ບໍ່ມີຂໍ້ມູນ')

    oldData.name = item.name
    oldData.billTo = { id: item.billTo.id }
    oldData.currency = item.currency
    oldData.startDate = item.startDate
    oldData.endDate = item.endDate
    oldData.tax = item.tax
    oldData.discount = item.discount
    oldData.note = item.note

    return {
      data: oldData,
      message: 'ບັນທຶກຂໍມູນສຳເລັດ',
      status: 'success'
    }
  }

  async changeStatus(id: string, status: QuotationStatus): Promise<IResponse<QuotationEntity>> {
    const quo = this._memory.quotetions.find((quo) => quo.id === id)

    if (!quo) throw Error('ບໍ່ມີຂໍ້ມູນ')

    quo.status = status

    return {
      data: quo,
      status: 'success',
      message: 'ປ່ຽນສະຖານະສຳເລັດ'
    }
  }
}
