<script setup lang="ts">
import type { UserDTO } from '@/interface-adapter/dto/user.dto'
import { useAuthStore } from '../../auth/stores/auth.store'
import FormUser from '../components/FormUser.vue'
import { useUserStore } from '../stores/user.store'

const authStore = useAuthStore()
const { create } = useUserStore()

async function createUser(values: Omit<UserDTO, 'company'>) {
  await create({
    ...values,
    company: { id: authStore.state.data?.company?.id }
  })
}
</script>

<template>
  <div class="card">
    <h2>ເພີ່ມຜູ້ໃຊ້</h2>
    <form-user @submit="createUser" />
  </div>
</template>
