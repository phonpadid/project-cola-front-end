<script setup lang="ts">
import type { Currency, QuotationEntity } from '@/entities/quotation.entity'
import { type ItemDTO } from '@/interface-adapter/dto/item.dto'
import PButton from 'primevue/button'
import Column from 'primevue/column'
import DataTable, { type DataTableRowReorderEvent } from 'primevue/datatable'
import { useConfirm } from 'primevue/useconfirm'
import { computed, ref } from 'vue'
import { useItemStore } from '../../item/stores/item.store'
import { type IItemSchema } from '../schema/quotation.schema'
import AddItem from './AddItem.vue'
import EditItem from './EditItem.vue'

const { require } = useConfirm()
const { create, update, remove, reorderRow } = useItemStore()
const addItemRef = ref<InstanceType<typeof AddItem> | null>(null)
const editItemRef = ref<InstanceType<typeof EditItem> | null>(null)

const props = defineProps<{ currency?: Currency; oldData?: Partial<QuotationEntity> }>()

const expandedRows = ref<ItemDTO[]>([])
const items = ref<ItemDTO[]>([])

defineExpose({
  items
})

async function initComponent() {
  if (props.oldData && props.oldData.items) {
    props.oldData.items.forEach(({ id, name, orderNumber, description, price, qty }) => {
      items.value.push({
        id,
        name: name ? name : '',
        orderNumber: orderNumber ? orderNumber : 0,
        description,
        price,
        qty
      })
    })
  }
}

await initComponent()

const total = computed(() => {
  let _amount = 0
  let _count = 0

  for (const item of items.value) {
    if (item.price && item.qty) {
      _amount += item.price * item.qty
      _count += item.qty
    }
  }

  return {
    amount: _amount,
    count: _count
  }
})

function formatPrice(price: number, qty: number): string {
  return `${(price * qty).toLocaleString()}`
}

async function onRowReorder({ dragIndex, dropIndex, value }: DataTableRowReorderEvent) {
  const _numberOfDragItem = items.value[dragIndex].orderNumber
  const _numberOfDropItem = items.value[dropIndex].orderNumber

  items.value[dragIndex].orderNumber = _numberOfDropItem
  items.value[dropIndex].orderNumber = _numberOfDragItem

  items.value = value

  if (props.oldData) {
    await reorderRow([
      {
        id: items.value[dragIndex].id as string,
        orderNumber: items.value[dragIndex].orderNumber as number
      },
      {
        id: items.value[dropIndex].id as string,
        orderNumber: items.value[dropIndex].orderNumber as number
      }
    ])
  }
}

async function onAddItem(data: IItemSchema) {
  if (props.oldData) {
    const lengthNumber = items.value.push(data)

    const result = await create({
      ...data,
      orderNumber: lengthNumber,
      quoId: props.oldData.id
    })

    if (result) {
      items.value[lengthNumber - 1] = result
    }
  } else {
    const lengthNumber = items.value.push(data)

    items.value[lengthNumber - 1] = {
      ...items.value[lengthNumber - 1]
    }
  }

  if (addItemRef.value && addItemRef.value.formItemRef) addItemRef.value.formItemRef.visible = false
}

async function onEditItem(idx: number, data: IItemSchema) {
  items.value[idx] = {
    ...items.value[idx],
    ...data
  }

  if (props.oldData) {
    await update(items.value[idx].id as string, items.value[idx])
  }

  if (editItemRef.value && editItemRef.value.formItemRef)
    editItemRef.value.formItemRef.visible = false
}

async function onRemoveItem(idx: number) {
  require({
    message: 'ທ່ານຕ້ອງການລຶບລາຍການນີ້ບໍ?',
    header: 'ຢືນຢັນການລຶບ',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    async accept() {
      if (props.oldData) {
        await remove(items.value[idx].id as string)
      }

      items.value.splice(idx, 1)
    }
  })
}
</script>

<template>
  <div class="mb-3 w-full">
    <data-table v-model:expanded-rows="expandedRows" :value="items" @row-reorder="onRowReorder">
      <template #header>
        <add-item :currency="currency" @on-submit="onAddItem" ref="addItemRef" />
      </template>
      <template #empty>
        <div class="text-center">ບໍ່ມີຂໍ້ມູນ</div>
      </template>
      <column row-reorder style="width: 3rem" :reorderable-column="false" />
      <column expander style="width: 5rem" />
      <column field="name" header="ຫົວຂໍ້" />
      <column field="price" header="ລາຄາ">
        <template #body="{ data }">
          {{ data.price ? data.price.toLocaleString() : 0 }} {{ currency }}
        </template>
      </column>
      <column field="qty" header="ຈຳນວນ">
        <template #body="{ data }"> {{ data.qty ? data.qty : 0 }}</template>
      </column>
      <column header="ຍອດລວມ">
        <template #body="{ data }">
          {{ data.price && data.qty ? formatPrice(data.price, data.qty) : 0 }} {{ currency }}
        </template>
      </column>
      <column header="ຈັດການ">
        <template #body="{ data, index }">
          <div class="flex gap-2">
            <edit-item
              :idx="index"
              :data="data"
              :currency="currency"
              @on-submit="onEditItem"
              ref="editItemRef"
            />
            <p-button
              icon="pi pi-trash"
              severity="danger"
              class="text-white"
              size="small"
              rounded
              v-tooltip.top="'ລົບ'"
              @click="onRemoveItem(index)"
            />
          </div>
        </template>
      </column>
      <template #expansion="{ data }">
        <div class="p-3">
          <h5>ລາຍລະອຽດ</h5>
          <div v-html="data.description"></div>
        </div>
      </template>
    </data-table>
    <div class="flex flex-column gap-2 align-items-end mt-3">
      <div class="text-left text-lg">
        <div>
          <b>ຈຳນວນລາຍການ: {{ total.count ? total.count : 0 }}</b>
        </div>
        <div>
          <b>ຍອດລວມ: {{ total.amount ? total.amount.toLocaleString() : 0 }} {{ currency }}</b>
        </div>
      </div>
    </div>
  </div>
</template>
