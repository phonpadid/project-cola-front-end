<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import { useField } from 'vee-validate'

defineEmits<{ (e: 'input', value: number): number }>()

const props = defineProps<{
  name: string
  label: string
  required?: boolean
  placeholder?: string
  suffix?: string
  value?: number
  disabled?: boolean
}>()

const { value, errorMessage } = useField<number>(() => props.name)

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
    <input-number
      v-model="value"
      :input-id="name"
      :class="{ 'p-invalid': errorMessage }"
      :aria-describedby="`number-error-${name}`"
      :placeholder="placeholder"
      :suffix="suffix ? ` ${suffix}` : undefined"
      :min="0"
      @input="(e) => $emit('input', e.value)"
      :disabled="disabled"
    />
    <small class="p-error" :id="`number-error-${name}`">{{ errorMessage }}</small>
  </div>
</template>
