<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import Loading from './components/states/LoadingComponent.vue'
</script>

<template>
  <Toast position="center" group="exception">
    <template #message="{ message }">
      <div class="flex flex-column align-items-center" style="flex: 1">
        <div class="text-center">
          <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
          <div class="font-bold text-xl my-3">{{ message.summary }}</div>
          <div class="">{{ message.detail }}</div>
        </div>
      </div>
    </template>
  </Toast>
  <Toast />
  <confirm-dialog />
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <suspense>
        <component :is="Component" />
        <template #fallback>
          <div class="w-screen h-screen flex align-items-center justify-content-center">
            <loading />
          </div>
        </template>
      </suspense>
    </template>
  </router-view>
</template>
