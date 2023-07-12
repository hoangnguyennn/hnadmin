<script setup lang="ts">
import { computed, ref } from 'vue'
import BxTextarea from '@hn/components/common/BxTextarea.vue'

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

      <bx-textarea :rows="10" placeholder="Please input" />
    </div>

    <div class="mt-5">
      <h3>Disabled</h3>

      <bx-textarea placeholder="Please input" disabled />
    </div>

    <div class="mt-5">
      <h3>Fixed</h3>

      <bx-textarea placeholder="Please input" fixed :rows="7" />
    </div>

    <div class="mt-5">
      <h3>Error</h3>

      <bx-textarea
        v-model="input"
        placeholder="Please input"
        :error-message="errorMessage"
      />
    </div>

    <div class="mt-5">
      <h3>Auto size</h3>

      <bx-textarea
        placeholder="Please input"
        auto-size
        :min-rows="2"
        :max-rows="10"
      />
    </div>
  </div>
</template>
