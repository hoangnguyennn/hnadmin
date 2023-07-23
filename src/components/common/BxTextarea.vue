<template>
  <div class="bx-textarea" :class="inputClasses">
    <textarea
      ref="textareaRef"
      v-model="modelValue"
      type="text"
      :rows="rows"
      class="bx-textarea__control"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleChangeHeight"
    ></textarea>

    <Transition name="fade">
      <div v-if="errorMessage" class="bx-textarea__error">
        {{ errorMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import CommonUtil from '@hn/utils/common.util'
import { computed, onMounted, ref } from 'vue'

interface BxTextareaProps {
  placeholder?: string
  disabled?: boolean
  errorMessage?: string
  modelValue?: string
  rows?: number
  maxRows?: number
  minRows?: number
  fixed?: boolean
  autoSize?: boolean
}

const props = withDefaults(defineProps<BxTextareaProps>(), {
  placeholder: undefined,
  disabled: false,
  errorMessage: undefined,
  modelValue: undefined,
  rows: 2,
  maxRows: undefined,
  minRows: undefined,
  fixed: false,
  autoSize: false
})

const emit = defineEmits<{
  (e: 'update:model-value', value: BxTextareaProps['modelValue']): void
}>()

const textareaRef = ref<HTMLTextAreaElement>()

const modelValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:model-value', value)
})

const inputClasses = computed(() => {
  const classes: string[] = []

  if (props.disabled) {
    classes.push('disabled')
    classes.push('fixed')
  }

  if (props.errorMessage) {
    classes.push('error')
  }

  if (props.fixed || props.autoSize) {
    classes.push('fixed')
  }

  return [...new Set(classes)].join(' ')
})

const handleChangeHeight = () => {
  const textarea = textareaRef.value
  if (props.autoSize && textarea) {
    textarea.style.height = 'auto'

    const styles = getComputedStyle(textarea)
    const {
      lineHeight,
      paddingTop,
      paddingBottom,
      borderTopWidth,
      borderBottomWidth
    } = styles

    const lineHeightNum = CommonUtil.getStyleValue(lineHeight)
    const paddingTopNum = CommonUtil.getStyleValue(paddingTop)
    const paddingBottomNum = CommonUtil.getStyleValue(paddingBottom)
    const borderTopWidthNum = CommonUtil.getStyleValue(borderTopWidth)
    const borderBottomWidthNum = CommonUtil.getStyleValue(borderBottomWidth)

    const totalPadding = paddingTopNum + paddingBottomNum
    const totalBorder = borderTopWidthNum + borderBottomWidthNum

    const totalHeight = textarea.scrollHeight - totalPadding
    let rows = Math.floor(totalHeight / lineHeightNum)

    if (props.minRows && rows < props.minRows) {
      rows = props.minRows
    }

    if (props.maxRows && rows > props.maxRows) {
      rows = props.maxRows
    }

    const newHeight = rows * lineHeightNum + totalPadding + totalBorder
    textarea.style.height = `${newHeight}px`
  }
}

onMounted(() => {
  const observer = new ResizeObserver(handleChangeHeight)
  if (textareaRef.value) {
    observer.observe(textareaRef.value)
  }
})
</script>
