<template>
  <button class="bx-button" :class="btnClasses" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ButtonVariant } from '@hn/types'

interface BxButtonProps {
  variant?: ButtonVariant
  outlined?: boolean
  rounded?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<BxButtonProps>(), {
  variant: 'default',
  outlined: false,
  rounded: false,
  disabled: false
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'blue':
      return 'bx-button--blue'
    case 'green':
      return 'bx-button--green'
    case 'red':
      return 'bx-button--red'
    case 'yellow':
      return 'bx-button--yellow'
    case 'gray':
      return 'bx-button--gray'
    default:
      return ''
  }
})

const btnClasses = computed(() => {
  const classes: string[] = []

  if (variantClass.value) {
    classes.push(variantClass.value)
  }

  if (props.outlined) {
    classes.push('bx-button--outlined')
  }

  if (props.rounded) {
    classes.push('bx-button--rounded')
  }

  if (props.disabled) {
    classes.push('bx-button--disabled')
  }

  return classes.join(' ')
})
</script>
