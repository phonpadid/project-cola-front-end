<script setup lang="ts">
import type { UpdateCompanyDTO } from '@/interface-adapter/dto/company.dto'
import type { IFile } from '@/interface-adapter/interfaces/file.interface'
import Button from 'primevue/button'
import FileUpload, { type FileUploadRemoveUploadedFile } from 'primevue/fileupload'
import PImage from 'primevue/image'
import Message from 'primevue/message'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InputText from '../../../components/customComponents/FormInputText.vue'
import { editCompanySchema } from '../schema/company.schema'
import { companyStore } from '../stores/company.store'

const { params } = useRoute()
const { push } = useRouter()

const { state, getOne, update } = companyStore()

const id = params.id as string
await getOne(id)

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

const { handleSubmit } = useForm<Omit<UpdateCompanyDTO, 'logo'>>({
  validationSchema: editCompanySchema
})

const onSubmit = handleSubmit(async (values) => {
  await update(
    {
      logo: image.value,
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address
    },
    id
  )
  push({ name: 'company.list' })
})
</script>
<template>
  <div class="card">
    <h2 class="mb-3">ແກ້ໄຂບໍລິສັດ</h2>
    <form @submit="onSubmit" class="flex flex-column gap-3">
      <div class="flex flex-column align-items-center">
        <p-image
          :src="
            image ? image.objectURL : state.data.logo ? state.data.logo : '/No-data.png'
          "
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
          <input-text
            name="name"
            label="ຊື່ບໍລິສັດ"
            required
            placeholder="ປ້ອນຊື່ບໍລິສັດ"
            :value="state.data.name"
          />
        </div>
        <div class="col-12 md:col-6">
          <input-text
            name="email"
            label="ອີເມວ"
            required
            placeholder="ປ້ອນອີເມວ"
            :value="state.data.email"
          />
        </div>
        <div class="col-12 md:col-6">
          <input-text
            name="phone"
            label="ເບີໂທ"
            required
            placeholder="ປ້ອນເບີໂທ"
            :value="state.data.phone"
          />
        </div>
        <div class="col-12 md:col-6">
          <input-text
            name="address"
            label="ທີ່ຢູ່"
            required
            placeholder="ປ້ອນທີ່ຢູ່"
            :value="state.data.address"
          />
        </div>
      </div>
      <div class="flex justify-content-center">
        <Button class="w-16rem" type="submit" label="ແກ້ໄຂ" icon="pi pi-save" severity="info" />
      </div>
    </form>
  </div>
</template>

<style scoped></style>
