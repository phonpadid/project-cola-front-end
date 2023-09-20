<script setup lang="ts">
import InputText from '@/framework/UI/components/customComponents/FormInputText.vue'
import type { UpdateCompanyDTO } from '@/interface-adapter/dto/company.dto'
import PButton from 'primevue/button'
import { useForm } from 'vee-validate'
import { companySchema } from '../schema/comapny.schema'

defineProps<{
  form: Omit<UpdateCompanyDTO, 'logo'>
}>()
const emit = defineEmits<{
  (e: 'submit', values: Omit<UpdateCompanyDTO, 'logo'>): Omit<UpdateCompanyDTO, 'logo'>
}>()

const { handleSubmit } = useForm<Omit<UpdateCompanyDTO, 'logo'>>({
  validationSchema: companySchema
})

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="grid mt-3">
    <div class="col-12 md:col-6">
      <input-text
        label="ຊື່ບໍລິສັດ"
        placeholder="ປ້ອນຊື່ບໍລິສັດ"
        required
        name="name"
        :value="form.name"
      />
      <input-text label="ອີເມວ" placeholder="ປ້ອນອີເມວ" required name="email" :value="form.email" />
    </div>
    <div class="col-12 md:col-6">
      <input-text label="ເບີໂທ" placeholder="ປ້ອນເບີໂທ" required name="phone" :value="form.phone" />
      <input-text
        label="ທີ່ຢູ່"
        placeholder="ປ້ອນທີ່ຢູ່"
        required
        name="address"
        :value="form.address"
      />
    </div>
    <div class="flex justify-content-center w-full">
      <p-button label="ບັນທຶກ" icon="pi pi-save" severity="info" type="submit" class="w-16rem" />
    </div>
  </form>
</template>
