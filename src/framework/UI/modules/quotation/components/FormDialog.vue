<script setup lang="ts">
import type { Currency } from '@/entities/quotation.entity'
import Editor from '@/framework/UI/components/customComponents/FormEditor.vue'
import InputNumber from '@/framework/UI/components/customComponents/FormInputNumber.vue'
import InputText from '@/framework/UI/components/customComponents/FormInputText.vue'
import PButton from 'primevue/button'
import PDialog from 'primevue/dialog'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { itemSchema, type IItemSchema } from '../schema/quotation.schema'

const props = defineProps<{ header: string; currency?: Currency; formValues?: IItemSchema }>()
const emit = defineEmits<{ (e: 'onSubmit', values: IItemSchema): IItemSchema }>()

const visible = ref<boolean>(false)

const price = ref<number>(0)
const qty = ref<number>(0)
const total = computed(() => price.value * qty.value)

if (props.formValues) {
  const { formValues } = props

  price.value = formValues.price ? formValues.price : 0
  qty.value = formValues.qty ? formValues.qty : 0
}

function initTotal(values: { price?: number; qty?: number }): void {
  if (values.price) price.value = values.price
  if (values.qty) qty.value = values.qty
}

function onClearTotal() {
  price.value = 0
  qty.value = 0
}

const { handleSubmit } = useForm<IItemSchema>({
  validationSchema: itemSchema
})

const onSubmit = handleSubmit((values) => {
  emit('onSubmit', values)
})

defineExpose({
  visible
})
</script>

<template>
  <p-dialog
    v-model:visible="visible"
    modal
    :header="header"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    @hide="onClearTotal"
  >
    <form @submit.prevent="onSubmit" autocomplete="off">
      <input-text
        name="name"
        label="ຫົວຂໍ້ລາຍການ"
        required
        placeholder="ປ້ອນຫົວຂໍ້ລາຍການ"
        :value="formValues?.name"
      />
      <editor
        name="description"
        label="ລາຍລະອຽດ"
        placeholder="ປ້ອນລາຍລະອຽດ"
        :value="formValues?.description"
      />
      <input-number
        name="price"
        label="ລາຄາ"
        placeholder="ປ້ອນລາຄາ"
        :suffix="currency"
        @input="(e) => initTotal({ price: e })"
        :value="formValues?.price"
      />
      <input-number
        name="qty"
        label="ຈຳນວນ"
        placeholder="ປ້ອນຈຳນວນ"
        @input="(e) => initTotal({ qty: e })"
        :value="formValues?.qty"
      />
      <div class="flex align-items-center justify-content-between">
        <div>
          <b>ຍອດລວມ: {{ total.toLocaleString() }} {{ currency }}</b>
        </div>
        <p-button type="submit" label="ບັນທຶກ" icon="pi pi-save" />
      </div>
    </form>
  </p-dialog>
</template>
