import { BOUNDING_SIZE, DROPDOWN_SPACING_WITH_PARENT } from '@hn/constants'
import { Ref, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const useDropdownPosition = (
  parentElementRef: Ref<HTMLElement | undefined>,
  dropdownElementRef: Ref<HTMLElement | undefined>
) => {
  const top = ref(0)
  const left = ref(0)
  const width = ref(0)

  const calculateDropdownPosition = () => {
    const parentElement = parentElementRef.value
    const dropdownElement = dropdownElementRef.value

    if (parentElement && dropdownElement) {
      const parentElementRect = parentElement.getBoundingClientRect()
      const dropdownElementRect = dropdownElement.getBoundingClientRect()

      let dropdownTop = parentElementRect.bottom + DROPDOWN_SPACING_WITH_PARENT
      const dropdownBottom = dropdownTop + dropdownElementRect.height

      const viewportHeight = window.innerHeight

      if (dropdownBottom > viewportHeight - BOUNDING_SIZE) {
        // show dropdown on top of the parent element
        if (parentElementRect.top > viewportHeight) {
          dropdownTop =
            viewportHeight -
            DROPDOWN_SPACING_WITH_PARENT -
            dropdownElementRect.height
        } else {
          dropdownTop =
            parentElementRect.top -
            DROPDOWN_SPACING_WITH_PARENT -
            dropdownElementRect.height
        }
      }

      if (dropdownTop < BOUNDING_SIZE) {
        dropdownTop = BOUNDING_SIZE
      }

      top.value = dropdownTop
      left.value = parentElementRect.left
      width.value = parentElementRect.width
    }
  }

  watch(
    dropdownElementRef,
    () => {
      const dropdownElement = dropdownElementRef.value

      if (dropdownElement) {
        calculateDropdownPosition()
      }
    },
    { flush: 'post', immediate: true }
  )

  onMounted(() => {
    document.addEventListener('scroll', calculateDropdownPosition)
    window.addEventListener('resize', calculateDropdownPosition)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('scroll', calculateDropdownPosition)
    window.removeEventListener('resize', calculateDropdownPosition)
  })

  return { top, left, width }
}

export default useDropdownPosition
