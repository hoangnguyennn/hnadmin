<template>
  <div ref="bxSliderRef" class="bx-slider" :class="sliderClasses">
    <div class="bx-slider--track"></div>
    <div class="bx-slider--active-track" :style="activeTrackStyles"></div>
    <div
      ref="bxSliderControlRef"
      class="bx-slider--control"
      :style="controllerStyles"
      :tabindex="disabled ? -1 : 0"
    ></div>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { StyleValue, computed, ref, watch } from 'vue'
import useTrack from '@hn/composables/useTrack'

interface BxSliderProps {
  direction?: 'vertical' | 'horizontal'
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<BxSliderProps>(), {
  direction: 'vertical',
  modelValue: undefined,
  min: 0,
  max: 100,
  step: undefined,
  disabled: false
})

const emit = defineEmits<{
  (event: 'update:model-value', value: number): void
}>()

const bxSliderRef = ref<HTMLDivElement>()
const bxSliderControlRef = ref<HTMLDivElement>()

const { percentageX } = useTrack(bxSliderRef, bxSliderControlRef)

const activeTrackStyles = ref<StyleValue>()
const controllerStyles = ref<StyleValue>()

const percentageXByStep = computed(() => {
  if (props.step) {
    const standardStep = props.step || 1
    return Math.round(percentageX.value / standardStep) * standardStep
  }

  return percentageX.value
})

const sliderClasses = computed(() => {
  const classes: string[] = []

  if (props.disabled) {
    classes.push('bx-slider--disabled')
  }

  return classes.join(' ')
})

const emitValue = (percentage: number) => {
  return ((props.max - props.min) * percentage) / 100 + props.min
}

const standardPercentage = (percentage: number) => {
  if (percentage < 0) {
    return 0
  }

  if (percentage > 100) {
    return 100
  }

  return percentage
}

const percentageByValue = (value: number) => {
  const valueFromMin = value - props.min
  const valueRange = props.max - props.min || 1

  return standardPercentage((valueFromMin / valueRange) * 100)
}

watch(
  () => props.modelValue,
  newPropModelValue => {
    if (newPropModelValue && newPropModelValue !== percentageX.value) {
      const percentage = percentageByValue(newPropModelValue)
      activeTrackStyles.value = {
        width: `${percentage}%`
      }

      controllerStyles.value = {
        left: `${percentage}%`
      }
    }
  },
  { immediate: true }
)

watch(percentageXByStep, newPercentageX => {
  if (props.disabled) {
    return
  }

  if (props.direction === 'vertical') {
    const value = emitValue(Math.round(newPercentageX))
    activeTrackStyles.value = {
      width: `${newPercentageX}%`
    }

    controllerStyles.value = {
      left: `${newPercentageX}%`
    }

    emit('update:model-value', value)
  }
})
</script>
