<script setup lang="ts">
import { ref } from 'vue'
import BxSelect from '@hn/components/common/BxSelect.vue'

const selected = ref()
const selected2 = ref(1)
</script>

<template>
  <div class="p-10">
    <h2>HomePage</h2>

    <div class="mt-5">
      <h3>Default</h3>

      <bx-select :items="[1, 2, 3, 4, 5]" placeholder="Please select" />
    </div>

    <div class="mt-5">
      <h3>Disabled</h3>

      <bx-select
        :items="[1, 2, 3, 4, 5]"
        placeholder="Please select"
        disabled
      />
    </div>

    <div class="mt-5">
      <h3>Object items</h3>

      <bx-select
        v-model="selected"
        :items="[
          {
            id: 1,
            name: '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
          },
          { id: 2, name: 222 },
          { id: 3, name: 333 },
          { id: 4, name: 444 },
          { id: 5, name: 555 }
        ]"
        item-title="name"
        item-value="id"
        placeholder="Please select"
      />
    </div>

    <div class="mt-5">
      <h3>Disabled item</h3>

      <bx-select
        v-model="selected2"
        :items="[
          { id: 1, name: 111 },
          { id: 2, name: 222 },
          { id: 3, name: 333 },
          { id: 4, name: 444 },
          { id: 5, name: 555, disabled: true }
        ]"
        item-title="name"
        item-value="id"
        placeholder="Please select"
      />
    </div>

    <div class="mt-5">
      <h3>Error</h3>

      <bx-select
        :items="[1, 2, 3, 4, 5]"
        error-message="The select is required."
        placeholder="Please select"
      />
    </div>

    <div class="mt-5">
      <h3>Multiple</h3>

      <bx-select
        :items="[1, 2, 3, 4, 5]"
        placeholder="Please select"
        multiple
      />
    </div>
  </div>
</template>
