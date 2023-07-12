<template>
  <div class="bx-radio" :class="radioClasses">
    <div class="bx-radio__control-wrap">
      <input
        :id="id"
        v-model="checked"
        class="bx-radio__control"
        type="radio"
        :name="name"
        :tabindex="tabindex"
        :disabled="disabled"
        :value="value"
      />
      <div class="bx-radio__icon"></div>
    </div>

    <label v-if="label" :for="id" class="bx-radio__label">{{ label }}</label>
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
  name?: string
}

const props = withDefaults(defineProps<BxCheckboxProps>(), {
  id: undefined,
  label: undefined,
  value: undefined,
  modelValue: undefined,
  disabled: false,
  tabindex: 0,
  name: undefined
})

const emit = defineEmits<{
  (event: 'update:model-value', value: any): void
}>()

const uid = getUid()
const id = computed(() => props.id ?? `radio-${uid}`)
const name = computed(() => props.name ?? `radio-${uid}`)

const checked = computed({
  get: () => props.modelValue,
  set: value => emit('update:model-value', value)
})

const radioClasses = computed(() => {
  const classes: string[] = []

  if (props.disabled) {
    classes.push('disabled')
  }

  return classes.join(', ')
})
</script>
