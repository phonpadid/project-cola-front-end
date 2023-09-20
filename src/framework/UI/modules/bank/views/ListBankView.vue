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
import CreateBank from '../components/CreateBank.vue'
import UpdateBank from '../components/UpdateBank.vue'
import { useBankStore } from '../stores/bank.store'

const authStore = useAuthStore()
const { state, paginate, clearFilterState, getAll, remove, changeStatus } = useBankStore()
const { push } = useRouter()
const { query } = useRoute()

const search = ref<string>('')
const expandedRows = ref([])

if (paginate.filter.company && authStore.state.data && authStore.state.data.company) {
  paginate.filter.company.id = authStore.state.data.company.id
}

async function initComponent() {
  clearFilterState()
  if (Object.keys(query).length !== 0) {
    paginate.page = query.page ? Number(query.page) : 1
    paginate.limit = query.limit ? Number(query.limit) : 10
    paginate.filter.accountName = query.name ? (query.name as string) : undefined
    search.value = query.name ? (query.name as string) : ''
    if (search.value === '') {
      push({ query: { page: paginate.page, limit: paginate.limit, name: undefined } })
    } else {
      push({
        query: {
          page: paginate.page,
          limit: paginate.limit,
          name: paginate.filter.accountName
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
    name: 'bank.list',
    query: { page, limit, name: filter.accountName ? filter.accountName : undefined }
  })
  await getAll()
}

async function onSearch() {
  const { filter } = paginate
  filter.accountName = ''
  if (filter?.accountName !== undefined) {
    filter.accountName = search.value

    push({ query: { page: paginate.page, limit: paginate.limit, name: filter.accountName } })
  }
  await getAll()
}

async function onClearSearch(e: any) {
  if (e.target.value === '') {
    if (paginate.filter?.accountName !== undefined) {
      paginate.filter.accountName = ''
    }
    push({ query: { name: undefined } })
    await getAll()
  }
}

const confirm = useConfirm()
async function onConfirmChangStatus(status: string, id: string) {
  confirm.require({
    message: 'ທ່ານຕ້ອງການປ່ຽນສະຖານະລາຍການນີ້ບໍ?',
    header: 'ການຢືນຢັນ',
    icon: 'pi pi-question-circle text-cyan-500',
    acceptClass: 'p-button-info',
    rejectClass: 'text-cyan-800 bg-cyan-50 border-none',
    accept: async () => {
      if (status === 'active') {
        await changeStatus({ status: 'inactive' }, id)
      } else {
        await changeStatus({ status: 'active' }, id)
      }
    }
  })
}

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
  <div class="card">
    <h2 class="mb-3">ລາຍການບັນຊີທະນາຄານ</h2>
    <data-table
      v-model:expandedRows="expandedRows"
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
          <create-bank />
        </div>
      </template>
      <template #empty>
        <div class="flex justify-content-center">
          <h5 class="mb-0 text-color">ບໍ່ມີຂໍ້ມູນ</h5>
        </div>
      </template>
      <Column expander style="width: 5rem" />
      <column header="ຊື່" field="accountName" class="white-space-nowrap" />
      <column header="ທະນາຄານ" field="bankName" class="white-space-nowrap" />
      <column header="ເລກບັນຊີ" field="accountNumber" class="white-space-nowrap">
        <template #body="{ data }">
          <div v-if="!state.isLoading">
            {{ data.accountNumber.replace(/(\d{4})(?=\d)/g, '$1 - ') }}
          </div>
        </template>
      </column>
      <column header="ສະຖານະ" field="status" class="white-space-nowrap">
        <template #body="{ data }">
          <tag
            v-if="!state.isLoading"
            :value="data.status"
            :class="
              data.status === 'active'
                ? 'text-green-800 bg-green-200 text-sm'
                : 'text-red-800 bg-red-200 text-sm'
            "
          />
        </template>
      </column>
      <template #expansion="{ data }">
        <div class="p-3" v-if="!state.isLoading">
          <p class="font-semibold">ລາຍລະອຽດ</p>
          <p class="p-3">
            {{ data.description }}
          </p>
        </div>
      </template>
      <column header="ຈັດການ" class="white-space-nowrap">
        <template #body="{ data }">
          <div class="flex gap-2">
            <p-button
              icon="pi pi-sync"
              severity="help"
              rounded
              class="text-white"
              v-tooltip.top="'ປ່ຽນສະຖານະ'"
              @click="onConfirmChangStatus(data.status, data.id)"
            />
            <update-bank :old-data="data" />
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

<style scoped></style>
