import type { ItemEntity } from '@/entities/item.enttiy'
import type { IItemApi } from '@/interface-adapter/apis/item.api'
import type { ItemDTO, ReorderRowItemDTO } from '@/interface-adapter/dto/item.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { MemoryApi } from './memory.api'

@singleton()
export class ItemMemoryApi implements IItemApi {
  constructor(@inject(MemoryApi) private _memory: MemoryApi) {}

  async getAll(
    args: IGPaginate<Pick<ItemEntity, 'quotation'>>
  ): Promise<IResponse<IGPaginated<ItemEntity>>> {
    const { filter } = args
    let totals = this._memory.items.length
    let result = this._memory.items

    if (filter.quotation && filter.quotation.id) {
      result = result.filter((item) => {
        if (filter.quotation?.id) return item.quotation?.id === filter.quotation.id
      })
      totals = result.length
    }

    return {
      data: { props: result, total: totals },
      status: 'success'
    }
  }

  async create(item: ItemDTO): Promise<IResponse<ItemEntity>> {
    const id = String(this._memory.items.length + 1)

    const newData: ItemEntity = {
      id,
      name: item.name,
      orderNumber: item.orderNumber ? item.orderNumber : 0,
      description: item.description,
      price: item.price,
      qty: item.qty,
      quotation: item.quoId ? { id: item.quoId } : undefined
    }

    const quo = this._memory.quotetions.find((quo) => quo.id === item.quoId)

    if (!quo) throw Error('ບໍ່ມີຂໍ້ມູນ')

    let total: number = 0

    quo.items.forEach((item) => {
      if (item.price && item.qty) {
        total += item.price * item.qty
      }
    })

    quo.items.push({ id: newData.id })
    quo.total = total

    this._memory.items.push(newData)

    return {
      data: newData,
      message: 'ເພີ່ມຂໍ້ມູນລາຍການສຳເລັດແລ້ວ',
      status: 'success'
    }
  }

  async getOne(id: string): Promise<IResponse<ItemEntity>> {
    const item = this._memory.items.find((item) => item.id === id)

    if (!item) throw Error('ບໍ່ມີຂໍ້ມູນ')

    return { data: item, status: 'success' }
  }

  async update(input: ItemDTO, id: string): Promise<IResponse<ItemEntity>> {
    const item = this._memory.items.find((item) => item.id === id)

    if (!item) {
      throw Error('ບໍ່ມິຂໍ້ມູນ')
    }

    item.name = input.name
    item.orderNumber = item.orderNumber ? item.orderNumber : 0
    item.description = input.description
    item.price = input.price
    item.qty = input.qty

    const quo = this._memory.quotetions.find((quo) => quo.id === item.quotation?.id)

    if (!quo) throw Error('ບໍ່ມີຂໍ້ມູນ')

    let total: number = 0

    quo.items.forEach((item) => {
      if (item.price && item.qty) {
        total += item.price * item.qty
      }
    })

    quo.total = total

    return {
      data: item,
      status: 'success',
      message: 'ອັບເດດຂໍ້ມູນບໍລິສັດສຳເລັດແລ້ວ'
    }
  }

  async reorderRows(input: ReorderRowItemDTO[]): Promise<IResponse<ItemEntity[]>> {
    const item1 = this._memory.items.find((item) => item.id === input[0].id)
    const item2 = this._memory.items.find((item) => item.id === input[1].id)

    if (!item1 || !item2) {
      throw Error('ບໍ່ມິຂໍ້ມູນ')
    }

    item1.orderNumber = input[0].orderNumber
    item2.orderNumber = input[1].orderNumber

    return { data: [item1, item2], message: 'ປ່ຽນລຳດັບສຳເລັດ', status: 'success' }
  }

  async remove(id: string): Promise<IResponse<ItemEntity>> {
    const idx = this._memory.items.findIndex((item) => item.id === id)

    if (!idx && idx !== 0) {
      throw Error('ບໍ່ມີຂໍ້ມູນ')
    }

    this._memory.items.splice(idx, 1)

    return {
      message: 'ລຶບຂໍ້ມູນລາຍການສຳເລັດແລ້ວ',
      status: 'success'
    }
  }
}
