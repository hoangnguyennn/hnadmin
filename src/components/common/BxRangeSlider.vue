<template>
  <div
    ref="bxRangeSliderRef"
    class="bx-range-slider"
    :class="rangeSliderClasses"
  >
    <div ref="bxRangeSliderTrackRef" class="bx-range-slider__track"></div>

    <div
      ref="bxRangeSliderActiveTrackRef"
      class="bx-range-slider__active-track"
      :style="activeTrackStyles"
    ></div>

    <div
      ref="bxRangeSliderControl1Ref"
      class="bx-range-slider__control"
      tabindex="0"
      :style="controller1Styles"
    ></div>

    <div
      ref="bxRangeSliderControl2Ref"
      class="bx-range-slider__control"
      tabindex="0"
      :style="controller2Styles"
    ></div>
  </div>
</template>

<script setup lang="ts">
import useDrag from '@hn/composables/useDrag'
import CommonUtil from '@hn/utils/common.util'
import {
  StyleValue,
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'

interface BxRangeSliderProps {
  direction?: 'vertical' | 'horizontal'
  modelValue?: [number, number]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<BxRangeSliderProps>(), {
  direction: 'vertical',
  modelValue: undefined,
  min: 0,
  max: 100,
  step: undefined,
  disabled: false
})

const emit = defineEmits<{
  (event: 'update:model-value', value: [number, number]): void
}>()

const bxRangeSliderRef = ref<HTMLDivElement>()
const bxRangeSliderTrackRef = ref<HTMLDivElement>()
const bxRangeSliderActiveTrackRef = ref<HTMLDivElement>()
const bxRangeSliderControl1Ref = ref<HTMLDivElement>()
const bxRangeSliderControl2Ref = ref<HTMLDivElement>()

const { x: x1, isMouseDown: isMouseDown1 } = useDrag(bxRangeSliderControl1Ref)
const { x: x2, isMouseDown: isMouseDown2 } = useDrag(bxRangeSliderControl2Ref)

const percentage1 = ref(0)
const percentage2 = ref(0)

const activeTrackStyles = ref<StyleValue>()
const controller1Styles = ref<StyleValue>()
const controller2Styles = ref<StyleValue>()

const percentage1ByStep = computed(() => {
  if (props.step) {
    const standardStep = props.step || 1
    return Math.round(percentage1.value / standardStep) * standardStep
  }

  return percentage1.value
})

const percentage2ByStep = computed(() => {
  if (props.step) {
    const standardStep = props.step || 1
    return Math.round(percentage2.value / standardStep) * standardStep
  }

  return percentage2.value
})

const rangeSliderClasses = computed(() => {
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

const percentageByValue = (value: number) => {
  const valueDiffMin = value - props.min
  const valueRange = props.max - props.min || 1

  return standardPercentage((valueDiffMin / valueRange) * 100)
}

const getPercentageByCoordinate = (coordinate: number) => {
  const track = bxRangeSliderTrackRef.value

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
  if (props.disabled) {
    return
  }

  const percentage = getPercentageByCoordinate(event.pageX)
  const diff1 = Math.abs(percentage - percentage1.value)
  const diff2 = Math.abs(percentage - percentage2.value)

  if (diff1 < diff2) {
    percentage1.value = percentage
  } else {
    percentage2.value = percentage
  }
}

watch(x1, newX => {
  if (!props.disabled) {
    percentage1.value = getPercentageByCoordinate(newX)
  }
})

watch(x2, newX => {
  if (!props.disabled) {
    percentage2.value = getPercentageByCoordinate(newX)
  }
})

watch(
  () => props.modelValue,
  newPropModelValue => {
    if (isMouseDown1.value || isMouseDown2.value) {
      return
    }

    if (newPropModelValue?.length) {
      const min = newPropModelValue[0]
      const max = newPropModelValue[1]

      const localValues = [percentage1.value, percentage2.value]
      localValues.sort((a, b) => a - b)
      const isEqual = CommonUtil.deepEqual(localValues, [min, max])
      if (!isEqual) {
        const x1 = percentageByValue(min)
        const x2 = percentageByValue(max)

        percentage1.value = x1
        percentage2.value = x2
      }
    }
  },
  { immediate: true }
)

watch(
  [percentage1ByStep, percentage2ByStep],
  ([newPercentage1, newPercentage2]) => {
    if (props.direction === 'vertical') {
      const value1 = valueEmit(Math.round(newPercentage1))
      const value2 = valueEmit(Math.round(newPercentage2))

      const diff = Math.abs(value2 - value1)
      const min = Math.min(value2, value1)

      activeTrackStyles.value = {
        width: `${diff}%`,
        left: `${min}%`
      }

      controller1Styles.value = {
        left: `${value1}%`
      }

      controller2Styles.value = {
        left: `${value2}%`
      }

      let value: [number, number] = [0, 0]
      if (value1 > value2) {
        value = [value2, value1]
      } else {
        value = [value1, value2]
      }

      emit('update:model-value', value)
    }
  },
  { immediate: true }
)

onMounted(() => {
  const track = bxRangeSliderTrackRef.value
  const activeTrack = bxRangeSliderActiveTrackRef.value

  if (track) {
    track.addEventListener('click', onTrackClick)
  }

  if (activeTrack) {
    activeTrack.addEventListener('click', onTrackClick)
  }
})

onBeforeUnmount(() => {
  const track = bxRangeSliderTrackRef.value
  const activeTrack = bxRangeSliderActiveTrackRef.value

  if (track) {
    track.removeEventListener('click', onTrackClick)
  }

  if (activeTrack) {
    activeTrack.removeEventListener('click', onTrackClick)
  }
})
</script>
