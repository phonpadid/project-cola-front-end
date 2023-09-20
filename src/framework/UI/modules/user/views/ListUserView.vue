<script setup lang="ts">
import PButton from 'primevue/button'
import Column from 'primevue/column'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import { useConfirm } from 'primevue/useconfirm'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../auth/stores/auth.store'
import { useUserStore } from '../stores/user.store'

const { require } = useConfirm()

const authStore = useAuthStore()
const { query } = useRoute()
const { push } = useRouter()
let {
  getAll,
  state: { list, isLoading },
  paginate,
  clearFilter,
  remove
} = useUserStore()

const search = ref<string>('')

const first = computed(() => {
  let result: number = 0
  if (paginate.page && paginate.limit) {
    result = (paginate.page - 1) * paginate.limit
  }
  return result
})

clearFilter()
if (Object.keys(query).length !== 0) {
  paginate.page = query.page ? Number(query.page) : 1
  paginate.limit = query.limit ? Number(query.limit) : 10
  paginate.filter.name = query.name ? (query.name as string) : undefined
  search.value = query.name ? (query.name as string) : ''

  if (search.value === '') {
    push({ query: { page: paginate.page, limit: paginate.limit } })
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

if (paginate.filter.company && authStore.state.data && authStore.state.data.company) {
  paginate.filter.company.id = authStore.state.data.company.id
}

await getAll()

async function onPageChange(pageEvent: DataTablePageEvent) {
  paginate.page = pageEvent.page + 1
  paginate.limit = pageEvent.rows

  push({
    name: 'user.list',
    query: {
      page: paginate.page,
      limit: paginate.limit,
      name: paginate.filter.name ? paginate.filter.name : undefined
    }
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

async function onConfirmDelete(id: string) {
  require({
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
    <h2 class="mb-3">ລາຍການຜູ້ໃຊ້</h2>
    <data-table
      :value="list.props"
      :loading="isLoading"
      lazy
      :totalRecords="list.total"
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
          <p-button
            type="button"
            label="ເພີ່ມຜູ້ໃຊ້"
            icon="pi pi-plus"
            severity="success"
            class="w-full sm:w-auto flex-order-0 sm:flex-order-1"
            @click="push({ name: 'user.create', params: { id: undefined } })"
          />
        </div>
      </template>
      <column header="ລະຫັດ" field="id" class="white-space-nowrap">
        <template #body="{ data }">
          <b>{{ data.id }}</b>
        </template>
      </column>
      <column header="ຊື່" class="white-space-nowrap">
        <template #body="{ data }">
          <div class="flex align-items-center">
            <img
              :src="data.profile ? data.profile : '/placeholder-person.png'"
              alt="user profile"
              class="mr-2 w-2rem h-2rem border-circle"
              style="object-fit: cover"
            />
            <p class="mr-3">{{ data.name }}</p>
          </div>
        </template>
      </column>
      <column header="ອີເມວ" field="email" class="white-space-nowrap" />
      <column header="ເບີໂທ" field="tel" class="white-space-nowrap" />
      <column header="ຈັດການ" class="white-space-nowrap">
        <template #body="{ data }">
          <div class="flex gap-2">
            <p-button
              icon="pi pi-eye"
              severity="info"
              rounded
              class="text-white"
              v-tooltip.top="'ເບິ່ງລາຍລະອຽດ'"
              @click="push({ name: 'user.detail', params: { id: data.id } })"
            />
            <p-button
              icon="pi pi-pencil"
              severity="warning"
              rounded
              class="text-white"
              v-tooltip.top="'ແກ້ໄຂ'"
              @click="push({ name: 'user.update', params: { id: data.id } })"
            />
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
      <template #empty>
        <div class="flex justify-content-center">
          <h5 class="mb-0 text-color">ບໍ່ມີຂໍ້ມູນ</h5>
        </div>
      </template>
    </data-table>
  </div>
</template>
