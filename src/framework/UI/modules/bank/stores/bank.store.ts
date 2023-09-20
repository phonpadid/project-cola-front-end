import type { BankEntity } from '@/entities/bank.entity'
import type { BankDTO, ChangeStatusDTO } from '@/interface-adapter/dto/bank.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IGState } from '@/interface-adapter/interfaces/state.interface'
import { BankService } from '@/use-cases/bank/bank.service'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { reactive } from 'vue'

export const useBankStore = defineStore('bank-store', () => {
  const bankService = container.resolve(BankService)
  const state = reactive<IGState<IGPaginated<BankEntity>, BankEntity>>({
    list: {
      props: [],
      total: 0
    },
    data: {},
    isLoading: false,
    error: ''
  })

  const paginate = reactive<IGPaginate<Pick<BankEntity, 'accountName' | 'company'>>>({
    page: 1,
    limit: 10,
    filter: { accountName: '', company: { id: '' } }
  })

  function clearFilterState() {
    paginate.filter.accountName = ''
  }

  async function getAll() {
    state.isLoading = true

    const results = await bankService.getAll({
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

  async function create(item: BankDTO) {
    state.isLoading = true
    const result = await bankService.create(item)
    if (result && result.status === 'success') {
      await getAll()
    }
    state.isLoading = false
  }

  async function update(input: BankDTO, id: string) {
    state.isLoading = true
    const result = await bankService.update(input, id)
    if (result && result.status === 'success') {
      await getAll()
    }
    state.isLoading = false
  }

  async function remove(id: string) {
    state.isLoading = true
    const result = await bankService.remove(id as string)
    if (result && result.status === 'success') {
      await getAll()
    }
    state.isLoading = false
  }

  async function changeStatus(item: ChangeStatusDTO, id: string) {
    state.isLoading = true
    const result = await bankService.changeStatus(item, id)

    if (result && result.status === 'success') {
      await getAll()
    }

    state.isLoading = false
  }

  return { state, paginate, clearFilterState, getAll, create, update, remove, changeStatus }
})
