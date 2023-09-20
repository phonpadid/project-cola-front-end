import type { UserEntity } from '@/entities/user.entity'
import type { UserDTO } from '@/interface-adapter/dto/user.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IGState } from '@/interface-adapter/interfaces/state.interface'
import { UserService } from '@/use-cases/user/user.service'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user-store', () => {
  const userService = container.resolve(UserService)
  const { push } = useRouter()
  const state = reactive<IGState<IGPaginated<UserEntity>, UserEntity>>({
    list: {
      props: [],
      total: 0
    },
    data: {},
    isLoading: false,
    error: ''
  })

  const paginate = reactive<IGPaginate<Pick<UserEntity, 'name' | 'company'>>>({
    page: 1,
    limit: 10,
    filter: { name: '', company: { id: '' } }
  })

  function clearFilter() {
    paginate.filter.name = ''
  }

  async function getAll(): Promise<void> {
    state.isLoading = true

    const results = await userService.getAll({
      page: paginate.page,
      limit: paginate.limit,
      filter: paginate.filter
    })

    if (results && results.data) {
      state.list.props = results.data.props
      state.list.total = results.data.total
    }

    state.isLoading = false
  }

  async function create(input: UserDTO): Promise<void> {
    state.isLoading = true

    const result = await userService.create(input)

    if (result) {
      push({ name: 'user.list' })
    }

    state.isLoading = false
  }

  async function getOne(id: string) {
    state.isLoading = true

    const result = await userService.getOne(id)

    if (result && result.data) {
      state.data = result.data
    }

    state.isLoading = false
  }

  async function update(id: string, input: UserDTO): Promise<void> {
    state.isLoading = true

    const result = await userService.update(id, input)

    if (result) {
      push({ name: 'user.list' })
    }

    state.isLoading = false
  }

  async function remove(id: string): Promise<void> {
    state.isLoading = true

    const result = await userService.remove(id)

    if (result) {
      await getAll()
    }
    state.isLoading = false
  }

  return { getAll, state, paginate, clearFilter, create, update, getOne, remove }
})
