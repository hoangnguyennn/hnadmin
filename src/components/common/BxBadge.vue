<template>
  <span class="bx-badge" :class="badgeClasses">
    <template v-if="!dot">
      <slot>{{ title }}</slot>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BadgeVariant } from '@hn/types'

export interface BxBadgeProps {
  variant?: BadgeVariant
  title?: string
  dot?: boolean
  rounded?: boolean
}

const props = withDefaults(defineProps<BxBadgeProps>(), {
  variant: 'blue',
  title: undefined,
  dot: undefined,
  rounded: undefined
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'blue':
      return 'bx-badge--blue'
    case 'green':
      return 'bx-badge--green'
    case 'red':
      return 'bx-badge--red'
    case 'yellow':
      return 'bx-badge--yellow'
    case 'gray':
      return 'bx-badge--gray'
    default:
      return ''
  }
})

const badgeClasses = computed(() => {
  const classes: string[] = []

  if (variantClass.value) {
    classes.push(variantClass.value)
  }

  if (props.dot) {
    classes.push('dot')
  }

  if (props.rounded) {
    classes.push('rounded')
  }

  return classes.join(' ')
})
</script>
