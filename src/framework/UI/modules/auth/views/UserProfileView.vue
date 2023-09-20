<script setup lang="ts">
import Loading from '@/framework/UI/components/states/LoadingComponent.vue'
import type { IFile } from '@/interface-adapter/interfaces/file.interface'
import Chip from 'primevue/chip'
import Divider from 'primevue/divider'
import FileUpload, { type FileUploadRemoveUploadedFile } from 'primevue/fileupload'
import Message from 'primevue/message'
import { ref } from 'vue'
import { useAuthStore } from '../../auth/stores/auth.store'
import InfomationForm from '../components/InfomationForm.vue'
import PasswordForm from '../components/PasswordForm.vue'

const { state, updateImage } = useAuthStore()

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

  await updateImage({ profile: image.value })
}
</script>

<template>
  <div class="card">
    <div class="flex align-content-center justify-content-between">
      <h2>ຂໍ້ມູນຂອງຂ້ອຍ</h2>
    </div>
    <div v-if="state.data && !state.isLoading" class="flex flex-column p-3 mt-3">
      <div class="flex flex-column align-items-center mb-5">
        <img
          class="bg-cover bg-center bg-no-repeat w-9rem h-9rem border-50 border-2 mb-3"
          :style="{
            backgroundImage: 'url('
              .concat(state.data.profileUrl ? state.data.profileUrl : '/placeholder-person.png')
              .concat(')')
          }"
        />
        <message severity="error" @close="imageErrorMessage = ''" v-if="imageErrorMessage">
          {{ imageErrorMessage }}
        </message>
        <file-upload mode="basic" custom-upload @uploader="onChangeProfile" auto />
      </div>
      <div class="grid p-2">
        <div class="col-12 md:col-4">
          <p class="text-300">ຊື່</p>
          <p class="text-gray-500 font-medium text-xl">{{ state.data.name }}</p>
        </div>
        <div class="col-12 md:col-4">
          <p class="text-300">ອີເມວ</p>
          <p class="text-gray-500 font-medium text-xl">{{ state.data.email }}</p>
        </div>
        <div class="col-12 md:col-4">
          <p class="text-300">ເບີໂທ</p>
          <p class="text-gray-500 font-medium text-xl">{{ state.data.tel }}</p>
        </div>
      </div>
      <div class="flex justify-content-center align-items-center flex-column">
        <div class="text-300 mb-2">ບົດບາດ</div>
        <div class="flex flex-wrap gap-2">
          <chip class="bg-green-200 text-green-800 font-bold" :label="state.data.role.name" />
        </div>
      </div>
    </div>
    <loading v-if="state.isLoading" />
    <divider />
    <div class="grid mt-3">
      <div class="col-12 md:col-6">
        <h3>ແກ້ໄຂຂໍ້ມູນ</h3>
        <infomation-form />
      </div>
      <div class="col-12 md:col-6">
        <h3>ປ່ຽນລະຫັດຜ່ານ</h3>
        <password-form />
      </div>
    </div>
  </div>
</template>
