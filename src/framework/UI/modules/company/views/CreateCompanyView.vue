<script setup lang="ts">
import Password from '@/framework/UI/components/customComponents/FormPassword.vue'
import type { CreateCompanyDTO } from '@/interface-adapter/dto/company.dto'
import type { IFile } from '@/interface-adapter/interfaces/file.interface'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import FileUpload, { type FileUploadRemoveUploadedFile } from 'primevue/fileupload'
import PImage from 'primevue/image'
import Message from 'primevue/message'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from '../../../components/customComponents/FormInputText.vue'
import { createCompanySchema } from '../schema/company.schema'
import { companyStore } from '../stores/company.store'

const { create } = companyStore()
const { push } = useRouter()

const imageCompany = ref<IFile>()
const imageUser = ref<IFile>()
const imageCompanyErrorMessage = ref<string>('')
const imageUserErrorMessage = ref<string>('')
function onChooseImageCompany(e: FileUploadRemoveUploadedFile) {
  if (e.files[0].size >= 1024 * 1024) {
    imageCompanyErrorMessage.value = 'ຂະໜາດຮູບຕ້ອງບໍ່ເກີນ 1MB'
    return
  }

  if (!e.files[0].type.startsWith('image/')) {
    imageCompanyErrorMessage.value = 'ໄຟລ໌ຕ້ອງເປັນໄຟລ໌ຮູບ'
    return
  }

  imageCompanyErrorMessage.value = ''
  imageCompany.value = e.files[0]
}
function onChooseImageUser(e: FileUploadRemoveUploadedFile) {
  if (e.files[0].size >= 1024 * 1024) {
    imageUserErrorMessage.value = 'ຂະໜາດຮູບຕ້ອງບໍ່ເກີນ 1MB'
    return
  }

  if (!e.files[0].type.startsWith('image/')) {
    imageUserErrorMessage.value = 'ໄຟລ໌ຕ້ອງເປັນໄຟລ໌ຮູບ'
    return
  }

  imageUserErrorMessage.value = ''
  imageUser.value = e.files[0]
}

const { handleSubmit } = useForm<Omit<CreateCompanyDTO, 'logo'>>({
  validationSchema: createCompanySchema
})

const onSubmit = handleSubmit(async (values) => {
  await create({
    logo: imageCompany.value,
    name: values.name,
    email: values.email,
    phone: values.phone,
    address: values.address,
    user: {
      profile: imageUser.value,
      username: values.user ? values.user.username : '',
      password: values.user ? values.user.password : ''
    }
  })
  push({ name: 'company.list' })
})
</script>
<template>
  <div class="card">
    <h2 class="mb-3">ເພີ່ມບໍລິສັດ</h2>
    <form @submit="onSubmit" class="flex flex-column gap-3">
      <div class="grid">
        <div class="col-12">
          <div class="flex flex-column align-items-center">
            <p-image
              :src="imageCompany ? imageCompany.objectURL : '/No-data.png'"
              alt="profile image"
              image-class="bg-cover
          bg-center bg-no-repeat w-9rem h-9rem border-50 border-2 mb-3"
              image-style="object-fit: contain;"
            />
            <message
              severity="error"
              @close="imageCompanyErrorMessage = ''"
              v-if="imageCompanyErrorMessage"
            >
              {{ imageCompanyErrorMessage }}
            </message>
            <file-upload
              class="flex justify-content-center w-10rem"
              custom-upload
              auto
              mode="basic"
              @uploader="onChooseImageCompany"
            />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <input-text name="name" label="ຊື່ບໍລິສັດ" required placeholder="ປ້ອນຊື່ບໍລິສັດ" />
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
        <divider />
        <div class="col-12">
          <div class="flex flex-column align-items-center">
            <p-image
              :src="imageUser ? imageUser.objectURL : '/placeholder-person.png'"
              alt="profile image"
              image-class="bg-cover
            bg-center bg-no-repeat w-9rem h-9rem border-50 border-2 mb-3"
              image-style="object-fit: contain;"
            />
            <message
              severity="error"
              @close="imageUserErrorMessage = ''"
              v-if="imageUserErrorMessage"
            >
              {{ imageUserErrorMessage }}
            </message>
            <file-upload
              class="flex justify-content-center w-10rem"
              custom-upload
              auto
              mode="basic"
              @uploader="onChooseImageUser"
            />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <input-text name="user.username" label="ຊື່ຜູ້ໃຊ້" required placeholder="ປ້ອນຊື່ຜູ້ໃຊ້" />
        </div>
        <div class="col-12 md:col-6">
          <password
            label="ລະຫັດໃໝ່"
            required
            name="user.password"
            placeholder="ປ້ອນລະຫັດໃໝ່"
            feed-back
          />
        </div>
      </div>
      <div class="flex justify-content-center">
        <Button class="w-16rem" type="submit" label="ບັນທຶກ" icon="pi pi-save" severity="info" />
      </div>
    </form>
  </div>
</template>

<style scoped></style>
