<template>
  <div class="bx-checkbox" :class="checkboxClasses">
    <div class="bx-checkbox__control-wrap">
      <input
        :id="id"
        v-model="checked"
        class="bx-checkbox__control"
        type="checkbox"
        :tabindex="tabindex"
        :disabled="disabled"
        :value="value"
      />
      <div class="bx-checkbox__icon"></div>
    </div>

    <label v-if="label" :for="id" class="bx-checkbox__label">{{ label }}</label>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed } from 'vue'
import { getUid } from '@hn/utils/common.util'

interface BxCheckboxProps {
  id?: string
  label?: string
  value?: any
  modelValue?: any
  indeterminate?: boolean
  disabled?: boolean
  tabindex?: number
}

const props = withDefaults(defineProps<BxCheckboxProps>(), {
  id: undefined,
  label: undefined,
  value: undefined,
  modelValue: undefined,
  indeterminate: undefined,
  disabled: false,
  tabindex: 0
})

const emit = defineEmits<{
  (event: 'update:model-value', value: any): void
  (event: 'update:indeterminate', value: boolean): void
}>()

const uid = getUid()
const id = computed(() => props.id ?? `checkbox-${uid}`)

const checked = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:model-value', value)

    // emit indeterminate state if using it
    if (props.indeterminate !== undefined) {
      emit('update:indeterminate', false)
    }
  }
})

const checkboxClasses = computed(() => {
  const classes: string[] = []

  if (props.disabled) {
    classes.push('disabled')
  }

  if (props.indeterminate) {
    classes.push('indeterminate')
  }

  return classes.join(', ')
})
</script>
