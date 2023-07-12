<script setup lang="ts">
import BxCheckbox from '@hn/components/common/BxCheckbox.vue'
import { ref } from 'vue'

const checked = ref([])
</script>

<template>
  <div class="p-10">
    <h2>HomePage</h2>

    <div class="mt-5">
      <h3>Default</h3>

      <bx-checkbox />
    </div>

    <div class="mt-5">
      <h3>With label</h3>

      <bx-checkbox v-model="checked" label="Option 1" value="1" />
      <bx-checkbox v-model="checked" label="Option 2" value="2" />
    </div>

    <div class="mt-5">
      <h3>Disabled</h3>

      <bx-checkbox v-model="checked" label="Option 1" value="1" disabled />
    </div>
  </div>
</template>
