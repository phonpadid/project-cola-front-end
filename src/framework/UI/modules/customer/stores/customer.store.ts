import type { CustomerEntity } from '@/entities/customer.entity'
import type { CustomerDTO } from '@/interface-adapter/dto/customer.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IGState } from '@/interface-adapter/interfaces/state.interface'
import { CustomerService } from '@/use-cases/customer/customer.service'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { reactive } from 'vue'

export const customerStore = defineStore('customer-store', () => {
  const customerService = container.resolve(CustomerService)
  const state = reactive<IGState<IGPaginated<CustomerEntity>, CustomerEntity>>({
    list: {
      props: [],
      total: 0
    },
    data: {},
    isLoading: false,
    error: ''
  })

  const stateCustomer = reactive<IGPaginate<Pick<CustomerEntity, 'name'>>>({
    page: 1,
    limit: 10,
    filter: { name: '' }
  })

  function clearFilterState() {
    stateCustomer.filter.name = ''
  }

  async function getToDropdown(args: IGPaginate<Pick<CustomerEntity, 'name'>>) {
    state.isLoading = true

    const results = await customerService.getAll(args)

    if (results?.data) {
      state.list.props = results.data.props
      state.list.total = results.data.total
    }

    state.isLoading = false
  }

  async function getAll() {
    state.isLoading = true

    const results = await customerService.getAll({
      page: stateCustomer.page,
      limit: stateCustomer.limit,
      filter: stateCustomer.filter
    })

    if (results?.data) {
      state.list.props = results.data.props
      state.list.total = results.data.total
    }

    state.isLoading = false
  }

  async function getOne(id: string) {
    state.isLoading = true

    const result = await customerService.getOne(id)

    if (result && result.data && state.data) {
      state.data = result.data
    }

    state.isLoading = false
  }

  async function create(item: CustomerDTO) {
    state.isLoading = true
    await customerService.create(item)

    state.isLoading = false
  }

  async function update(item: CustomerDTO, id: string) {
    state.isLoading = true
    const result = await customerService.update(item, id as string)
    if (result && result.data && state.data) {
      state.data = result.data
    }
    state.isLoading = false
  }

  async function remove(id: string) {
    state.isLoading = true
    const result = await customerService.remove(id as string)
    if (result?.status === 'success') {
      await getAll()
      return true
    }
    state.isLoading = false
  }

  return {
    state,
    stateCustomer,
    getAll,
    getOne,
    create,
    update,
    remove,
    clearFilterState,
    getToDropdown
  }
})
