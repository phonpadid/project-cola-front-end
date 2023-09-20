import type { ItemEntity } from '@/entities/item.enttiy'
import type { ItemDTO, ReorderRowItemDTO } from '../dto/item.dto'
import type { IGPaginate, IGPaginated } from '../interfaces/pagination.interface'
import type { IResponse } from '../interfaces/response.interface'

export interface IItemApi {
  getAll(
    args: IGPaginate<Pick<ItemEntity, 'quotation'>>
  ): Promise<IResponse<IGPaginated<ItemEntity>>>

  getOne(id: string): Promise<IResponse<ItemEntity>>

  create(item: ItemDTO): Promise<IResponse<ItemEntity>>

  update(item: ItemDTO, id: string): Promise<IResponse<ItemEntity>>

  reorderRows(input: ReorderRowItemDTO[]): Promise<IResponse<ItemEntity[]>>

  remove(id: string): Promise<IResponse<ItemEntity>>
}
