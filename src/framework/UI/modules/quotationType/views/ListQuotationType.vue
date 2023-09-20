<script setup lang="ts">
import PButton from 'primevue/button'
import Column from 'primevue/column'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import { useConfirm } from 'primevue/useconfirm'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CreateQuotationType from '../components/CreateQuotationType.vue'
import UpdateQuotationType from '../components/UpdateQuotationType.vue'
import { useQuotationTypeStore } from '../stores/quotationType.store'

const { state, paginate, clearFilterState, getAll, remove } = useQuotationTypeStore()
const { push } = useRouter()
const { query } = useRoute()

const search = ref<string>('')

async function initComponent() {
  clearFilterState()
  if (Object.keys(query).length !== 0) {
    paginate.page = query.page ? Number(query.page) : 1
    paginate.limit = query.limit ? Number(query.limit) : 10
    paginate.filter.name = query.name ? (query.name as string) : undefined
    search.value = query.name ? (query.name as string) : ''
    if (search.value === '') {
      push({ query: { page: paginate.page, limit: paginate.limit, name: undefined } })
    } else {
      push({
        query: {
          page: paginate.page,
          limit: paginate.limit,
          name: paginate.filter.name
        }
      })
    }
  }

  await getAll()
}

await initComponent()

const first = computed(() => {
  let result: number = 0
  if (paginate.page && paginate.limit) {
    result = (paginate.page - 1) * paginate.limit
  }
  return result
})

async function onPageChange(pageEvent: DataTablePageEvent) {
  paginate.page = pageEvent.page + 1
  paginate.limit = pageEvent.rows

  const { page, limit, filter } = paginate
  push({
    name: 'quotationType.list',
    query: { page, limit, name: filter.name ? filter.name : undefined }
  })
  await getAll()
}

async function onSearch() {
  const { filter } = paginate
  filter.name = ''
  if (filter?.name !== undefined) {
    filter.name = search.value

    push({ query: { page: paginate.page, limit: paginate.limit, name: filter.name } })
  }
  await getAll()
}

async function onClearSearch(e: any) {
  if (e.target.value === '') {
    if (paginate.filter?.name !== undefined) {
      paginate.filter.name = ''
    }
    push({ query: { name: undefined } })
    await getAll()
  }
}

const confirm = useConfirm()
async function onConfirmDelete(id: string) {
  confirm.require({
    message: 'ທ່ານຕ້ອງການລຶບລາຍການນີ້ບໍ?',
    header: 'ການຢືນຢັນ',
    icon: 'pi pi-exclamation-triangle text-red-500',
    acceptClass: 'p-button-danger',
    rejectClass: 'text-red-800 bg-red-50 border-none',
    accept: async () => {
      await remove(id)
    }
  })
}
</script>
<template>
  <div class="card m-2">
    <h2 class="mb-3">ດຶງລາຍການໂພສຈາກເຟສບຸກ</h2>
    
    <!-- <data-table
      :value="state.list.props"
      :loading="state.isLoading"
      lazy
      :totalRecords="state.list.total"
      @page="onPageChange"
      paginator
      :rows="paginate.limit"
      :first="first"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="ສະແດງ {first} ຫາ {last} ຈາກ {totalRecords} ແຖວ"
    >
      <template #header>
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
          <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
            <i class="pi pi-search" />
            <input-text
              v-model:modelValue="search"
              placeholder="ຄົ້ນຫາ..."
              @keyup.enter="onSearch"
              @input="onClearSearch"
              class="w-full"
            />
          </span>
          <create-quotation-type />
        </div>
      </template>
      <template #empty>
        <div class="flex justify-content-center">
          <h5 class="mb-0 text-color">ບໍ່ມີຂໍ້ມູນ</h5>
        </div>
      </template>
      <column header="ຊື່" field="name" class="white-space-nowrap" />
      <column header="ລາຄາກີບ" field="rateKip" class="white-space-nowrap">
        <template #body="{ data }">
          <p v-if="!state.isLoading" class="text-yellow-700 font-medium text-base">
            {{ data.rateKip.toLocaleString('en-US') }} ກີບ
          </p>
        </template>
      </column>
      <column header="ລາຄາບາດ" field="rateBath" class="white-space-nowrap">
        <template #body="{ data }">
          <p v-if="!state.isLoading" class="text-green-700 font-medium text-base">
            {{ data.rateBath.toLocaleString('en-US') }} ບາດ
          </p>
        </template>
      </column>
      <column header="ລາຄາໂດລາ" field="rateDollar" class="white-space-nowrap">
        <template #body="{ data }">
          <p v-if="!state.isLoading" class="text-red-700 font-medium text-base">
            {{ data.rateDollar.toLocaleString('en-US') }} ໂດລາ
          </p>
        </template>
      </column>
      <column header="ຈັດການ" class="white-space-nowrap">
        <template #body="{ data }">
          <div class="flex gap-2">
            <update-quotation-type :old-data="data" />
            <p-button
              icon="pi pi-trash"
              severity="danger"
              rounded
              class="text-white"
              v-tooltip.top="'ລົບ'"
              @click="onConfirmDelete(data.id)"
            />
          </div>
        </template>
      </column>
    </data-table> -->
  </div>
</template>

<style scoped></style>
