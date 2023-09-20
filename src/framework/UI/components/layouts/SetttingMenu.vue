<script setup lang="ts">
import Sidebar from 'primevue/sidebar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../modules/auth/stores/auth.store'

const { state, logout } = useAuthStore()
const { push } = useRouter()

interface SettingMenu {
  namePath: string
  icon: string
  title: string
  detail: string
}

const menus = ref<SettingMenu[]>([
  { namePath: 'user-profile', icon: 'pi pi-user', title: 'Profile', detail: 'ຂໍ້ມູນໂປຼໄຟລ໌' }
])

if (state.data) {
  if (state.data.role.name === 'admin') {
    menus.value.push(
      ...[
        {
          namePath: 'company-profile',
          icon: 'pi pi-building',
          title: 'Company',
          detail: 'ຂໍ້ມູນບໍລິສັດ'
        },
        {
          namePath: 'bank.list',
          icon: 'pi pi-money-bill',
          title: 'Bank Account',
          detail: 'ຈັດການບັນຊີທະນາຄານ'
        }
      ]
    )
  }
}

const visible = ref<boolean>(false)

defineExpose({
  visible
})
</script>

<template>
  <sidebar v-model:visible="visible" position="right" class="w-full sm:w-25rem">
    <h2>{{ state.data?.name }}</h2>
    <ul class="list-none mt-3 p-0">
      <li v-for="({ namePath, icon, title, detail }, idx) of menus" :key="idx">
        <a
          @click="push({ name: namePath }), (visible = false)"
          class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150"
        >
          <span> <i :class="`text-xl text-color ${icon}`"></i> </span>
          <div class="ml-3">
            <span class="mb-2 font-semibold">{{ title }}</span>
            <p class="text-color-secondary m-0">{{ detail }}</p>
          </div>
        </a>
      </li>
      <li>
        <a
          @click="logout()"
          class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150"
        >
          <span> <i class="pi pi-power-off text-xl text-color"></i> </span>
          <div class="ml-3">
            <span class="mb-2 font-semibold">Sign Out</span>
            <p class="text-color-secondary m-0">ອອກຈາກລະບົບ</p>
          </div>
        </a>
      </li>
    </ul>
  </sidebar>
</template>
