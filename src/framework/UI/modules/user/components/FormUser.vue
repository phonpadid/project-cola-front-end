<script setup lang="ts">
import Dropdown from '@/framework/UI/components/customComponents/FormDropdown.vue'
import InputText from '@/framework/UI/components/customComponents/FormInputText.vue'
import Password from '@/framework/UI/components/customComponents/FormPassword.vue'
import type { OptionDD } from '@/framework/UI/components/interface/option.interface'
import type { UserDTO } from '@/interface-adapter/dto/user.dto'
import type { IFile } from '@/interface-adapter/interfaces/file.interface'
import PButton from 'primevue/button'
import type { FileUploadRemoveUploadedFile } from 'primevue/fileupload'
import FileUpload from 'primevue/fileupload'
import PImage from 'primevue/image'
import Message from 'primevue/message'
import type { VirtualScrollerLazyEvent } from 'primevue/virtualscroller'
import { useForm } from 'vee-validate'
import { ref,computed } from 'vue'
import { useAuthStore } from '../../auth/stores/auth.store'
import { useRoleStore } from '../../role/stores/role.store'
import { userSchema, type UserSchema } from '../schema/user.schema'

// interface OldValue extends Omit<UserDTO, 'company' | 'profile'> {
//   profile: string
// }

// const props = defineProps<{
//   oldValues?: OldValue
// }>()
const emit = defineEmits<{
  (e: 'submit', values: Omit<UserDTO, 'company'>): Omit<UserDTO, 'company'>
}>()

const authStore = useAuthStore()

const roleStore = useRoleStore()

await roleStore.getToDropdown({
  first: 1,
  limit: 10,
  filter: { company: { id: authStore.state.data?.company?.id } }
})

const roleOptions = ref<OptionDD<string>[]>(Array.from({ length: roleStore.state.list.total }))

async function loadRoleOptions(e: VirtualScrollerLazyEvent) {
  await roleStore.getToDropdown({
    first: e.first + 1,
    limit: e.last - e.first + 1,
    filter: { company: { id: authStore.state.data?.company?.id } }
  })

  for (let _i = e.first; _i < e.last; _i++) {
    roleOptions.value[_i] = {
      label: roleStore.state.list.props[_i - e.first].name,
      value: roleStore.state.list.props[_i - e.first].id
    }
  }
}
//Varidate dateTime
// Create a ref for the selected date and time
const selectedDatetime = ref<string>(new Date().toISOString().slice(0, 16));

// Create a computed property to check if the datetime is invalid
const isDatetimeInvalid = computed(() => {
  const dateStr = selectedDatetime.value;
  const parsedDate = Date.parse(dateStr);
  return isNaN(parsedDate);
});

// Function to update the selectedDatetime ref and validate the input
const updateDatetime = (event: Event) => {
  const newDatetime = (event.target as HTMLInputElement).value;
  if (!isDatetimeInvalid.value) {
    selectedDatetime.value = newDatetime;
  }
}; 

// const image = ref<IFile>()
// const imageErrorMessage = ref<string>('')

// function onChooseImage(e: FileUploadRemoveUploadedFile) {
//   if (e.files[0].size >= 1024 * 1024) {
//     imageErrorMessage.value = 'ຂະໜາດຮູບຕ້ອງບໍ່ເກີນ 1MB'
//     return
//   }

//   if (!e.files[0].type.startsWith('image/')) {
//     imageErrorMessage.value = 'ໄຟລ໌ຕ້ອງເປັນໄຟລ໌ຮູບ'
//     return
//   }

//   imageErrorMessage.value = ''
//   image.value = e.files[0]
// }

// const { handleSubmit } = useForm<UserSchema>({
//   validationSchema: userSchema
// })

// const onSubmit = handleSubmit((values) => {
//   if (!image.value && !props.oldValues?.profile) {
//     imageErrorMessage.value = 'ກະລູນາເລືອກຮູບ'
//     return
//   }

//   emit('submit', { ...values, profile: image.value })
// })
</script>

<template>
  <form class="mt-3" @submit.prevent="onSubmit">
    <!-- <div class="flex flex-column justify-content-center align-items-center">
      <p-image
        :src="
          image
            ? image.objectURL
            : oldValues?.profile && !image
            ? oldValues.profile
            : '/placeholder-person.png'
        "
        alt="profile image"
        image-class="bg-cover
        bg-center bg-no-repeat w-9rem h-9rem border-50 border-2 mb-3"
        image-style="object-fit: contain;"
      />
      <message severity="error" @close="imageErrorMessage = ''" v-if="imageErrorMessage">
        {{ imageErrorMessage }}
      </message>
      <file-upload custom-upload auto mode="basic" @uploader="onChooseImage" />
    </div> -->
    <div class="grid mt-3">
      <div class="col-12 md:col-6">
        <input-text
          label="ຊື່ຜູ້ໃຊ້"
          required
          placeholder="ປ້ອນຊື່ຜູ້ໃຊ້"
          name="name"
          :value="oldValues ? oldValues.name : ''"
        />
        <input-text
          label="ອີເມວ"
          required
          placeholder="ປ້ອນອີເມວ"
          name="email"
          :value="oldValues ? oldValues.email : ''"
        />
        <div>
        <label for="datetime">ວັນທີເດືອນປີ <span class="text-red-600">*</span></label>
        <input
          class="col-12"
          type="datetime-local"
          id="datetime"
          v-model="selectedDatetime"
          @input="updateDatetime"
          
        />
        <p v-if="isDatetimeInvalid" class="error-message">ກະລຸນາປ້ອນວັນທີໃຫ້ຄົບ.</p>
      </div>
        <!-- <dropdown
          name="role.id"
          label="ບົດບາດ"
          placeholder="ເລືອກບົດບາດ"
          required
          :options="roleOptions"
          :lazy="{ isLoading: roleStore.state.isLoading }"
          @on-lazy-load="loadRoleOptions"
          :value="oldValues ? oldValues.role.id : ''"
        /> -->
      </div>
      
      <div class="col-12 md:col-6">
        <input-text
          label="ເບີໂທ"
          placeholder="ປ້ອນເບີໂທ"
          name="tel"
          :value="oldValues ? oldValues.tel : ''"
        />
        <password
          label="ລະຫັດຜ່ານ"
          required
          placeholder="ປ້ອນລະຫັດຜ່ານ"
          name="password"
          feed-back
          :value="oldValues ? oldValues.password : ''"
        />
      </div>
    </div>
    <div class="flex justify-content-center">
      <p-button type="submit" severity="info" label="ບັນທຶກ" icon="pi pi-save" class="w-16rem" />
    </div>
  </form>
</template>
<style scoped>
.error-message {
  color: red;
}
</style>