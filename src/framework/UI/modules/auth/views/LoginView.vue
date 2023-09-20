<script setup lang="ts">
import MyInputText from '@/framework/UI/components/customComponents/MyInputText.vue'
import Button from 'primevue/button'
import { Form as VForm } from 'vee-validate'
import { reactive } from 'vue'
import { loginSchema } from '../schema/login.schema'
import { useAuthStore } from '../stores/auth.store'

const { form, state, login } = useAuthStore()

const invalidForm = reactive<{ email: string; password: string }>({
  email: '',
  password: ''
})
</script>
<template>
  <div
    class="flex align-items-center justify-content-center min-h-screen lg:grid lg:nested-grid lg:m-0"
  >
    <div
      class="col-8 min-h-screen hidden lg:block backgroundImage bg-cover bg-center bg-no-repeat"
    />
    <div class="col-4 flex flex-column align-items-center">
      <div class="col-12 flex justify-content-center flex-column align-items-center">
        <div
          class="flex flex-column border-1 border-100 border-round-md p-5 shadow-1 lg:border-none lg:shadow-none"
          style="margin-top: 10rem; margin-bottom: 9rem"
        >
          <div class="flex flex-column align-items-center">
            <img src="/logo.png" style="width: 5rem" />
            <span class="font-bold text-3xl">HalTech</span>
          </div>
          <v-form :validation-schema="loginSchema" class="mt-3" @submit="login">
            <div class="flex flex-column gap-3 mb-3">
              <div class="">
                <span class="p-input-icon-left">
                  <i class="pi pi-user"></i>
                  <my-input-text
                    name="email"
                    :value="form.email as string"
                    class="w-18rem"
                    placeholder="ຊື່ຜູ້ໃຊ້"
                    @on-invalid="(e: string ) => (invalidForm.email = e)"
                  />
                </span>
                <small class="p-error block" id="text-error-username">{{
                  invalidForm.email
                }}</small>
              </div>
              <div>
                <span class="p-input-icon-left">
                  <i class="pi pi-lock"></i>
                  <my-input-text
                    name="password"
                    :value="form.password as string"
                    class="w-18rem"
                    type="password"
                    placeholder="ລະຫັດຜ່ານ"
                    @on-invalid="(e: string) => (invalidForm.password = e)"
                  />
                </span>
                <small class="p-error block" id="text-error-username">{{
                  invalidForm.password
                }}</small>
              </div>
            </div>
            <div>
              <Button
                class="w-full surface-500 border-none"
                type="submit"
                label="ເຂົ້າສູ່ລະບົບ"
                :loading="state.isLoading"
              />
            </div>
          </v-form>
        </div>
        <span class="white-space-nowrap font-medium ml-2 text-color"
          >&#9400;2023 Haltech | All Rights Reserved</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.backgroundImage {
  background: url('/1hal.png');
}
</style>
