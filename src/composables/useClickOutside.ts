import { Ref, onBeforeUnmount, onMounted } from 'vue'

// xử lý sự kiện click bên ngoài element
const useClickOutside = (
  elementRef: Ref<HTMLElement | undefined> | Ref<HTMLElement | undefined>[],
  callback: (event: MouseEvent) => void
) => {
  const onClick = (event: MouseEvent) => {
    if (elementRef instanceof Array) {
      const elements = elementRef.map(el => el.value)

      const isOutsideAll = elements.every(element => {
        if (element) {
          const isChildElement = element.contains(event.target as Node)
          const isElement = element === event.target

          return !isElement && !isChildElement
        } else {
          return true
        }
      })

      if (isOutsideAll) {
        callback(event)
      }

      return
    }

    const element = elementRef.value

    if (element) {
      const isChildElement = element.contains(event.target as Node)
      const isElement = element === event.target

      if (!isElement && !isChildElement) {
        callback(event)
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', onClick)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', onClick)
  })
}

export default useClickOutside
