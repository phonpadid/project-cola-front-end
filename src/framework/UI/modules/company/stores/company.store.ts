import type { CompanyEntity } from '@/entities/company.entity'
import type { CreateCompanyDTO, UpdateCompanyDTO } from '@/interface-adapter/dto/company.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IGState } from '@/interface-adapter/interfaces/state.interface'
import { CompanyService } from '@/use-cases/company/company.service'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { reactive } from 'vue'

export const companyStore = defineStore('company-store', () => {
  const companyService = container.resolve(CompanyService)
  const state = reactive<IGState<IGPaginated<CompanyEntity>, CompanyEntity>>({
    list: { props: [], total: 0 },
    data: {},
    isLoading: false,
    error: ''
  })

  const stateCompany = reactive<IGPaginate<Pick<CompanyEntity, 'name'>>>({
    page: 1,
    limit: 10,
    filter: { name: '' }
  })

  function clearFilterState() {
    stateCompany.filter.name = ''
  }

  async function getToDropdown(args: Pick<IGPaginate, 'limit' | 'first'>) {
    state.isLoading = true

    const results = await companyService.getAll(args)

    if (results?.data) {
      state.data.props = results.data.props
      state.data.total = results.data.total
    }

    state.isLoading = false
  }

  async function getAll() {
    state.isLoading = true

    const results = await companyService.getAll({
      page: stateCompany.page,
      limit: stateCompany.limit,
      filter: stateCompany.filter
    })

    if (results && results.data && state.list) {
      state.list.props = results.data.props
      state.list.total = results.data.total
    }

    state.isLoading = false
  }

  async function getOne(id: string) {
    state.isLoading = true

    const result = await companyService.getOne(id)

    if (result && result.data && state.data) {
      state.data = result.data
    }

    state.isLoading = false
  }

  async function create(item: CreateCompanyDTO) {
    state.isLoading = true
    await companyService.create(item)

    state.isLoading = false
  }

  async function update(input: UpdateCompanyDTO, id: string) {
    state.isLoading = true

    const result = await companyService.update(input, id)
    if (result && result.data && state.data) {
      state.data = result.data
    }

    state.isLoading = false
  }

  async function updateImage(input: UpdateCompanyDTO, id: string) {
    state.isLoading = true

    const result = await companyService.update(input, id)

    if (result && result.data && state.data) {
      state.data = result.data
    }

    state.isLoading = false
  }

  async function remove(id: string) {
    state.isLoading = true
    const result = await companyService.remove(id as string)
    if (result?.status === 'success') {
      await getAll()
      return true
    }
    state.isLoading = false
  }

  return {
    state,
    stateCompany,
    getAll,
    getOne,
    create,
    update,
    remove,
    clearFilterState,
    updateImage,
    getToDropdown
  }
})
