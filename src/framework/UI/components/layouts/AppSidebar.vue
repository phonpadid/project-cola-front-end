<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import type { MenuItem } from '../interface/interface.menu'

const router = useRouter()

const isRotated = ref<boolean>(false)
const isActive = ref<boolean>(false)
const menu: Array<MenuItem> = [
  {
    key: '1',
    label: 'ໜ້າແລກ',
    icon: 'pi pi-home',
    color: 'text-blue-500',
    to: 'dashboard'
  },
  {
    key: '2',
    label: 'ລູກຄ້າ',
    icon: 'pi pi-users',
    color: 'text-red-500',
    to: 'customer'
  },
  {
    key: '3',
    label: 'ບໍລິສັດ',
    icon: 'pi pi-building',
    color: 'text-green-500',
    to: 'company'
  },
  {
    key: '4',
    label: 'ຜູ້ໃຊ້',
    icon: 'pi pi-user',
    color: 'text-yellow-500',
    to: 'user'
  },
  {
    key: '6',
    label: 'ບົດບາດ',
    icon: 'pi pi-users',
    color: 'text-orange-500',
    to: 'role'
  },
  // {
  //   key: '6',
  //   label: 'ໃບສະເໜີລາຄາ',
  //   icon: 'pi pi-file',
  //   color: 'text-purple-500',
  //   to: 'quotation'
  // },
  // {
  //   key: '7',
  //   label: 'ປະເພດໃບສະເໜີລາຄາ',
  //   icon: 'pi pi-table',
  //   color: 'text-teal-500',
  //   to: 'quotationType'
  // }
  {
    key: '6',
    label: 'ໃບສະເໜີລາຄາ',
    icon: 'pi pi-file',
    color: 'text-purple-500',
    to: '',
    iconList: 'pi pi-chevron-down',
    children: [
      {
        key: '61',
        label: 'ໃບສະເໜີລາຄາ',
        color: 'text-yellow-500',
        to: 'quotation'
      },
      {
        key: '62',
        label: 'ປະເພດ',
        color: 'text-green-500',
        to: 'quotationType'
      }
    ]
  }
]

function rotateIcon(values: any) {
  if (values.children && values.children.length > 0) {
    isRotated.value = !isRotated.value
  }
  if (values.children && values.children.length > 0 && isActive.value) {
    isActive.value = true
  } else {
    isActive.value = false
  }
}

function subLinkActive() {
  isActive.value = true
}
</script>
<template>
  <aside class="shadow-1 h-screen fixed z-2 surface-overlay">
    <div class="flex flex-column h-full white-space-nowrap">
      <div
        @click="router.push({ name: 'dashboard' })"
        class="flex align-items-center ml-3 pt-3 overflow-hidden cursor-pointer"
      >
        <img src="../../../../../public/logo.png" style="width: 44px" />
        <span class="font-bold text-3xl">HalTech</span>
      </div>
      <div class="overflow-y-auto">
        <ul class="list-none p-3 m-0">
          <li v-for="item in menu" :key="item.key">
            <router-link
              :to="{ name: item.to }"
              :active-class="item.children ? '' : 'font-bold'"
              class="flex align-items-center cursor-pointer py-3 mb-1 border-round no-underline text-700 hover:surface-50 transition-duration-150 transition-colors"
              v-styleclass="{
                selector: '@next',
                enterClass: 'hidden',
                enterActiveClass: 'slidedown',
                leaveToClass: 'hidden',
                leaveActiveClass: 'slideup'
              }"
              @click="rotateIcon(item)"
            >
              <i :class="`${item.icon} ${item.color}`" style="margin: 0 12px"></i>
              <span :class="[isActive && item.children ? 'font-bold' : '', 'text-base']">{{
                item.label
              }}</span>
              <i
                :class="[
                  isRotated ? 'transition-duration-300 rotate-180' : 'transition-duration-300',
                  `${item.iconList} ml-auto`
                ]"
                style="margin-right: 12px"
              ></i>
            </router-link>
            <ul
              class="list-none hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
            >
              <li v-for="subItem in item.children" :key="subItem.key">
                <router-link
                  @click="subLinkActive"
                  :to="{ name: subItem.to }"
                  :active-class="'font-bold'"
                  class="flex align-items-center cursor-pointer p-3 mb-1 border-round no-underline text-700 hover:surface-50 transition-duration-150 transition-colors"
                >
                  <span class="text-base">{{ subItem.label }}</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss"></style>
