<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
import { useAuthStore } from '../../modules/auth/stores/auth.store'
import SettingMenu from './SetttingMenu.vue'

const { state } = useAuthStore()

const route = useRoute()
const breadcrumbItems = ref<Array<string>>([])
const items = ref()

function getBreadcrumbItems(to: RouteLocationNormalizedLoaded) {
  breadcrumbItems.value = []

  to.matched.forEach((matched, idx) => {
    if (idx !== 0) {
      breadcrumbItems.value.push(matched.meta['label'] as string)
    }
  })

  items.value = breadcrumbItems.value.map((item) => {
    return { label: item }
  })
}

const settingMenuRef = ref<InstanceType<typeof SettingMenu> | null>(null)
const emit = defineEmits<{ (e: 'toggleSidebar'): void }>()

onBeforeRouteUpdate((to) => {
  getBreadcrumbItems(to)
})

onMounted(async () => {
  getBreadcrumbItems(route)
})
</script>
<template>
  <header class="flex align-items-center justify-content-between pl-3 pr-4 h-4rem surface-ground">
    <div class="flex align-items-center justify-content-center gap-2">
      <div
        class="cursor-pointer flex align-items-center justify-content-center border-circle hover:bg-gray-200 hover:text-gray-800 hover:border-2 border-gray-500"
        style="width: 40px; height: 40px"
        @click="emit('toggleSidebar')"
      >
        <i class="pi pi-bars font-bold" style="font-size: 1rem"></i>
      </div>
      <Breadcrumb
        :model="items"
        :pt="{
          root: { class: 'surface-ground border-none' },
          label: { class: 'text-xs sm:text-lg font-bold text-400' }
        }"
      />
    </div>
    <div v-if="state.data && !state.isLoading">
      <a
        class="cursor-pointer"
        @click="() => (settingMenuRef ? (settingMenuRef.visible = true) : undefined)"
      >
        <img
          :src="state.data.profile ? state.data.profile : '/placeholder-person.png'"
          class="mr-3 bg-no-repeat border-circle lg:mr-0 border-1 border-gray-300"
          style="width: 32px; height: 32px"
        />
      </a>
    </div>
  </header>
  <setting-menu ref="settingMenuRef" />
</template>
