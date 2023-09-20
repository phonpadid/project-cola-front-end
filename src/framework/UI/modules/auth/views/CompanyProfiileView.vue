<script setup lang="ts">
import type { UpdateCompanyDTO } from '@/interface-adapter/dto/company.dto'
import type { IFile } from '@/interface-adapter/interfaces/file.interface'
import Divider from 'primevue/divider'
import FileUpload, { type FileUploadRemoveUploadedFile } from 'primevue/fileupload'
import Message from 'primevue/message'
import { ref } from 'vue'
import { companyStore } from '../../company/stores/company.store'
import CompanyForm from '../components/CompanyForm.vue'
import { useAuthStore } from '../stores/auth.store'

const {
  state: { data }
} = useAuthStore()

const { getOne, state, updateImage, update } = companyStore()

if (data && data.company && data.company.id) {
  await getOne(data.company.id)
}

const image = ref<IFile>()
const imageErrorMessage = ref<string>('')

async function onChangeProfile(e: FileUploadRemoveUploadedFile) {
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

  const {
    data: { id, name, email, phone, address }
  } = state

  if (state.data && id) {
    await updateImage(
      {
        name: name ? name : '',
        email: email ? email : '',
        phone: phone ? phone : '',
        address: address ? address : '',
        logo: image.value
      },
      id
    )
  }
}

async function updateCompanyProfile(values: Omit<UpdateCompanyDTO, 'logo'>) {
  if (state.data.id) {
    await update(values, state.data.id)
  }
}
</script>

<template>
  <div class="card" v-if="state.data && !state.isLoading">
    <h2>ຂໍ້ມູນບໍລິສັດ</h2>
    <div class="flex flex-column p-3 mt-3">
      <div class="flex flex-column align-items-center mb-5">
        <img
          :src="state.data.logo ? state.data.logo : '/placeholder-person.png'"
          class="bg-cover bg-center bg-no-repeat w-9rem h-9rem border-50 border-2 mb-3"
        />
        <message severity="error" @close="imageErrorMessage = ''" v-if="imageErrorMessage">
          {{ imageErrorMessage }}
        </message>
        <file-upload mode="basic" custom-upload @uploader="onChangeProfile" auto />
      </div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-6">
        <div class="flex flex-column mb-3">
          <p class="text-300">ຊື່</p>
          <p class="text-gray-500 font-medium text-xl">{{ state.data.name }}</p>
        </div>
        <div class="flex flex-column">
          <p class="text-300">ອີເມວ</p>
          <p class="text-gray-500 font-medium text-xl">{{ state.data.email }}</p>
        </div>
      </div>
      <div class="col-12 md:col-6">
        <div class="flex flex-column mb-3">
          <p class="text-300">ເບີໂທ</p>
          <p class="text-gray-500 font-medium text-xl">{{ state.data.phone }}</p>
        </div>
        <div class="flex flex-column">
          <p class="text-300">ທີ່ຢູ່</p>
          <p class="text-gray-500 font-medium text-xl">{{ state.data.address }}</p>
        </div>
      </div>
    </div>
    <divider />
    <h2>ແກ້ໄຂຂໍ້ມູນ</h2>
    <company-form
      :form="{
        name: state.data.name ? state.data.name : '',
        email: state.data.email ? state.data.email : '',
        phone: state.data.phone ? state.data.phone : '',
        address: state.data.address ? state.data.address : ''
      }"
      @submit="updateCompanyProfile"
    />
  </div>
</template>
