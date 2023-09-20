<script setup lang="ts">
import type { RoleEntity } from '@/entities/role.entity'
import Checkbok from '@/framework/UI/components/customComponents/FormCheckbox.vue'
import InputText from '@/framework/UI/components/customComponents/FormInputText.vue'
import type { OptionDD } from '@/framework/UI/components/interface/option.interface'
import PButton from 'primevue/button'
import PDialog from 'primevue/dialog'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { roleSchema, type RoleSchema } from '../schema/role.schema'

defineProps<{ oldData?: RoleEntity }>()

const visible = ref<boolean>(false)

const emit = defineEmits<{ (e: 'submit', values: RoleSchema): RoleSchema }>()

const permissionOptions = ref<OptionDD<string>[]>([
  { label: 'invoice', value: '1' },
  { label: 'purchase-order', value: '2' },
  { label: 'quotation', value: '3' },
  { label: 'receipt', value: '4' }
])

const { handleSubmit } = useForm<RoleSchema>({
  validationSchema: roleSchema
})

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})

defineExpose({
  visible
})
</script>

<template>
  <p-dialog
    v-model:visible="visible"
    modal
    :header="!oldData ? 'ເພີ່ມບົດບາດ' : 'ແກ້ໄຂບົດບາດ'"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '640px': '95vw' }"
  >
    <form @submit.prevent="onSubmit">
      <input-text
        required
        label="ຊື່ບົດບາດ"
        placeholder="ປ້ອນຊື່ບົດບາດ"
        name="name"
        :value="oldData?.name"
      />
      <checkbok
        required
        label="ສິດ"
        placeholder="ເລືອກສິດ"
        :options="permissionOptions"
        name="permissions"
        :value="oldData?.permissions?.map((per) => per.id as string)"
      />
      <div class="flex justify-content-end">
        <p-button label="ບັນທຶກ" icon="pi pi-check" autofocus type="submit" />
      </div>
    </form>
  </p-dialog>
</template>
