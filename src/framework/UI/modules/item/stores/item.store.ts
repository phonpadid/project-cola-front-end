import type { ItemEntity } from '@/entities/item.enttiy'
import type { ItemDTO, ReorderRowItemDTO } from '@/interface-adapter/dto/item.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IGState } from '@/interface-adapter/interfaces/state.interface'
import { ItemService } from '@/use-cases/item/item.service'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { reactive } from 'vue'

export interface ItemState extends IGState<IGPaginated<ItemEntity>, ItemEntity> {}
export interface itemPaginate extends Pick<IGPaginate<Pick<ItemEntity, 'quotation'>>, 'filter'> {}

export const useItemStore = defineStore('item-store', () => {
  const service = container.resolve(ItemService)
  const state = reactive<ItemState>({
    list: { props: [], total: 0 },
    data: {},
    isLoading: false,
    error: ''
  })
  const paginate = reactive<itemPaginate>({
    filter: { quotation: { id: '' } }
  })

  async function getAll() {
    state.isLoading = true

    const results = await service.getAll({
      filter: paginate.filter
    })

    if (results && results.data && state.list) {
      state.list.props = results.data.props
      state.list.total = results.data.total
    }

    state.isLoading = false
  }

  async function getOne(id: string) {
    state.isLoading = true

    const result = await service.getOne(id)

    if (result && result.data && state.data) {
      state.data = result.data
    }

    state.isLoading = false
  }

  async function create(item: ItemDTO) {
    state.isLoading = true

    const result = await service.create(item)

    if (result && result.status === 'success') {
      await getAll()

      state.isLoading = false

      return result.data
    }
  }

  async function update(id: string, item: ItemDTO) {
    state.isLoading = true

    await service.update(item, id)

    state.isLoading = false
  }

  async function reorderRow(input: ReorderRowItemDTO[]) {
    state.isLoading = true

    await service.reorderRow(input)

    state.isLoading = false
  }

  async function remove(id: string) {
    state.isLoading = true

    await service.remove(id)

    state.isLoading = false
  }

  return {
    state,
    paginate,
    getAll,
    getOne,
    create,
    update,
    remove,
    reorderRow
  }
})
