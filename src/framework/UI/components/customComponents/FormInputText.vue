<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
  label: string
  required?: boolean
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
    <input-text
      v-model="value"
      :id="name"
      :class="{ 'p-invalid': errorMessage }"
      type="text"
      :aria-describedby="`text-error-${name}`"
      :placeholder="placeholder"
    />
    <small class="p-error" :id="`text-error-${name}`">{{ errorMessage }}</small>
  </div>
</template>
