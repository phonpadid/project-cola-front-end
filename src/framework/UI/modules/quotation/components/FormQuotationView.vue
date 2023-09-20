<script setup lang="ts">
import { type Currency, type QuotationEntity } from '@/entities/quotation.entity'
import Calendar from '@/framework/UI/components/customComponents/FormCalendar.vue'
import Dropdown from '@/framework/UI/components/customComponents/FormDropdown.vue'
import InputNumber from '@/framework/UI/components/customComponents/FormInputNumber.vue'
import InputText from '@/framework/UI/components/customComponents/FormInputText.vue'
import Texrarea from '@/framework/UI/components/customComponents/FormTexrarea.vue'
import type { OptionDD } from '@/framework/UI/components/interface/option.interface'
import PButton from 'primevue/button'
import Divider from 'primevue/divider'
import type { VirtualScrollerLazyEvent } from 'primevue/virtualscroller'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useAuthStore } from '../../auth/stores/auth.store'
import { companyStore } from '../../company/stores/company.store'
import { customerStore } from '../../customer/stores/customer.store'
import ListItem from '../components/ListItem.vue'
import { quotationSchema, type IQuotationSchema } from '../schema/quotation.schema'

defineProps<{
  oldData?: Partial<QuotationEntity>
}>()

const emit = defineEmits<{ (e: 'submit', values: IQuotationSchema): void }>()

const listItemRef = ref<InstanceType<typeof ListItem> | null>(null)

defineExpose({
  listItemRef
})

const { state, getToDropdown } = customerStore()
const authStore = useAuthStore()

const companyStote = companyStore()
if (authStore.state.data && authStore.state.data.company && authStore.state.data.company.id) {
  await companyStote.getOne(authStore.state.data.company.id)
}

await getToDropdown({ first: 1, limit: 9, filter: {} })

const customerOptions = ref<OptionDD<string>[]>(Array.from({ length: state.list.total }))

async function loadCustomerOptions(e: VirtualScrollerLazyEvent) {
  await getToDropdown({ first: e.first + 1, limit: e.last - e.first + 1, filter: {} })

  for (let _i = e.first; _i < e.last; _i++) {
    customerOptions.value[_i] = {
      label: state.list.props[_i - e.first].name,
      value: state.list.props[_i - e.first].id
    }
  }
}

const currencyOptions = ref<OptionDD<Currency>[]>([
  { value: '$', label: '$' },
  { value: '฿', label: '฿' },
  { value: '₭', label: '₭' }
])

const { handleSubmit, values } = useForm<IQuotationSchema>({
  validationSchema: quotationSchema
})

const onSubmit = handleSubmit(async (values): Promise<void> => {
  emit('submit', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <img
      :src="companyStote.state.data?.logo ? companyStote.state.data.logo : `/logo.png`"
      alt="company logo"
      style="width: 10rem"
    />
    <divider />
    <div class="grid">
      <div class="col-12 md:col-6">
        <input-text
          name="from.name"
          label="ຊື່ບໍລິສັດ"
          placeholder="ປ້ອນຊື່ບໍລິສັດ"
          required
          :value="companyStote.state.data?.name"
        />
        <input-text
          name="from.phone"
          label="ເບີໂທບໍລິສັດ"
          placeholder="ປ້ອນເບີໂທບໍລິສັດ"
          required
          :value="companyStote.state.data?.phone"
        />
        <input-text
          name="from.email"
          label="ອີເມວບໍລິສັດ"
          placeholder="ປ້ອນອີເມວບໍລິສັດ"
          :value="companyStote.state.data?.email"
        />
        <input-text
          name="from.address"
          label="ທີ່ຢູ່ບໍລິສັດ"
          placeholder="ປ້ອນທີ່ຢູ່ບໍລິສັດ"
          :value="companyStote.state.data?.address"
        />
      </div>
      <div class="col-12 md:col-6">
        <input-text name="name" label="ຊື່" placeholder="ປ້ອນຊື່" required :value="oldData?.name" />
        <calendar
          name="date"
          label="ວັນທີ່"
          placeholder="ເລືອກວັນທີ່"
          required
          :value="
            oldData?.startDate && oldData?.endDate ? [oldData?.startDate, oldData?.endDate] : []
          "
          selection-mode="range"
        />
        <dropdown
          name="billTo"
          label="ສົ່ງໃຫ້ລູກຄ່າ"
          placeholder="ເລືອກລູກຄ່າ"
          required
          :options="customerOptions"
          :lazy="{ isLoading: state.isLoading }"
          @on-lazy-load="loadCustomerOptions"
          :value="oldData?.billTo?.id"
        />
        <dropdown
          name="currency"
          label="ສະກຸນເງີນ"
          placeholder="ເລືອກສະກຸນເງີນ"
          required
          :options="currencyOptions"
          :value="oldData?.currency"
        />
      </div>
      <list-item :currency="values.currency" ref="listItemRef" :old-data="oldData" />
      <div class="col-12 md:col-6">
        <input-number
          name="tax"
          label="ພາສີ"
          placeholder="ປ້ອນພາສີ"
          suffix="%"
          :value="7"
          disabled
        />
      </div>
      <div class="col-12 md:col-6">
        <input-number
          name="discount"
          label="ສ່ວນຫຼຸດ"
          placeholder="ປ້ອນສ່ວນຫຼຸດ"
          suffix="%"
          :value="oldData?.discount"
        />
      </div>
      <texrarea name="note" label="ໝາຍເຫດ" placeholder="ປ້ອນໝາຍເຫດ" :value="oldData?.note" />
    </div>
    <div class="flex justify-content-center">
      <p-button
        type="submit"
        label="ບັນທຶກ"
        icon="pi pi-save"
        class="w-16rem"
        :loading="state.isLoading"
      />
    </div>
  </form>
</template>
