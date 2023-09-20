<template>
    <div class="card">
        <Editor v-model="value" editorStyle="height: 320px" />
    </div>
</template>

<script setup lang="ts">
import Editor from 'primevue/editor'

import { ref } from "vue";

const value = ref('');
</script>
