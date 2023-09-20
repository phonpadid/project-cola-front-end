<script setup lang="ts">
import type { CompanyEntity } from '@/entities/company.entity'
import MyInputText from '@/framework/UI/components/customComponents/MyInputText.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'
import Message from 'primevue/message'
import { Form as VForm } from 'vee-validate'
import { reactive, ref } from 'vue'

const visible = ref<boolean>(false)
defineExpose({ visible })
const emit = defineEmits<{ (e: 'onSuccess'): void; (e: 'onHide'): void }>()

const image = ref<any>()
const fileUploadRef = ref()

const invalidMessage = reactive<{
  name: string
  email: string
  phone: string
  address: string
  image: string
}>({
  name: '',
  email: '',
  phone: '',
  address: '',
  image: ''
})

const props = defineProps<{
  id: boolean
  customerSchema: any
  form: CompanyEntity
  onSubmit: (item: any, id: string) => Promise<boolean | undefined>
  isLoading: boolean
}>()

function clearErrorMessage() {
  invalidMessage.name = ''
  invalidMessage.email = ''
  invalidMessage.phone = ''
  invalidMessage.address = ''
  invalidMessage.image = ''
  visible.value = false
}

function onSelectLogo(event: FileUploadSelectEvent) {
  fileUploadRef.value.clear()
  const lastIdx = event.files.length - 1
  fileUploadRef.value.files[0] = event.files[lastIdx]
  image.value = event.files[lastIdx]
}

async function onSubmit(event: any) {
  event.image = image.value
  const isSuccess = await props.onSubmit(event, props.form.id as string)
  if (isSuccess) {
    clearErrorMessage()
    onClearLogo()
  }
}

function onClearLogo() {
  image.value = undefined
}
</script>
<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="!props.id ? 'ເພີ່ມບໍລິສັດ' : 'ແກ້ໄຂບໍລິສັດ'"
    @hide="emit('onSuccess'), clearErrorMessage()"
    :breakpoints="{ '960px': '75vw', '640px': '95vw' }"
  >
    <message
      severity="warn"
      v-if="invalidMessage.image"
      @close="
        () => {
          invalidMessage.image = ''
        }
      "
      >{{ invalidMessage.image }}</message
    >
    <v-form
      :validation-schema="props.customerSchema"
      @submit="onSubmit"
      class="flex flex-column gap-3"
    >
      <div>
        <div class="flex flex-column align-items-center justify-content-center">
          <h5 class="flex align-items-center justify-content-center">ໂລໂກບໍລິສັດ</h5>
          <FileUpload
            :show-upload-button="false"
            :show-cancel-button="false"
            chooseLabel="ເລືອກໄຟລ໌"
            name="file"
            accept="image/*"
            custom-upload
            @select="onSelectLogo"
            ref="fileUploadRef"
          >
            <template #content>
              <div class="flex flex-wrap p-0 gap-5" v-if="image || props.form.logo">
                <div
                  class="m-0 p-5 flex flex-column border-1 surface-border align-items-center gap-3 w-full"
                >
                  <div>
                    <img
                      role="presentation"
                      alt="logo image"
                      :src="image ? image.objectURL : props.form.logo"
                      class="shadow-2"
                      style="width: 250px"
                    />
                  </div>
                </div>
              </div>
              <div v-else class="flex align-items-center justify-content-center flex-column">
                <i
                  class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400"
                />
                <p class="mt-4 mb-0">ລາກແລະວາງໄຟລ໌ມາທີ່ນີ້ເພື່ອອັບໂຫລດ.</p>
              </div>
            </template>
          </FileUpload>
        </div>
      </div>
      <div class="grid">
        <div class="col-12 md:col-6">
          <div class="flex flex-column">
            <label for="name" class="font-bold">ຊື່ບໍລິສັດ</label>
            <my-input-text
              placeholder="ປ້ອນຊື່ບໍລິສັດ"
              name="name"
              @on-invalid="(e: string) => (invalidMessage.name = e)"
              :value="(props.form.name as string)"
            />
            <small class="p-error" id="text-error-username">{{ invalidMessage.name }}</small>
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column">
            <label for="email" class="font-bold">ອີເມວ</label>
            <my-input-text
              placeholder="ປ້ອນອີເມວ"
              name="email"
              @on-invalid="(e: string) => (invalidMessage.email = e)"
              :value="(props.form.email as string)"
            />
            <small class="p-error" id="text-error-username">{{ invalidMessage.email }}</small>
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column">
            <label for="phone" class="font-bold">ເບີໂທ</label>
            <my-input-text
              placeholder="ປ້ອນເບີໂທ"
              name="phone"
              @on-invalid="(e: string) => (invalidMessage.phone = e)"
              :value="(props.form.phone as string)"
            />
            <small class="p-error" id="text-error-username">{{ invalidMessage.phone }}</small>
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column">
            <label for="address" class="font-bold">ທີ່ຢູ່</label>
            <my-input-text
              placeholder="ປ້ອນທີ່ຢູ່"
              name="address"
              @on-invalid="(e: string) => (invalidMessage.address = e)"
              :value="(props.form.address as string)"
            />
            <small class="p-error" id="text-error-username">{{ invalidMessage.address }}</small>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        :label="!props.id ? 'ບັນທຶກ' : 'ແກ້ໄຂ'"
        icon="pi pi-save"
        severity="success"
      />
    </v-form>
  </Dialog>
</template>

<style scoped></style>
