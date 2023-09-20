<script setup lang="ts">
import type { CustomerDTO } from '@/interface-adapter/dto/customer.dto'
import type { IFile } from '@/interface-adapter/interfaces/file.interface'
import Button from 'primevue/button'
import FileUpload, { type FileUploadRemoveUploadedFile } from 'primevue/fileupload'
import PImage from 'primevue/image'
import Message from 'primevue/message'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from '../../../components/customComponents/FormInputText.vue'
import { customerSchema } from '../schema/customer.schema'
import { customerStore } from '../stores/customer.store'

const { create } = customerStore()
const { push } = useRouter()

const image = ref<IFile>()
const imageErrorMessage = ref<string>('')
function onChooseImage(e: FileUploadRemoveUploadedFile) {
  if (e.files[0].size >= 1024 * 1024) {
    imageErrorMessage.value = 'ຂະໜາດຮູບຕ້ອງບໍ່ເກີນ 1MB'
    return
  }

  if (!e.files[0].type.startsWith('image/')) {
    imageErrorMessage.value = 'ໄຟລ໌ຕ້ອງເປັນໄຟລ໌ຮູບ'
    return
  }

  imageErrorMessage.value = ''
  image.value = e.files[0]
}

const { handleSubmit } = useForm<Omit<CustomerDTO, 'logo'>>({
  validationSchema: customerSchema
})

const onSubmit = handleSubmit(async (values) => {
  await create({
    logo: image.value,
    name: values.name,
    email: values.email,
    phone: values.phone,
    address: values.address
  })
  push({ name: 'customer.list' })
})
</script>
<template>
  <div class="card">
    <h2 class="mb-3">ເພີ່ມລູກຄ້າ</h2>
    <form @submit="onSubmit" class="flex flex-column gap-3">
      <div class="flex flex-column align-items-center">
        <p-image
          :src="image ? image.objectURL : '/placeholder-person.png'"
          alt="profile image"
          image-class="bg-cover
          bg-center bg-no-repeat w-9rem h-9rem border-50 border-2 mb-3"
          image-style="object-fit: contain;"
        />
        <message severity="error" @close="imageErrorMessage = ''" v-if="imageErrorMessage">
          {{ imageErrorMessage }}
        </message>
        <file-upload
          class="flex justify-content-center w-10rem"
          custom-upload
          auto
          mode="basic"
          @uploader="onChooseImage"
        />
      </div>
      <div class="grid">
        <div class="col-12 md:col-6">
          <input-text name="name" label="ຊື່ລູກຄ້າ" required placeholder="ປ້ອນຊື່ລູກຄ້າ" />
        </div>
        <div class="col-12 md:col-6">
          <input-text name="email" label="ອີເມວ" required placeholder="ປ້ອນອີເມວ" />
        </div>
        <div class="col-12 md:col-6">
          <input-text name="phone" label="ເບີໂທ" required placeholder="ປ້ອນເບີໂທ" />
        </div>
        <div class="col-12 md:col-6">
          <input-text name="address" label="ທີ່ຢູ່" required placeholder="ປ້ອນທີ່ຢູ່" />
        </div>
      </div>
      <div class="flex justify-content-center">
        <Button class="w-16rem" type="submit" label="ບັນທຶກ" icon="pi pi-save" severity="info" />
      </div>
    </form>
  </div>
</template>

<style scoped></style>
