import { Ref, onBeforeUnmount, onMounted, ref } from 'vue'

// trả về tọa độ x, y của con trỏ khi kéo element (mousedown + mousemove)
const useDrag = (elementRef: Ref<HTMLElement | undefined>) => {
  const isMouseDown = ref(false)
  const x = ref(0)
  const y = ref(0)

  const onMouseDown = () => {
    isMouseDown.value = true
  }

  const onMouseMove = (event: MouseEvent) => {
    if (!isMouseDown.value) {
      return
    }

    x.value = event.pageX
    y.value = event.pageY
  }

  const onMouseUp = () => {
    isMouseDown.value = false
  }

  onMounted(() => {
    const element = elementRef.value

    if (element) {
      element.addEventListener('mousedown', onMouseDown)
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }
  })

  onBeforeUnmount(() => {
    const element = elementRef.value

    if (element) {
      element.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  })

  return { x, y, isMouseDown }
}

export default useDrag
