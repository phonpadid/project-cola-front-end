import type { QuotationEntity, QuotationStatus } from '@/entities/quotation.entity'
import type {
  CreateQuotationDTO,
  GetAllQuotationDTO,
  QueryQuotationDTO,
  UpdateQuotationDTO
} from '@/interface-adapter/dto/quotation.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IGState } from '@/interface-adapter/interfaces/state.interface'
import { QuotationService } from '@/use-cases/quotation/quotation.service'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export const useQuotationStore = defineStore('quotation-store', () => {
  const { push } = useRouter()
  const service = container.resolve(QuotationService)
  const state = reactive<IGState<IGPaginated<GetAllQuotationDTO>, QuotationEntity>>({
    list: {
      props: [],
      total: 0
    },
    data: {},
    isLoading: false,
    error: ''
  })

  const queryArgs = reactive<IGPaginate<QueryQuotationDTO>>({
    page: 1,
    limit: 10,
    filter: {
      id: '',
      name: '',
      billTo: '',
      endDate: undefined,
      status: undefined
    }
  })

  function clearFilterState() {
    queryArgs.filter = {
      id: '',
      name: '',
      billTo: '',
      endDate: undefined
    }
  }

  async function getAll() {
    state.isLoading = true

    const result = await service.getAll(queryArgs)

    if (result) {
      state.list.props = result.data ? result.data.props : []
      state.list.total = result.data ? result.data.total : 0
    }

    state.isLoading = false
  }

  async function create(item: CreateQuotationDTO) {
    state.isLoading = true

    const result = await service.create(item)

    if (result && result.status === 'success') {
      push({ name: 'quotation.list' })
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

  async function update(id: string, input: UpdateQuotationDTO) {
    state.isLoading = true

    const result = await service.update(id, input)

    if (result && result.status === 'success') {
      push({ name: 'quotation.list' })
    }

    state.isLoading = false
  }

  async function changeStatus(id: string, input: QuotationStatus) {
    state.isLoading = true

    const result = await service.chnageStatus(id, input)

    if (result && result.status === 'success') {
      await getAll()
    }

    state.isLoading = false
  }

  return { getAll, state, queryArgs, clearFilterState, create, getOne, update, changeStatus }
})
