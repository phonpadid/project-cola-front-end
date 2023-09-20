import type { RoleEntity } from '@/entities/role.entity'
import type { CreateRoleDTO, UpdateRoleDTO } from '@/interface-adapter/dto/role.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IGState } from '@/interface-adapter/interfaces/state.interface'
import { RoleService } from '@/use-cases/role/role.service'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { reactive } from 'vue'

export const useRoleStore = defineStore('role-store', () => {
  const service = container.resolve(RoleService)
  const state = reactive<IGState<IGPaginated<RoleEntity>, RoleEntity>>({
    list: {
      props: [],
      total: 0
    },
    data: {},
    isLoading: false,
    error: ''
  })

  const paginate = reactive<IGPaginate<RoleEntity>>({
    page: 1,
    limit: 10,
    filter: { name: '', company: { id: '' } }
  })

  function clearFilterState() {
    paginate.filter.name = ''
  }

  async function getToDropdown(args: IGPaginate<RoleEntity>) {
    state.isLoading = true

    const results = await service.getAll(args)

    if (results?.data) {
      state.list.props = results.data.props
      state.list.total = results.data.total
    }

    state.isLoading = false
  }

  async function getAll() {
    state.isLoading = true

    const results = await service.getAll({
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

  async function create(item: CreateRoleDTO) {
    state.isLoading = true

    const result = await service.create(item)

    if (result && result.status === 'success') {
      await getAll()
    }

    state.isLoading = false
  }

  async function update(id: string, item: UpdateRoleDTO) {
    state.isLoading = true

    const result = await service.update(id, item)

    if (result && result.status === 'success') {
      await getAll()
    }

    state.isLoading = false
  }

  async function remove(id: string) {
    state.isLoading = true
    const result = await service.remove(id)

    if (result && result.status === 'success') {
      await getAll()
    }

    state.isLoading = false
  }

  return {
    state,
    paginate,
    getToDropdown,
    getAll,
    clearFilterState,
    create,
    update,
    remove
  }
})
