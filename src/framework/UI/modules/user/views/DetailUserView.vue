<script setup lang="ts">
import Chip from 'primevue/chip'
import PImage from 'primevue/image'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user.store'

const { params } = useRoute()

const { getOne, state } = useUserStore()

await getOne(params.id as string)
</script>

<template>
  <div class="card">
    <h2>ລາຍລະອຽດຜູ້ໃຊ້</h2>
    <div v-if="state.data && !state.isLoading" class="flex flex-column p-3 mt-3">
      <div class="flex flex-column align-items-center mb-5">
        <p-image
          class="bg-cover bg-center bg-no-repeat w-9rem h-9rem border-50 border-2 mb-3"
          :src="state.data.profileUrl ? state.data.profileUrl : '/placeholder-person.png'"
          alt="profule image"
        />
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
          <chip class="bg-green-200 text-green-800 font-bold" :label="state.data.role?.name" />
        </div>
      </div>
    </div>
  </div>
</template>
