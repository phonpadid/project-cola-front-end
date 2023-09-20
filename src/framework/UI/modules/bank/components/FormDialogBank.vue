<script setup lang="ts">
import type { BankEntity } from '@/entities/bank.entity'
import type { BankDTO } from '@/interface-adapter/dto/bank.dto'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import FormInputMask from '../../../components/customComponents/FormInputMask.vue'
import InputText from '../../../components/customComponents/FormInputText.vue'
import FormTexrarea from '../../../components/customComponents/FormTexrarea.vue'
import { bankSchema } from '../schema/bank.schema'

const visible = ref<boolean>(false)
defineExpose({ visible })

defineProps<{ oldData?: BankEntity }>()

const emit = defineEmits<{ (e: 'submit', values: BankDTO): void }>()

const { handleSubmit } = useForm<BankDTO>({
  validationSchema: bankSchema
})

const onSubmit = handleSubmit(async (values) => {
  emit('submit', values)
})
</script>
<template>
  <Dialog
    modal
    v-model:visible="visible"
    :header="!oldData ? 'ເພີ່ມບັນຊີ' : 'ແກ້ໄຂບັນຊີ'"
    :breakpoints="{ '960px': '75vw', '640px': '95vw' }"
  >
    <form @submit.prevent="onSubmit" class="flex flex-column gap-3">
      <div class="grid">
        <div class="col-12 md:col-6">
          <input-text
            :value="oldData?.accountName"
            name="accountName"
            label="ຊື່"
            required
            placeholder="ປ້ອນຊື່"
          />
        </div>
        <div class="col-12 md:col-6">
          <input-text
            :value="oldData?.bankName"
            name="bankName"
            label="ຊື່ທະນາຄານ"
            required
            placeholder="ປ້ອນຊື່ທະນາຄານ"
          />
        </div>
        <div class="col-12 md:col-6">
          <form-input-mask
            :value="oldData?.accountNumber"
            mask="9999-9999-9999-9999"
            name="accountNumber"
            label="ເລກບັນຊີ"
            required
            placeholder="ປ້ອນເລກບັນຊີ"
          />
        </div>
        <div class="col-12">
          <form-texrarea
            :value="oldData?.description"
            name="description"
            label="ລາຍລະອຽດ"
            placeholder="ປ້ອນລາຍລະອຽດ"
          />
        </div>
      </div>
      <div class="flex justify-content-center">
        <Button
          class="w-8rem"
          type="submit"
          :label="!oldData ? 'ບັນທຶກ' : 'ແກ້ໄຂ'"
          icon="pi pi-save"
          severity="info"
        />
      </div>
    </form>
  </Dialog>
</template>

<style scoped></style>
