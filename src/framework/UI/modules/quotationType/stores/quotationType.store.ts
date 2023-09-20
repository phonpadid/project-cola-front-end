import type { QuotationTypeEntity } from '@/entities/quotationType.entity'
import type { QuotationTypeDTO } from '@/interface-adapter/dto/quotationType.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IGState } from '@/interface-adapter/interfaces/state.interface'
import { QuotationTypeService } from '@/use-cases/quotationType/QuotationType.service'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { reactive } from 'vue'

export const useQuotationTypeStore = defineStore('quotationType-store', () => {
  const quotationTypeService = container.resolve(QuotationTypeService)
  const state = reactive<IGState<IGPaginated<QuotationTypeEntity>, QuotationTypeEntity>>({
    list: {
      props: [],
      total: 0
    },
    data: {},
    isLoading: false,
    error: ''
  })

  const paginate = reactive<IGPaginate<Pick<QuotationTypeEntity, 'name'>>>({
    page: 1,
    limit: 10,
    filter: { name: '' }
  })

  function clearFilterState() {
    paginate.filter.name = ''
  }

  async function getAll() {
    state.isLoading = true

    const results = await quotationTypeService.getAll({
      page: paginate.page,
      limit: paginate.limit,
      filter: paginate.filter
    })

    if (results && results.data && state.list) {
      state.list.props = results.data.props
      state.list.total = results.data.total
    }

    state.isLoading = false
  }

  async function create(item: QuotationTypeDTO) {
    state.isLoading = true
    const result = await quotationTypeService.create(item)
    if (result && result.status === 'success') {
      await getAll()
    }
    state.isLoading = false
  }

  async function update(input: QuotationTypeDTO, id: string) {
    state.isLoading = true
    const result = await quotationTypeService.update(input, id)
    if (result && result.status === 'success') {
      await getAll()
    }
    state.isLoading = false
  }

  async function remove(id: string) {
    state.isLoading = true
    const result = await quotationTypeService.remove(id as string)
    if (result && result.status === 'success') {
      await getAll()
    }
    state.isLoading = false
  }

  return { state, paginate, clearFilterState, getAll, create, update, remove }
})
