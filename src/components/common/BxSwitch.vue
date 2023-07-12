<template>
  <div class="bx-switch" :class="switchClasses">
    <input
      :id="id"
      v-model="checked"
      class="bx-switch--control"
      type="checkbox"
      :tabindex="tabindex"
      :disabled="disabled"
      :value="value"
    />
    <label v-if="label" :for="id" class="bx-switch--label">{{ label }}</label>
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
  disabled?: boolean
  tabindex?: number
}

const props = withDefaults(defineProps<BxCheckboxProps>(), {
  id: undefined,
  label: undefined,
  value: undefined,
  modelValue: undefined,
  disabled: false,
  tabindex: 0
})

const emit = defineEmits<{
  (event: 'update:model-value', value: any): void
}>()

const uid = getUid()
const id = computed(() => props.id ?? `checkbox-${uid}`)

const checked = computed({
  get: () => props.modelValue,
  set: value => emit('update:model-value', value)
})

const switchClasses = computed(() => {
  const classes: string[] = []

  if (props.disabled) {
    classes.push('bx-switch--disabled')
  }

  return classes.join(', ')
})
</script>
