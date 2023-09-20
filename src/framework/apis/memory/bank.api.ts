import type { BankEntity } from '@/entities/bank.entity'
import type { IBankApi } from '@/interface-adapter/apis/bank.api'
import type { BankDTO, ChangeStatusDTO } from '@/interface-adapter/dto/bank.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { MemoryApi } from './memory.api'

@singleton()
export class BankMemoryApi implements IBankApi {
  constructor(@inject(MemoryApi) private _memory: MemoryApi) {}

  async getAll(
    args: IGPaginate<Pick<BankEntity, 'accountName' | 'company'>>
  ): Promise<IResponse<IGPaginated<BankEntity>>> {
    const { page, limit, filter, first } = args
    let result = this._memory.bank
    let totals = result.length

    if (filter.company && filter.company.id) {
      result = result.filter((item) => item.company?.id === filter.company?.id)
      totals = result.length
    }

    if (filter?.accountName) {
      result = result.filter((item) => {
        if (filter?.accountName)
          return item.accountName?.toLowerCase().includes(filter?.accountName.toLowerCase())
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

  async create(item: BankDTO): Promise<IResponse<BankEntity>> {
    const bankId = String(this._memory.bank.length + 1)

    this._memory.bank.push({
      id: bankId,
      company: {
        id: item.company ? item.company.id : ''
      },
      bankName: item.bankName,
      accountName: item.accountName,
      accountNumber: item.accountNumber,
      description: item.description,
      status: 'active'
    })

    const data = this._memory.bank.find((item) => item.id === bankId)

    return {
      data,
      message: 'ເພີ່ມຂໍ້ມູນບັນຊີທະນາຄານສຳເລັດແລ້ວ',
      status: 'success'
    }
  }

  async update(item: BankDTO, id: string): Promise<IResponse<BankEntity>> {
    const bank = this._memory.bank.find((item) => item.id === id)

    if (!bank) {
      throw Error('ບໍ່ມິຂໍ້ມູນ')
    }

    bank.accountName = item.accountName
    bank.bankName = item.bankName
    bank.accountNumber = item.accountNumber
    bank.description = item.description

    return {
      data: bank,
      status: 'success',
      message: 'ອັບເດດຂໍ້ມູນບັນຊີທະນາຄານສຳເລັດແລ້ວ'
    }
  }

  async remove(id: string): Promise<IResponse<BankEntity>> {
    const idx = this._memory.bank.findIndex((item) => item.id === id)

    if (!idx && idx !== 0) {
      throw Error('ບໍ່ມີຂໍ້ມູນ')
    }

    this._memory.bank.splice(idx, 1)

    return {
      message: 'ລຶບຂໍ້ມູນບັນຊີທະນາຄານສຳເລັດແລ້ວ',
      status: 'success'
    }
  }

  async changeStatus(item: ChangeStatusDTO, id: string): Promise<IResponse<BankEntity>> {
    const bank = this._memory.bank.find((item) => item.id === id)

    if (!bank) {
      throw Error('ບໍ່ມິຂໍ້ມູນ')
    }

    bank.status = item.status

    return {
      data: bank,
      status: 'success',
      message: 'ອັບເດດສະຖານະບັນຊີທະນາຄານສຳເລັດແລ້ວ'
    }
  }
}
