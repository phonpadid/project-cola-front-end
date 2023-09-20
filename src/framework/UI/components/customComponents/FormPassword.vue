<script setup lang="ts">
import Password from 'primevue/password'
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
  label: string
  required?: boolean
  feedBack?: boolean
  placeholder?: string
  value?: string
}>()

const { value, errorMessage } = useField<string>(() => props.name)

if (props.value) {
  value.value = props.value
}
</script>

<template>
  <div class="flex flex-column gap-2 mb-3">
    <label :for="name">
      {{ label }}
      <span class="text-red-500" v-if="required"> *</span>
    </label>
    <password
      v-model="value"
      :id="name"
      :class="{ 'p-invalid': errorMessage }"
      :aria-describedby="`password-error-${name}`"
      :placeholder="placeholder"
      :feedback="feedBack"
      input-class="w-full"
      toggle-mask
    />
    <small class="p-error" :id="`password-error-${name}`">{{ errorMessage }}</small>
  </div>
</template>
