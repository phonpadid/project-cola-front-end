<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingComponent from '../../../components/states/LoadingComponent.vue'
</script>
<template>
  <div>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <suspense>
          <component :is="Component" />
          <template #fallback> <loading-component /> </template>
        </suspense>
      </template>
    </router-view>
  </div>
</template>

<style scoped></style>
