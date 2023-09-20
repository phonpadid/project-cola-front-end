<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import type { VirtualScrollerLazyEvent } from 'primevue/virtualscroller'
import { useField } from 'vee-validate'
import type { OptionDD } from '../interface/option.interface'

defineEmits<{ (e: 'onLazyLoad', event: VirtualScrollerLazyEvent): void }>()

interface LazyVirtualScrollerDropdown {
  isLoading: boolean
}

const props = defineProps<{
  name: string
  label: string
  options: OptionDD<string>[] | unknown[]
  required?: boolean
  placeholder?: string
  lazy?: LazyVirtualScrollerDropdown
  value?: string
}>()

const { value, errorMessage } = useField<string>(() => props.name)

if (props.value) {
  value.value = props.value
}
</script>

<template>
  <div class="flex flex-column gap-2 mb-3">
    <label :for="`dd-error-${name}`">
      {{ label }}
      <span class="text-red-500" v-if="required"> *</span>
    </label>
    <dropdown
      :filter="lazy ? true : false"
      v-model="value"
      :placeholder="placeholder"
      :loading="lazy?.isLoading"
      :options="options"
      option-label="label"
      option-value="value"
      :virtual-scroller-options="
        lazy
          ? {
              lazy: true,
              onLazyLoad: (e) => $emit('onLazyLoad', e),
              itemSize: 50,
              delay: 250
            }
          : undefined
      "
      :class="{ 'p-invalid': errorMessage }"
      :aria-describedby="`dd-error-${name}`"
    />
    <small class="p-error" :id="`dd-error-${name}`">{{ errorMessage }}</small>
  </div>
</template>
