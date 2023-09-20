<script setup lang="ts">
import Editor from 'primevue/editor'
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
    <editor
      v-model="value"
      :aria-describedby="`editor-error-${name}`"
      :placeholder="placeholder"
      editorStyle="height: 230px"
    />
    <small class="p-error" :id="`editor-error-${name}`">{{ errorMessage }}</small>
  </div>
</template>
