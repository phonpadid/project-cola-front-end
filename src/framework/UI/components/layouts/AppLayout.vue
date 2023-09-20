<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../modules/auth/stores/auth.store'
import LoadingComponent from '../states/LoadingComponent.vue'
import AppFooter from './AppFooter.vue'
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'
const toggle = ref<boolean>(true)

const { getAuth } = useAuthStore()

await getAuth()
</script>
<template>
  <div :class="[toggle ? 'layout-mobile-active' : '', 'layout-container']">
    <AppSidebar :style="toggle ? 'width: 15rem;' : 'width: 0rem'" />
    <div
      class="layout-content"
      :style="toggle ? '' : 'margin-left: 0rem;transition: 0.2s ease-in-out;'"
    >
      <AppTopbar @toggle-sidebar="() => (toggle = !toggle)" />
      <main class="layout-main-container surface-ground">
        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <suspense>
              <component :is="Component" />
              <template #fallback> <loading-component /> </template>
            </suspense>
          </template>
        </router-view>
      </main>
      <AppFooter />
    </div>
    <div class="layout-mask" @click="() => (toggle = !toggle)"></div>
  </div>
</template>

<style scoped lang="css"></style>
