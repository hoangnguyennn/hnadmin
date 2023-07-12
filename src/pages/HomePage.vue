<script setup lang="ts">
import BxButton from '@hn/components/common/BxButton.vue'
</script>

<template>
  <div class="p-10">
    <h2>HomePage</h2>

    <div class="mt-5">
      <h3>Default</h3>
      <div style="display: flex; gap: 5px">
        <bx-button>Click me</bx-button>
        <bx-button variant="blue">Click me</bx-button>
        <bx-button variant="red">Click me</bx-button>
        <bx-button variant="green">Click me</bx-button>
        <bx-button variant="yellow">Click me</bx-button>
        <bx-button variant="gray">Click me</bx-button>
      </div>
    </div>

    <div class="mt-5">
      <h3>Outlined</h3>
      <div style="display: flex; gap: 5px">
        <bx-button outlined>Click me</bx-button>
        <bx-button outlined variant="blue">Click me</bx-button>
        <bx-button outlined variant="red">Click me</bx-button>
        <bx-button outlined variant="green">Click me</bx-button>
        <bx-button outlined variant="yellow">Click me</bx-button>
        <bx-button outlined variant="gray">Click me</bx-button>
      </div>
    </div>

    <div class="mt-5">
      <h3>Rounded</h3>
      <div style="display: flex; gap: 5px">
        <bx-button rounded>Click me</bx-button>
        <bx-button rounded variant="blue">Click me</bx-button>
        <bx-button rounded variant="red">Click me</bx-button>
        <bx-button rounded variant="green">Click me</bx-button>
        <bx-button rounded variant="yellow">Click me</bx-button>
        <bx-button rounded variant="gray">Click me</bx-button>
      </div>
    </div>

    <div class="mt-5">
      <h3>Disabled</h3>
      <div style="display: flex; gap: 5px">
        <bx-button disabled>Click me</bx-button>
        <bx-button disabled variant="blue">Click me</bx-button>
        <bx-button disabled variant="red">Click me</bx-button>
        <bx-button disabled variant="green">Click me</bx-button>
        <bx-button disabled variant="yellow">Click me</bx-button>
        <bx-button disabled variant="gray">Click me</bx-button>
      </div>
    </div>

    <div class="mt-5">
      <h3>Disabled and outlined</h3>
      <div style="display: flex; gap: 5px">
        <bx-button disabled outlined>Click me</bx-button>
        <bx-button disabled outlined variant="blue">Click me</bx-button>
        <bx-button disabled outlined variant="red">Click me</bx-button>
        <bx-button disabled outlined variant="green">Click me</bx-button>
        <bx-button disabled outlined variant="yellow">Click me</bx-button>
        <bx-button disabled outlined variant="gray">Click me</bx-button>
      </div>
    </div>
  </div>
</template>
