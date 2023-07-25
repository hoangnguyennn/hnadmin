<template>
  <div class="bx-accordion" :class="accordionClasses">
    <div class="bx-accordion__title" @click.stop="onToggle">
      <slot name="title">{{ title }}</slot>
      <slot name="icon">
        <div class="bx-accordion__icon"></div>
      </slot>
    </div>
    <div ref="bxAccordionContentRef" class="bx-accordion__content">
      <div class="bx-accordion__content--content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface BxAccordionProps {
  title?: string
  modelValue?: boolean
}

const props = withDefaults(defineProps<BxAccordionProps>(), {
  title: undefined,
  modelValue: undefined
})

const emit = defineEmits<{
  (event: 'update:model-value', value: boolean): void
}>()

const isShow = ref(false)
const bxAccordionContentRef = ref<HTMLDivElement>()

const accordionClasses = computed(() => {
  const classes: string[] = []

  if (isShow.value) {
    classes.push('show')
  }

  return classes.join(' ')
})

const onToggle = () => {
  isShow.value = !isShow.value
}

watch(
  () => props.modelValue,
  newPropModelValue => {
    isShow.value = newPropModelValue
  },
  { immediate: true }
)

watch(
  isShow,
  newIsShow => {
    emit('update:model-value', newIsShow)
    const bxAccordionContent = bxAccordionContentRef.value
    if (bxAccordionContent) {
      if (newIsShow) {
        bxAccordionContent.style.maxHeight = ''
      } else {
        bxAccordionContent.style.maxHeight = `${bxAccordionContent.scrollHeight}px`
      }
    }
  },
  { flush: 'post' }
)
</script>
