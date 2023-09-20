<script setup lang="ts">
import type { UpdateProfileDTO } from '@/interface-adapter/dto/user.dto'
import PButton from 'primevue/button'
import { useForm } from 'vee-validate'
import InputText from '../../../components/customComponents/FormInputText.vue'
import { updateProfileSchema } from '../schema/profile.schema'
import { useAuthStore } from '../stores/auth.store'

const { state, updateProfile } = useAuthStore()

const { handleSubmit } = useForm<Omit<UpdateProfileDTO, 'profile'>>({
  validationSchema: updateProfileSchema
})

const onSubmit = handleSubmit(async (values) => {
  await updateProfile(values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="mt-3" v-if="state.data">
    <input-text
      name="name"
      label="ຊື່ຜູ້ໃຊ້"
      required
      placeholder="ປ້ອນຊື່ຜູ້ໃຊ້"
      :value="state.data.name"
    />
    <input-text name="tel" label="ເບີໂທ" required placeholder="ປ້ອນເບີໂທ" :value="state.data.tel" />
    <p-button
      label="ບັນທຶກ"
      type="submit"
      icon="pi pi-save"
      severity="info"
      :loading="state.isLoading"
    />
  </form>
</template>
