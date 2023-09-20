<script setup lang="ts">
import PTextarea from 'primevue/textarea'
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
  <div class="flex flex-column gap-2 mb-3 w-full">
    <label :for="name">
      {{ label }}
      <span class="text-red-500" v-if="required"> *</span>
    </label>
    <p-textarea
      auto-resize
      rows="5"
      v-model="value"
      :id="name"
      :class="{ 'p-invalid': errorMessage }"
      :aria-describedby="`text-error-${name}`"
      :placeholder="placeholder"
    />
    <small class="p-error" :id="`text-error-${name}`">{{ errorMessage }}</small>
  </div>
</template>
