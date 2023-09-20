import type { QuotationTypeEntity } from '@/entities/quotationType.entity'
import type { IQuotationTypeApi } from '@/interface-adapter/apis/quotationType.api'
import type { QuotationTypeDTO } from '@/interface-adapter/dto/quotationType.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { MemoryApi } from './memory.api'

@singleton()
export class QuotationTypeMemoryApi implements IQuotationTypeApi {
  constructor(@inject(MemoryApi) private _memory: MemoryApi) {}

  async getAll(
    args: IGPaginate<Pick<QuotationTypeEntity, 'name'>>
  ): Promise<IResponse<IGPaginated<QuotationTypeEntity>>> {
    const { page, limit, filter, first } = args
    let result = this._memory.quotationType
    let totals = result.length

    if (filter?.name) {
      result = result.filter((item) => {
        if (filter?.name) return item.name?.toLowerCase().includes(filter?.name.toLowerCase())
      })
      totals = result.length
    }

    if (page && limit) {
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      result = result.slice(startIndex, endIndex)
    }

    if (first && limit) {
      const startIndex = first - 1
      const endIndex = startIndex + limit - 1
      result = result.slice(startIndex, endIndex)
    }

    return {
      data: { props: result, total: totals },
      status: 'success'
    }
  }

  async create(item: QuotationTypeDTO): Promise<IResponse<QuotationTypeEntity>> {
    const quotationTypeId = String(this._memory.quotationType.length + 1)

    this._memory.quotationType.push({
      id: quotationTypeId,
      name: item.name,
      rateKip: Number(item.rateKip),
      rateBath: Number(item.rateBath),
      rateDollar: Number(item.rateDollar)
    })

    const data = this._memory.quotationType.find((item) => item.id === quotationTypeId)

    return {
      data,
      message: 'ເພີ່ມຂໍ້ມູນປະເພດໃບສະເໜີລາຄາສຳເລັດແລ້ວ',
      status: 'success'
    }
  }

  async update(item: QuotationTypeDTO, id: string): Promise<IResponse<QuotationTypeEntity>> {
    const quotationType = this._memory.quotationType.find((item) => item.id === id)

    if (!quotationType) {
      throw Error('ບໍ່ມິຂໍ້ມູນ')
    }

    quotationType.name = item.name
    quotationType.rateKip = Number(item.rateKip)
    quotationType.rateBath = Number(item.rateBath)
    quotationType.rateDollar = Number(item.rateDollar)

    return {
      data: quotationType,
      status: 'success',
      message: 'ອັບເດດຂໍ້ມູນປະເພດໃບສະເໜີລາຄາສຳເລັດແລ້ວ'
    }
  }

  async remove(id: string): Promise<IResponse<QuotationTypeEntity>> {
    const idx = this._memory.quotationType.findIndex((item) => item.id === id)

    if (!idx && idx !== 0) {
      throw Error('ບໍ່ມີຂໍ້ມູນ')
    }

    this._memory.quotationType.splice(idx, 1)

    return {
      message: 'ລຶບຂໍ້ມູນປະເພດໃບສະເໜີລາຄາສຳເລັດແລ້ວ',
      status: 'success'
    }
  }
}
