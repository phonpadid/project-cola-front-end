<script setup lang="ts">
import Chip from 'primevue/chip'
import Column from 'primevue/column'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Image from 'primevue/image'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../../user/stores/user.store'
import { companyStore } from '../stores/company.store'

const { params, query } = useRoute()
const { push } = useRouter()

const comStore = companyStore()
const { getOne } = companyStore()
const { state, paginate, getAll, clearFilter } = useUserStore()

const id = params.id as string
const search = ref<string>('')

async function initComponent() {
  clearFilter()
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

  if (paginate.filter.company) {
    paginate.filter.company.id = params.id as string
  }

  await getOne(id)
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

async function onPageChange(pageEvent: DataTablePageEvent) {
  paginate.page = pageEvent.page + 1
  paginate.limit = pageEvent.rows

  const { page, limit, filter } = paginate
  push({
    name: 'company.description',
    query: { page, limit, name: filter.name ? filter.name : undefined }
  })
  await getAll()
}
</script>
<template>
  <div class="card">
    <h2 class="mb-3">ລາຍລະອຽດບໍລິສັດ</h2>
    <div class="flex flex-column md:flex-row md:align-items-center gap-3 md:gap-5">
      <div class="flex justify-content-center">
        <Image
          :src="comStore.state.data.logo ? comStore.state.data.logo : '/No-data.png'"
          alt="Image"
          style="width: 10rem"
          preview
        />
      </div>
      <div class="flex flex-column justify-content-center gap-2 white-space-nowrap">
        <div class="flex align-items-center gap-3">
          <span>ບໍລິສັດ : </span
          ><span class="font-medium text-xl">{{ comStore.state.data.name }}</span>
        </div>
        <div class="flex align-items-center gap-3">
          <span>ທີ່ຢູ່ : </span
          ><span class="font-medium text-xl">{{ comStore.state.data.address }}</span>
        </div>
        <div class="flex align-items-center gap-3">
          <span>ເບີໂທ : </span
          ><span class="font-medium text-xl">{{ comStore.state.data.phone }}</span>
        </div>
        <div class="flex align-items-center gap-3">
          <span>ອີເມວ : </span
          ><span class="font-medium text-xl">{{ comStore.state.data.email }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <h2 class="mb-3">ລາຍການຜູ້ໃຊ້</h2>
    <data-table
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
              style="font-family: NotoSansLao, Montserrat"
              class="w-full"
            />
          </span>
        </div>
      </template>
      <template #empty>
        <div class="flex justify-content-center">
          <h5 class="mb-0 text-color">ບໍ່ມີຂໍ້ມູນ</h5>
        </div>
      </template>
      <column header="ຮູບພາບ" field="profileUrl" class="white-space-nowrap">
        <template #body="{ data }">
          <div class="flex align-items-center justify-content-center">
            <Image
              :src="data.profileUrl ? data.profileUrl : '/placeholder-person.png'"
              preview
              image-class="bg-contain bg-center bg-no-repeat h-2rem w-full"
            />
          </div>
        </template>
      </column>
      <column field="name" header="ບໍລິສັດ" class="white-space-nowrap" />
      <column field="email" header="ອີເມວ" class="white-space-nowrap" />
      <column field="tel" header="ເບີໂທ" class="white-space-nowrap" />
      <column field="roles" header="ບົດບາດ" class="white-space-nowrap">
        <template #body="{ data }">
          <Chip class="bg-green-200 text-green-800 font-bold" :label="data.role.name" />
        </template>
      </column>
    </data-table>
  </div>
</template>

<style scoped></style>
