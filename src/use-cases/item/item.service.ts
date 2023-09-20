import type { ItemEntity } from '@/entities/item.enttiy'
import type { ItemDTO, ReorderRowItemDTO } from '@/interface-adapter/dto/item.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { CreateItemUseCase } from './use-case/create.use-case'
import { GetAllItemUseCase } from './use-case/get-all.use-case'
import { GetOneItemUseCase } from './use-case/get-one.use-case'
import { RemoveItemUseCase } from './use-case/remove.use-case'
import { ReorderRowItemUseCase } from './use-case/reorder-row.use-case'
import { UpdateItemUseCase } from './use-case/update.use-case'

@singleton()
export class ItemService {
  constructor(
    @inject(GetAllItemUseCase) private _getAll: GetAllItemUseCase,
    @inject(GetOneItemUseCase) private _getOne: GetOneItemUseCase,
    @inject(CreateItemUseCase) private _create: CreateItemUseCase,
    @inject(UpdateItemUseCase) private _update: UpdateItemUseCase,
    @inject(RemoveItemUseCase) private _remove: RemoveItemUseCase,
    @inject(ReorderRowItemUseCase) private _reorderRow: ReorderRowItemUseCase
  ) {}

  async getAll(
    input: IGPaginate<Pick<ItemEntity, 'quotation'>>
  ): Promise<void | IResponse<IGPaginated<ItemEntity>>> {
    return await this._getAll.execute(input)
  }

  async getOne(id: string): Promise<void | IResponse<ItemEntity>> {
    return await this._getOne.execute(id)
  }

  async create(input: ItemDTO): Promise<void | IResponse<ItemEntity>> {
    return await this._create.execute(input)
  }

  async update(input: ItemDTO, id: string): Promise<void | IResponse<ItemEntity>> {
    return await this._update.execute(input, id)
  }

  async reorderRow(input: ReorderRowItemDTO[]): Promise<void | IResponse<ItemEntity[]>> {
    return await this._reorderRow.execute(input)
  }

  async remove(id: string): Promise<void | IResponse<ItemEntity>> {
    return await this._remove.execute(id)
  }
}
