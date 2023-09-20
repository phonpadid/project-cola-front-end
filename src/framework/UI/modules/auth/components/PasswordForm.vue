<script setup lang="ts">
import Password from '@/framework/UI/components/customComponents/FormPassword.vue'
import type { ChangePasswordDTO } from '@/interface-adapter/dto/user.dto'
import PButton from 'primevue/button'
import { useForm } from 'vee-validate'
import { changePasswordSchema } from '../schema/profile.schema'
import { useAuthStore } from '../stores/auth.store'

const { state, changePassword } = useAuthStore()

const { handleSubmit, resetForm } = useForm<ChangePasswordDTO>({
  validationSchema: changePasswordSchema
})

const onSubmit = handleSubmit(async (values) => {
  const status = await changePassword(values)
  if (status) {
    resetForm()
  }
})
</script>

<template>
  <form class="mt-3" @submit.prevent="onSubmit">
    <password label="ລະຫັດເກົ່າ" required name="oldPassword" placeholder="ປ້ອນລະຫັດເກົ່າ" />
    <password label="ລະຫັດໃໝ່" required name="newPassword" placeholder="ປ້ອນລະຫັດໃໝ່" feed-back />
    <p-button
      label="ປ່ຽນລະຫັດ"
      type="submit"
      icon="pi pi-save"
      :loading="state.isLoading"
      severity="info"
    />
  </form>
</template>
