import { Ref, onBeforeUnmount, onMounted, ref } from 'vue'

// trả về tọa độ x, y của con trỏ khi kéo element (mousedown + mousemove)
const useDrag = (elementRef: Ref<HTMLElement | undefined>) => {
  const isMouseDown = ref(false)
  const x = ref(0)
  const y = ref(0)

  const handleMouseDown = () => {
    isMouseDown.value = true
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isMouseDown.value) {
      return
    }

    x.value = event.pageX
    y.value = event.pageY
  }

  const handleMouseUp = () => {
    isMouseDown.value = false
  }

  onMounted(() => {
    const element = elementRef.value

    if (element) {
      element.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  })

  onBeforeUnmount(() => {
    const element = elementRef.value

    if (element) {
      element.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  })

  return { x, y, isMouseDown }
}

export default useDrag
