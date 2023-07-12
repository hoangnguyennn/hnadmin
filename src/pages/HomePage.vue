<script setup lang="ts">
import BxButton from '@hn/components/common/BxButton.vue'
</script>

<template>
  <div>
    <h2 class="disabled">HomePage</h2>

    <div style="display: flex; gap: 5px">
      <bx-button>Click me</bx-button>
      <bx-button variant="blue">Click me</bx-button>
      <bx-button variant="red">Click me</bx-button>
      <bx-button variant="green">Click me</bx-button>
      <bx-button variant="yellow">Click me</bx-button>
      <bx-button variant="gray">Click me</bx-button>
    </div>

    <div style="display: flex; gap: 5px" class="mt-5">
      <bx-button outlined>Click me</bx-button>
      <bx-button outlined variant="blue">Click me</bx-button>
      <bx-button outlined variant="red">Click me</bx-button>
      <bx-button outlined variant="green">Click me</bx-button>
      <bx-button outlined variant="yellow">Click me</bx-button>
      <bx-button outlined variant="gray">Click me</bx-button>
    </div>

    <div style="display: flex; gap: 5px" class="mt-5">
      <bx-button rounded>Click me</bx-button>
      <bx-button rounded variant="blue">Click me</bx-button>
      <bx-button rounded variant="red">Click me</bx-button>
      <bx-button rounded variant="green">Click me</bx-button>
      <bx-button rounded variant="yellow">Click me</bx-button>
      <bx-button rounded variant="gray">Click me</bx-button>
    </div>
  </div>
</template>
