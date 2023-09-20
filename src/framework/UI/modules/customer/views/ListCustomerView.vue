<script setup lang="ts">
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Image from 'primevue/image'
import InputText from 'primevue/inputtext'
import { useConfirm } from 'primevue/useconfirm'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { customerStore } from '../stores/customer.store'

const { push } = useRouter()
const { query } = useRoute()

const { state, stateCustomer, getAll, remove, clearFilterState } = customerStore()

const search = ref<string>('')

async function initComponent() {
  clearFilterState()
  if (Object.keys(query).length !== 0) {
    stateCustomer.page = query.page ? Number(query.page) : 1
    stateCustomer.limit = query.limit ? Number(query.limit) : 10
    stateCustomer.filter.name = query.name ? (query.name as string) : undefined
    search.value = query.name ? (query.name as string) : ''
    if (search.value === '') {
      push({ query: { page: stateCustomer.page, limit: stateCustomer.limit, name: undefined } })
    } else {
      push({
        query: {
          page: stateCustomer.page,
          limit: stateCustomer.limit,
          name: stateCustomer.filter.name
        }
      })
    }
  }

  await getAll()
}

await initComponent()

const first = computed(() => {
  let result: number = 0
  if (stateCustomer.page && stateCustomer.limit) {
    result = (stateCustomer.page - 1) * stateCustomer.limit
  }
  return result
})

async function onSearch() {
  const { filter } = stateCustomer
  filter.name = ''
  if (filter?.name !== undefined) {
    filter.name = search.value

    push({
      query: {
        page: stateCustomer.page,
        limit: stateCustomer.limit,
        name: filter.name
      }
    })
  }
  await getAll()
}

async function onClearSearch(e: any) {
  if (e.target.value === '') {
    if (stateCustomer.filter?.name !== undefined) {
      stateCustomer.filter.name = ''
    }
    push({ query: { name: undefined } })
    await getAll()
  }
}

async function onPageChange(pageEvent: DataTablePageEvent) {
  stateCustomer.page = pageEvent.page + 1
  stateCustomer.limit = pageEvent.rows

  const { page, limit, filter } = stateCustomer
  push({ name: 'customer', query: { page, limit, name: filter.name ? filter.name : undefined } })
  await getAll()
}

const confirmDelete = useConfirm()
async function onConfirmDelete(id: string) {
  confirmDelete.require({
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
  <div class="card">
    <h2 class="mb-3">ລາຍການລູກຄ້າ</h2>
    <data-table
      :value="state.list.props"
      :loading="state.isLoading"
      lazy
      :totalRecords="state.list.total"
      @page="onPageChange"
      paginator
      :rows="stateCustomer.limit"
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
              style="font-family: NotoSansLao, Montserrat"
              class="w-full"
            />
          </span>
          <Button
            type="button"
            label="ເພີ່ມລູກຄ້າ"
            icon="pi pi-plus"
            severity="success"
            class="w-full sm:w-auto flex-order-0 sm:flex-order-1"
            @click="push({ name: 'customer.create' })"
          ></Button>
        </div>
      </template>
      <template #empty>
        <div class="flex justify-content-center">
          <h5 class="mb-0 text-color">ບໍ່ມີຂໍ້ມູນ</h5>
        </div>
      </template>
      <column header="ຮູບພາບ" field="logo" class="white-space-nowrap">
        <template #body="{ data }">
          <div class="flex align-items-center justify-content-center">
            <Image
              :src="data.logo ? data.logo : './placeholder-person.png'"
              preview
              image-class="bg-contain bg-center bg-no-repeat h-2rem w-full"
            />
          </div>
        </template>
      </column>
      <column field="name" header="ຊື່" class="white-space-nowrap" />
      <column field="email" header="ອີເມວ" class="white-space-nowrap" />
      <column field="phone" header="ເບີໂທ" class="white-space-nowrap" />
      <column field="address" header="ທີ່ຢູ່" class="white-space-nowrap" />
      <column field="action" header="ຈັດການ" class="white-space-nowrap">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              severity="warning"
              rounded
              class="text-white"
              v-tooltip.top="'ແກ້ໄຂ'"
              @click="push({ name: 'customer.edit', params: { id: data.id } })"
            />
            <Button
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
    </data-table>
  </div>
</template>

<style scoped></style>
