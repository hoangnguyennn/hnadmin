<template>
  <div class="bx-input" :class="inputClasses">
    <input
      v-model="modelValue"
      type="text"
      class="bx-input__control"
      :placeholder="placeholder"
      :disabled="disabled"
    />

    <Transition name="fade">
      <div v-if="errorMessage" class="bx-input__error">{{ errorMessage }}</div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface BxInputProps {
  placeholder?: string
  disabled?: boolean
  errorMessage?: string
  modelValue?: string
}

const props = withDefaults(defineProps<BxInputProps>(), {
  placeholder: undefined,
  disabled: false,
  errorMessage: undefined,
  modelValue: undefined
})

const emit = defineEmits<{
  (e: 'update:model-value', value: BxInputProps['modelValue']): void
}>()

const modelValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:model-value', value)
})

const inputClasses = computed(() => {
  const classes: string[] = []

  if (props.disabled) {
    classes.push('disabled')
  }

  if (props.errorMessage) {
    classes.push('error')
  }

  return classes.join(' ')
})
</script>
