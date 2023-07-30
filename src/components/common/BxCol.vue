<template>
  <div class="bx-col" :class="colClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface BxColProps {
  cols?: number
}

const props = withDefaults(defineProps<BxColProps>(), {
  cols: undefined
})

const colClasses = computed(() => {
  const classes: string[] = []

  if (props.cols) {
    classes.push(`bx-col-${props.cols}`)
  }

  return classes.join(' ')
})
</script>
