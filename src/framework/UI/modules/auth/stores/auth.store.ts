import type { UserEntity } from '@/entities/user.entity'
import type { LoginReqDTO } from '@/interface-adapter/dto/login.dto'
import type { ChangePasswordDTO, UpdateProfileDTO } from '@/interface-adapter/dto/user.dto'
import { AuthenticationService } from '@/use-cases/authentication/authentication.service'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export interface AuthState {
  data: UserEntity | null
  isLoading: boolean
  errorMessage: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const authService = container.resolve(AuthenticationService)
  const state = reactive<AuthState>({
    data: null,
    isLoading: false,
    errorMessage: ''
  })
  const form = reactive<LoginReqDTO>({
    // email: '',
    // password: ''
    email: 'user1@gmail.com',
    password: 'password'
  })

  async function login(item: any) {
    state.isLoading = true
    state.errorMessage = ''

    const result = await authService.login(item)

    if (result) {
      if (result.status === 'success' && result.data) {
        state.data = result.data.user
        router.push({ name: 'dashboard' })
      } else {
        state.errorMessage = result.message ? result.message : ''
      }
    }

    state.isLoading = false
  }

  async function getAuth() {
    state.isLoading = true
    const result = await authService.getAuth()

    if (result) {
      if (result.status === 'success' && result.data) {
        state.data = result.data
      }
    }

    state.isLoading = false
  }

  async function updateProfile(input: Omit<UpdateProfileDTO, 'profile'>) {
    state.isLoading = true

    const result = await authService.updateProfile(input)

    if (result) {
      if (result.data && state.data) {
        state.data = result.data
      }
    }

    state.isLoading = false
  }

  async function updateImage(input: Pick<UpdateProfileDTO, 'profile'>) {
    state.isLoading = true

    let result

    if (state.data) {
      result = await authService.updateProfile({
        name: state.data.name,
        tel: state.data.tel ? state.data.tel : '',
        profile: input.profile
      })
    }

    if (result) {
      if (result.data && state.data) {
        state.data = result.data
      }
    }

    state.isLoading = false
  }

  async function changePassword(input: ChangePasswordDTO) {
    state.isLoading = true

    const result = await authService.changePassword(input)

    state.isLoading = false

    if (result) {
      return result.status
    }
  }

  async function logout() {
    state.isLoading = true

    const result = await authService.logout()

    if (result && result.status === 'success') {
      router.push({ name: 'login' })
    }

    state.isLoading = false
  }

  return { state, form, login, logout, getAuth, updateProfile, updateImage, changePassword }
})
