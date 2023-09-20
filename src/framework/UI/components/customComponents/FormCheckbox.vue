<script setup lang="ts">
import Checkbox from 'primevue/checkbox'
import { useField } from 'vee-validate'
import type { OptionDD } from '../interface/option.interface'

const props = defineProps<{
  name: string
  label: string
  options: OptionDD<string>[]
  required?: boolean
  placeholder?: string
  value?: string[]
}>()

const { value, errorMessage } = useField<string[]>(() => props.name)

if (props.value) {
  value.value = props.value
}
</script>

<template>
  <div class="flex flex-wrap justify-content-center gap-3 mb-3">
    <div class="flex align-items-center" v-for="(option, idx) of options" :key="idx">
      <checkbox
        v-model="value"
        :inputId="`${name}-${idx + 1}`"
        :name="`chbx-${name}`"
        :value="option.value"
        :aria-describedby="`chbx-error-${name}`"
      />
      <label :for="`${name}-${idx + 1}`" class="ml-2"> {{ option.label }} </label>
    </div>
    <div class="w-full">
      <small :id="`chbx-error-${name}`" class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>
