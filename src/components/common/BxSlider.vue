<template>
  <div ref="bxSliderRef" class="bx-slider" :class="sliderClasses">
    <div ref="bxSliderTrackRef" class="bx-slider__track"></div>

    <div
      ref="bxSliderActiveTrackRef"
      class="bx-slider__active-track"
      :style="activeTrackStyles"
    ></div>

    <div
      ref="bxSliderControlRef"
      class="bx-slider__control"
      :style="controllerStyles"
      :tabindex="disabled ? -1 : 0"
    ></div>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import {
  StyleValue,
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'
import useDrag from '@hn/composables/useDrag'

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
const bxSliderTrackRef = ref<HTMLDivElement>()
const bxSliderActiveTrackRef = ref<HTMLDivElement>()
const bxSliderControlRef = ref<HTMLDivElement>()

const { x } = useDrag(bxSliderControlRef)

const percentage = ref(0)

const activeTrackStyles = ref<StyleValue>()
const controllerStyles = ref<StyleValue>()

const percentageByStep = computed(() => {
  if (props.step) {
    const standardStep = props.step || 1
    return Math.round(percentage.value / standardStep) * standardStep
  }

  return percentage.value
})

const sliderClasses = computed(() => {
  const classes: string[] = []

  if (props.disabled) {
    classes.push('disabled')
  }

  return classes.join(' ')
})

const valueEmit = (percentage: number) => {
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

const getPercentageByValue = (value: number) => {
  const valueDiffMin = value - props.min
  const valueRange = props.max - props.min || 1

  return standardPercentage((valueDiffMin / valueRange) * 100)
}

const getPercentageByCoordinate = (coordinate: number) => {
  const track = bxSliderTrackRef.value

  if (track) {
    const trackRect = track.getBoundingClientRect()
    const trackStart = trackRect.left
    const trackEnd = trackRect.right

    const mousePositionWithTrackStart = coordinate - trackStart
    const trackLength = trackEnd - trackStart

    const percentage = (mousePositionWithTrackStart / trackLength) * 100
    return standardPercentage(percentage)
  }

  return 0
}

const onTrackClick = (event: MouseEvent) => {
  percentage.value = getPercentageByCoordinate(event.pageX)
}

watch(x, newX => {
  if (!props.disabled) {
    percentage.value = getPercentageByCoordinate(newX)
  }
})

watch(
  () => props.modelValue,
  newPropModelValue => {
    if (newPropModelValue && newPropModelValue !== percentage.value) {
      const percentage = getPercentageByValue(newPropModelValue)
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

watch(percentageByStep, newPercentage => {
  if (props.disabled) {
    return
  }

  if (props.direction === 'vertical') {
    const value = valueEmit(Math.round(newPercentage))
    activeTrackStyles.value = {
      width: `${newPercentage}%`
    }

    controllerStyles.value = {
      left: `${newPercentage}%`
    }

    emit('update:model-value', value)
  }
})

onMounted(() => {
  const track = bxSliderTrackRef.value
  const activeTrack = bxSliderActiveTrackRef.value

  if (track) {
    track.addEventListener('click', onTrackClick)
  }

  if (activeTrack) {
    activeTrack.addEventListener('click', onTrackClick)
  }
})

onBeforeUnmount(() => {
  const track = bxSliderTrackRef.value
  const activeTrack = bxSliderActiveTrackRef.value

  if (track) {
    track.removeEventListener('click', onTrackClick)
  }

  if (activeTrack) {
    activeTrack.removeEventListener('click', onTrackClick)
  }
})
</script>
