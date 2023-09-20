<script setup lang="ts">
import { type QuotationStatus } from '@/entities/quotation.entity'
import { FilterMatchMode } from 'primevue/api'
import PButton from 'primevue/button'
import Calendar from 'primevue/calendar'
import Column from 'primevue/column'
import DataTable, {
  type DataTableFilterEvent,
  type DataTableFilterMeta,
  type DataTablePageEvent
} from 'primevue/datatable'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ChangeStatusQuotation from '../components/ChangeStatusQuotation.vue'
import { useQuotationStore } from '../stores/quotation.store'
import { setColorOfTagStatus, stautsOptions } from '../utils'

const { push } = useRouter()
const { query } = useRoute()
const { getAll, state, queryArgs, clearFilterState } = useQuotationStore()

const first = computed(() => {
  let result: number = 0
  if (queryArgs.page && queryArgs.limit) {
    result = (queryArgs.page - 1) * queryArgs.limit
  }
  return result
})

const filters = ref<DataTableFilterMeta | any>()

function initFilter() {
  filters.value = {
    id: { value: '', matchMode: FilterMatchMode.CONTAINS },
    name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    endDate: { value: '', matchMode: FilterMatchMode.CONTAINS },
    billTo: { value: '', matchMode: FilterMatchMode.CONTAINS },
    status: { value: '', matchMode: FilterMatchMode.CONTAINS }
  }
}

function initQueryParam() {
  clearFilterState()
  if (Object.keys(query).length !== 0) {
    queryArgs.page = query.page ? Number(query.page) : 1
    queryArgs.limit = query.limit ? Number(query.limit) : 10
    queryArgs.filter.id = query.id ? (query.id as string) : undefined
    queryArgs.filter.name = query.name ? (query.name as string) : undefined
    queryArgs.filter.billTo = query.billTo ? (query.billTo as string) : undefined
    queryArgs.filter.endDate = query.endDate ? new Date(query.endDate as string) : undefined
    queryArgs.filter.status = query.status ? (query.status as QuotationStatus) : undefined
  }
  filters.value.id.value = queryArgs.filter.id
  filters.value.name.value = queryArgs.filter.name
  filters.value.endDate.value = queryArgs.filter.endDate
  filters.value.billTo.value = queryArgs.filter.billTo
  filters.value.status.value = queryArgs.filter.status
}

function setQueryParam() {
  const {
    page,
    limit,
    filter: { id, name, billTo, endDate, status }
  } = queryArgs

  push({
    name: 'quotation',
    query: {
      page,
      limit,
      id: id ? id : undefined,
      name: name ? name : undefined,
      billTo: billTo ? billTo : undefined,
      endDate: endDate ? String(endDate) : undefined,
      status: status ? status : undefined
    }
  })
}

initFilter()
initQueryParam()
await getAll()

async function onPageChange(pageEvent: DataTablePageEvent) {
  queryArgs.page = pageEvent.page + 1
  queryArgs.limit = pageEvent.rows
  setQueryParam()
  await getAll()
}

async function onFillter(filterEvent: DataTableFilterEvent | any) {
  queryArgs.filter.id = filterEvent.filters.id.value
  queryArgs.filter.name = filterEvent.filters.name.value
  queryArgs.filter.billTo = filterEvent.filters.billTo.value
  queryArgs.filter.endDate = filterEvent.filters.endDate.value
  queryArgs.filter.status = filterEvent.filters.status.value
  queryArgs.page = 1
  queryArgs.limit = 10
  setQueryParam()
  await getAll()
}

async function onClearFilter() {
  initFilter()
  clearFilterState()
  setQueryParam()
  await getAll()
}
</script>

<template>
  <div class="card">
    <h2 class="mb-3">ລາຍການໃບສະເໜີລາຄາ</h2>
    <data-table
      :value="state.list.props"
      :loading="state.isLoading"
      lazy
      paginator
      :first="first"
      @page="onPageChange"
      :total-records="state.list?.total"
      :rows="queryArgs.limit"
      :rows-per-page-options="[5, 10, 20, 50]"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      current-page-report-template="ສະແດງ {first} ຫາ {last} ຈາກ {totalRecords} ແຖວ"
      filter-display="menu"
      v-model:filters="filters"
      @filter="onFillter"
    >
      <template #header>
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
          <p-button
            icon="pi pi-filter-slash"
            plain
            rounded
            outlined
            @click="onClearFilter()"
            v-tooltip.top="'ລ້າງກັ່ນຕອງ'"
          />
          <p-button
            type="button"
            label="ເພີ່ມໃບສະເໜີລາຄາ"
            icon="pi pi-plus"
            severity="success"
            class="w-full sm:w-auto"
            @click="push({ name: 'quotation.create' })"
          />
        </div>
      </template>
      <column field="id" header="ID" class="white-space-nowrap" :show-filter-match-modes="false">
        <template #filter="{ filterModel }">
          <input-text placeholder="ຄົ້ນຫາ..." v-model="filterModel.value" />
        </template>
        <template #body="{ data }">
          <b>{{ data.id }}</b>
        </template>
      </column>
      <column field="name" header="ຊື່" class="white-space-nowrap" :show-filter-match-modes="false">
        <template #filter="{ filterModel }">
          <input-text placeholder="ຄົ້ນຫາ..." v-model="filterModel.value" />
        </template>
      </column>
      <column field="endDate" header="ວັນທີ່ກຳນົດ" class="white-space-nowrap">
        <template #filter="{ filterModel }">
          <calendar v-model="filterModel.value" placeholder="ເລືອກວັນທີ່" />
        </template>
      </column>
      <column
        field="billTo"
        header="ລູກຄ້າ"
        class="white-space-nowrap"
        :show-filter-match-modes="false"
      >
        <template #filter="{ filterModel }">
          <input-text placeholder="ຄົ້ນຫາ..." v-model="filterModel.value" />
        </template>
      </column>
      <column field="total" header="ຍອດລວມ" class="white-space-nowrap">
        <template #body="{ data }">{{ data.total.toLocaleString() }} {{ data.currency }}</template>
      </column>
      <column
        field="status"
        header="ສະຖານະ"
        class="white-space-nowrap"
        :show-filter-match-modes="false"
      >
        <template #body="{ data }">
          <tag :severity="setColorOfTagStatus(data.status)" :value="data.status" />
        </template>
        <template #filter="{ filterModel }">
          <dropdown placeholder="ເລືອກສະຖານະ" v-model="filterModel.value" :options="stautsOptions">
            <template #option="{ option }">
              <tag :severity="setColorOfTagStatus(option)" :value="option" />
            </template>
          </dropdown>
        </template>
      </column>
      <column field="action" header="ຈັດການ" class="white-space-nowrap">
        <template #body="{ data }">
          <div class="flex gap-2">
            <p-button icon="pi pi-eye" severity="info" rounded v-tooltip.top="'ເບິ່ງລາຍລະອຽດ'" />
            <change-status-quotation :id="data.id" :status="data.status" />
            <p-button
              icon="pi pi-pencil"
              severity="warning"
              rounded
              class="text-white"
              v-tooltip.top="'ແກ້ໄຂ'"
              @click="push({ name: 'quotation.edit', params: { id: data.id } })"
            />
            <p-button icon="pi pi-trash" severity="danger" rounded v-tooltip.top="'ລົບ'" />
          </div>
        </template>
      </column>
    </data-table>
  </div>
</template>
