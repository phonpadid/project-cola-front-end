<script setup lang="ts">
import type { UserDTO } from '@/interface-adapter/dto/user.dto'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../auth/stores/auth.store'
import FormUser from '../components/FormUser.vue'
import { useUserStore } from '../stores/user.store'

const { params } = useRoute()
const { update, getOne, state } = useUserStore()
const authStore = useAuthStore()

await getOne(params.id as string)

async function updateUser(values: Omit<UserDTO, 'company'>) {
  await update(state.data.id ? state.data.id : '', {
    ...values,
    company: { id: authStore.state.data?.company?.id }
  })
}
</script>

<template>
  <div class="card m-2">
    <h2>ແກ້ໄຂຜູ້ໃຊ້</h2>
    <form-user
      @submit="updateUser"
      :old-values="{
        name: state.data.name ? state.data.name : '',
        email: state.data.email ? state.data.email : '',
        password: state.data.password ? state.data.password : '',
        profile: state.data.profile? state.data.profile : '',
        role: {
          id: state.data.role && state.data.role?.id ? state.data.role?.id : ''
        },
        tel: state.data.tel ? state.data.tel : ''
      }"
    />
  </div>
</template>
