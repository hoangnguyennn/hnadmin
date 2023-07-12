<template>
  <div
    ref="bxSelectRef"
    class="bx-select"
    :class="selectClasses"
    :tabindex="disabled ? -1 : 0"
  >
    <div
      ref="bxSelectPlaceholderRef"
      class="bx-select--placeholder"
      @click="onToggle"
    >
      <div v-if="selectionPlaceholder" class="selection">
        {{ selectionPlaceholder }}
      </div>
      <div v-else class="placeholder">{{ placeholder }}</div>

      <div class="caret"></div>
    </div>
    <div class="bx-select--error">{{ errorMessage }}</div>
    <Teleport to="#modal">
      <div
        v-if="isOpen"
        ref="bxSelectListRef"
        class="bx-select--list"
        :style="dropdownStyles"
      >
        <div
          v-for="(item, index) in displayItems"
          :key="index"
          class="bx-select--item"
          :class="getItemClasses(item)"
          @click="onSelect(item)"
        >
          <span>{{ getItemTitle(item) }}</span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import useClickOutside from '@hn/composables/useClickOutside'
import useDropdownPosition from '@hn/composables/useDropdownPosition'
import CommonUtil from '@hn/utils/common.util'
import { StyleValue, computed, ref, watch } from 'vue'

interface BxSelectProps {
  placeholder?: string
  items: any[]
  itemTitle?: string
  itemValue?: string
  itemDisabled?: string
  disabled?: boolean
  returnObject?: boolean
  errorMessage?: string
  modelValue?: any | any[]
  multiple?: boolean
  hideSelected?: boolean
  closeOnSelect?: boolean
}

const props = withDefaults(defineProps<BxSelectProps>(), {
  placeholder: undefined,
  items: () => [],
  itemTitle: 'value',
  itemValue: 'id',
  itemDisabled: 'disabled',
  disabled: false,
  returnObject: false,
  errorMessage: undefined,
  modelValue: undefined,
  multiple: false,
  hideSelected: false,
  closeOnSelect: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const isOpen = ref(false)
const selections = ref<any[]>([])

const bxSelectRef = ref<HTMLDivElement>()
const bxSelectPlaceholderRef = ref<HTMLDivElement>()
const bxSelectListRef = ref<HTMLDivElement>()

useClickOutside([bxSelectRef, bxSelectListRef], () => {
  isOpen.value = false
})

const { top, left, width } = useDropdownPosition(
  bxSelectPlaceholderRef,
  bxSelectListRef
)

const dropdownStyles = computed<StyleValue>(() => {
  return {
    left: `${left.value}px`,
    top: `${top.value}px`,
    width: `${width.value}px`
  }
})

const propSelections = computed<any[]>(() => {
  if (props.multiple) {
    const modelValue = props.modelValue ?? []
    return modelValue.map((itemValue: any) => {
      return props.items.find(item => {
        return CommonUtil.deepEqual(getItemValue(item), itemValue)
      })
    })
  }

  const modelValue = props.modelValue

  if (modelValue) {
    const matchedItem = props.items.find(item => {
      return CommonUtil.deepEqual(getItemValue(item), modelValue)
    })

    return [matchedItem]
  }

  return []
})

const displayItems = computed(() => {
  if (props.hideSelected) {
    return props.items.filter(item => !selections.value.some(s => s === item))
  }

  return props.items
})

const selectionPlaceholder = computed(() => {
  return selections.value.map(getItemTitle).join(', ')
})

const selectClasses = computed(() => {
  const classes: string[] = []

  if (props.disabled) {
    classes.push('bx-select--disabled')
  }

  if (isOpen.value) {
    classes.push('show')
  }

  if (props.errorMessage) {
    classes.push('error')
  }

  return classes.join(' ')
})

const getItemValue = (item: any) => {
  if (props.returnObject) {
    return item
  }

  if (typeof item !== 'object') {
    return item
  }

  const value = item[props.itemValue]
  return value ?? item
}

const getItemTitle = (item: any) => {
  if (typeof item !== 'object') {
    return item
  }

  return item[props.itemTitle]
}

const isSelectedItem = (item: any) => {
  return selections.value.some(s => CommonUtil.deepEqual(item, s))
}

const isDisabledItem = (item: any) => {
  if (props.itemDisabled) {
    return item[props.itemDisabled]
  }

  return false
}

const getItemClasses = (item: any) => {
  const classes: string[] = []

  if (isDisabledItem(item)) {
    classes.push('disabled')
  }

  if (isSelectedItem(item)) {
    classes.push('selected')
  }

  return classes.join(' ')
}

const emitModelValue = () => {
  if (props.multiple) {
    emit('update:modelValue', selections.value.map(getItemValue))
  } else {
    emit('update:modelValue', getItemValue(selections.value[0]))
  }
}

const onToggle = () => {
  if (props.disabled) {
    return
  }

  isOpen.value = !isOpen.value
}

const onSelect = (item: any) => {
  if (isDisabledItem(item)) {
    return
  }

  if (selections.value.includes(item)) {
    selections.value = selections.value.filter(s => s !== item)
  } else {
    if (props.multiple) {
      selections.value.push(item)
    } else {
      selections.value = [item]
    }
  }

  if (!props.multiple && props.closeOnSelect) {
    isOpen.value = false
    bxSelectRef.value?.focus()
  }

  emitModelValue()
}

watch(
  propSelections,
  newPropSelections => {
    if (!CommonUtil.deepEqual(newPropSelections, selections.value)) {
      selections.value = newPropSelections
    }
  },
  { immediate: true }
)
</script>
