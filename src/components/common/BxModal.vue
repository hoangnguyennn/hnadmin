<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="open" class="bx-modal">
        <div
          ref="bxModalContentRef"
          class="bx-modal__content"
          :style="{ width: `${width}px` }"
        >
          <div class="bx-modal__header">
            <slot name="header">
              <slot name="title">
                <div class="bx-modal__title">{{ title }}</div>
              </slot>
              <div
                class="bx-modal__close-icon"
                :tabindex="0"
                @keydown="onIconKeyPress"
                @click="onClose"
              ></div>
            </slot>
          </div>
          <div class="bx-modal__body">
            <slot></slot>
          </div>
          <div class="bx-modal__footer">
            <slot name="footer">
              <div class="bx-modal__actions">
                <slot name="actions">
                  <slot name="cancelBtn">
                    <bx-button variant="gray" outlined @click="onCancel">
                      {{ cancelText }}
                    </bx-button>
                  </slot>
                  <slot name="submitBtn">
                    <bx-button @click="onSubmit">{{ okText }}</bx-button>
                  </slot>
                </slot>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BxButton from './BxButton.vue'
import useClickOutside from '@hn/composables/useClickOutside'
import usePressEscape from '@hn/composables/usePressEscape'
import { KEYBOARD_CODE } from '@hn/constants'

export interface BxModalProps {
  width?: number
  title?: string
  okText?: string
  cancelText?: string
  modelValue?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
}

const props = withDefaults(defineProps<BxModalProps>(), {
  width: 500,
  title: 'Modal',
  okText: 'OK',
  cancelText: 'Cancel',
  closeOnClickModal: true,
  closeOnPressEscape: true
})

const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'submit'): void
  (event: 'update:model-value', value: boolean): void
}>()

const bxModalContentRef = ref<HTMLDivElement>()

const open = computed({
  get: () => props.modelValue,
  set: value => emit('update:model-value', value)
})

const onCancel = () => {
  emit('cancel')
  onClose()
}

const onSubmit = () => {
  emit('submit')
  onClose()
}

const onClose = () => {
  open.value = false
}

const onIconKeyPress = (event: KeyboardEvent) => {
  if (event.code === KEYBOARD_CODE.ENTER) {
    onClose()
  }
}

usePressEscape(() => {
  if (props.closeOnPressEscape) {
    onClose()
  }
})

useClickOutside(bxModalContentRef, () => {
  if (props.closeOnClickModal) {
    onClose()
  }
})
</script>
