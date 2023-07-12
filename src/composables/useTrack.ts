import { Ref, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import useDrag from './useDrag'

// trả về vị trị của controller dựa trên vị trí track
// từ 0 -> 1
// 0: controller đứng ở đầu track
// 1: controller đứng ở cuối track
const useTrack = (
  trackRef: Ref<HTMLElement | undefined>,
  controllerRef: Ref<HTMLElement | undefined>
) => {
  const { x, isMouseDown } = useDrag(controllerRef)

  const percentageX = ref(0)

  const handleClick = (event: MouseEvent) => {
    const track = trackRef.value

    if (track) {
      const trackRect = track.getBoundingClientRect()
      const trackXStart = trackRect.left
      const trackXEnd = trackRect.right

      const mouseX = event.pageX - trackXStart
      const trackX = trackXEnd - trackXStart

      const percentage = (mouseX / trackX) * 100
      percentageX.value = standardPercentage(percentage)
      return
    }

    percentageX.value = 0
  }

  const standardPercentage = (percentage: number) => {
    if (percentage < 0) {
      // nhỏ hơn 0%
      return 0
    }

    if (percentage > 100) {
      // lớn hơn 100%
      return 100
    }

    return percentage
  }

  watch(x, newX => {
    const track = trackRef.value

    if (track) {
      const trackRect = track.getBoundingClientRect()
      const trackXStart = trackRect.left
      const trackXEnd = trackRect.right

      const controllerX = newX - trackXStart
      const trackX = trackXEnd - trackXStart

      const percentage = (controllerX / trackX) * 100
      percentageX.value = standardPercentage(percentage)
      return
    }

    percentageX.value = 0
  })

  onMounted(() => {
    const track = trackRef.value

    if (track) {
      track.addEventListener('click', handleClick)
    }
  })

  onBeforeUnmount(() => {
    const track = trackRef.value

    if (track) {
      track.removeEventListener('click', handleClick)
    }
  })

  return { percentageX, isMouseDown }
}

export default useTrack
