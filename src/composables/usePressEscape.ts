import { KEYBOARD_CODE } from '@hn/constants'
import { onBeforeUnmount, onMounted } from 'vue'

const usePressEscape = (callback: (event: KeyboardEvent) => void) => {
  const onPress = (event: KeyboardEvent) => {
    if (event.code !== KEYBOARD_CODE.ESCAPE) return

    callback(event)
  }

  onMounted(() => {
    console.log('mounted')
    document.addEventListener('keydown', onPress)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onPress)
  })
}

export default usePressEscape
