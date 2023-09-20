<script setup lang="ts">
import PButton from 'primevue/button'
import Column from 'primevue/column'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'
import { useConfirm } from 'primevue/useconfirm'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../auth/stores/auth.store'
import CreateRole from '../components/CreateRole.vue'
import UpdateRole from '../components/UpdateRole.vue'
import { useRoleStore } from '../stores/role.store'

const authStore = useAuthStore()
const { state, paginate, getAll, clearFilterState, remove } = useRoleStore()
const { push } = useRouter()
const { query } = useRoute()

const search = ref<string>('')

if (paginate.filter.company && authStore.state.data && authStore.state.data.company) {
  paginate.filter.company.id = authStore.state.data.company.id
}

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
  push({ name: 'role.list', query: { page, limit, name: filter.name ? filter.name : undefined } })
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
    <h2 class="mb-3">ລາຍການບົດບາດ</h2>
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
              class="w-full"
            />
          </span>
          <create-role />
        </div>
      </template>
      <template #empty>
        <div class="flex justify-content-center">
          <h5 class="mb-0 text-color">ບໍ່ມີຂໍ້ມູນ</h5>
        </div>
      </template>

      <column field="id" header="ລະຫັດ" class="white-space-nowrap">
        <template #body="{ data }">
          <b>{{ data.id }}</b>
        </template>
      </column>
      <column field="name" header="ຊື່" class="white-space-nowrap" />
      <column header="ສິດ" class="white-space-nowrap">
        <template #body="{ data }">
          <tag
            v-for="(permission, idx) of data.permissions"
            :key="idx"
            :value="permission.name"
            class="mr-2"
          />
        </template>
      </column>
      <column field="action" header="ຈັດການ" class="white-space-nowrap">
        <template #body="{ data }">
          <div class="flex gap-2">
            <update-role :old-data="data" />
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
    </data-table>
  </div>
</template>
