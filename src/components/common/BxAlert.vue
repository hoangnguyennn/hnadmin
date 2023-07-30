<template>
  <div v-if="isOpen" class="bx-alert" :class="alertClasses">
    <slot></slot>
    <div class="bx-alert__close" @click="onClose"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertVariant, AlertTheme } from '@hn/types'

export interface BxAlertProps {
  variant?: AlertVariant
  theme?: AlertTheme
}

const props = withDefaults(defineProps<BxAlertProps>(), {
  variant: 'blue',
  theme: 'light'
})

const emit = defineEmits<{
  (event: 'close', value: boolean): void
}>()

const isOpen = ref(true)

const variantClass = computed(() => {
  switch (props.variant) {
    case 'blue':
      return 'bx-alert--blue'
    case 'green':
      return 'bx-alert--green'
    case 'red':
      return 'bx-alert--red'
    case 'yellow':
      return 'bx-alert--yellow'
    case 'gray':
      return 'bx-alert--gray'
    default:
      return ''
  }
})

const alertClasses = computed(() => {
  const classes: string[] = []

  if (variantClass.value) {
    classes.push(variantClass.value)
  }

  classes.push(props.theme)

  return classes.join(' ')
})

const onClose = () => {
  isOpen.value = false
  emit('close', false)
}
</script>
