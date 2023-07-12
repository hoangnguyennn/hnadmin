<script setup lang="ts">
import { computed, ref } from 'vue'
import BxInput from '@hn/components/common/BxInput.vue'

const input = ref('')

const errorMessage = computed(() => {
  return input.value ? '' : 'The input is required'
})
</script>

<template>
  <div class="p-10">
    <h2>HomePage</h2>

    <div class="mt-5">
      <h3>Default</h3>
      <div style="display: flex; gap: 5px">
        <bx-input placeholder="Please input" />
      </div>
    </div>

    <div class="mt-5">
      <h3>Disabled</h3>
      <div style="display: flex; gap: 5px">
        <bx-input placeholder="Please input" disabled />
      </div>
    </div>

    <div class="mt-5">
      <h3>Error</h3>
      <div style="display: flex; gap: 5px">
        <bx-input
          v-model="input"
          placeholder="Please input"
          :error-message="errorMessage"
        />
      </div>
    </div>
  </div>
</template>
