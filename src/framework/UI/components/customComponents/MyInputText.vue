<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useField } from 'vee-validate'
import { toRef, watch } from 'vue'

const emit = defineEmits<{ (e: 'onInvalid', errorMessage: any): void }>()
const props = defineProps<{ value: string; name: string; placeholder: string }>()
const name = toRef(props, 'name')

const {
  value,
  errorMessage,
  handleChange
} = useField(name, undefined, {
  initialValue: props.value
})

watch(errorMessage, (oldValue, newValue) => {
  emit('onInvalid', oldValue)
})
</script>

<template>
  <input-text
    :name="name"
    :id="name"
    :placeholder="props.placeholder"
    :value="value"
    @update:model-value="handleChange"
    :aria-describedby="`text-error-${name}`"
    :class="`w-full ${errorMessage ? 'p-invalid' : ''}`"
    style="font-family: NotoSansLao, Montserrat"
  />
</template>
