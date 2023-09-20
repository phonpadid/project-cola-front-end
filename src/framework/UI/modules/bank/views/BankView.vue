<script setup lang="ts">
import Loading from '@/framework/UI/components/states/LoadingComponent.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <suspense>
        <component :is="Component" />
        <template #fallback>
          <loading />
        </template>
      </suspense>
    </template>
  </router-view>
</template>
