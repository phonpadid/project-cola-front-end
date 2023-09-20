<script setup lang="ts">
import Calendar from 'primevue/calendar'
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
  label: string
  required?: boolean
  placeholder?: string
  value?: Date | Date[]
  selectionMode?: 'single' | 'multiple' | 'range'
}>()

const { value, errorMessage } = useField<Date | Date[]>(() => props.name)

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
    <calendar
      v-model="value"
      :id="name"
      :class="{ 'p-invalid': errorMessage }"
      :aria-describedby="`date-error-${name}`"
      :placeholder="placeholder"
      show-icon
      :selection-mode="selectionMode"
    />
    <small class="p-error" :id="`date-error-${name}`">{{ errorMessage }}</small>
  </div>
</template>
