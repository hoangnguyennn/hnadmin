<template>
  <ul class="bx-menu">
    <template v-for="item in items" :key="item.id">
      <li
        v-if="item.childrens?.length"
        class="bx-menu__submenu"
        :class="{ show: isOpenElement === item.id }"
        style="--level: 1"
      >
        <div class="bx-menu__title" @click.stop="setOpenElement(item.id)">
          {{ item.title }}
          <div class="bx-menu__icon"></div>
        </div>

        <ul ref="bxSubmenuRefs" class="bx-menu" :data-id="item.id">
          <li
            v-for="child in item.childrens"
            :key="child.id"
            class="bx-menu__item"
            :class="{ active: activeItem === child.id }"
            style="--level: 2"
            @click.stop="onSelect(child.id)"
          >
            <router-link v-if="child.to" :to="child.to" class="bx-menu__link">
              {{ child.title }}
            </router-link>
            <template v-else>{{ child.title }}</template>
          </li>
        </ul>
      </li>

      <li
        v-else
        class="bx-menu__item"
        :class="{ active: activeItem === item.id }"
        style="--level: 1"
        @click.stop="onSelect(item.id)"
      >
        <router-link v-if="item.to" :to="item.to" class="bx-menu__link">
          {{ item.title }}
        </router-link>
        <template v-else>{{ item.title }}</template>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouteLocationRaw } from 'vue-router'

interface BxMenuItem {
  id: string
  title: string
  to?: RouteLocationRaw
  childrens?: BxMenuItem[]
}

export interface BxMenuProps {
  items: BxMenuItem[]
  active?: BxMenuItem['id']
}

const props = withDefaults(defineProps<BxMenuProps>(), {
  items: () => [],
  active: undefined
})

const emit = defineEmits<{
  (event: 'update:active', value?: BxMenuItem['id']): void
}>()

const activeItem = ref<BxMenuItem['id']>()

const isOpenElement = ref<string>()
const bxSubmenuRefs = ref<HTMLDivElement[]>([])

const setOpenElement = (itemId: BxMenuItem['id']) => {
  if (isOpenElement.value === itemId) {
    isOpenElement.value = undefined
  } else {
    isOpenElement.value = itemId
  }
}

const onSelect = (itemId: BxMenuItem['id']) => {
  activeItem.value = itemId
}

watch(
  () => props.active,
  newPropActive => {
    if (newPropActive) {
      activeItem.value = newPropActive
    }
  },
  { immediate: true }
)

watch(
  isOpenElement,
  newIsOpenElement => {
    const bxSubmenus = bxSubmenuRefs.value

    bxSubmenus.forEach(bxSubmenu => {
      const matchedMenu = bxSubmenu.dataset.id === newIsOpenElement
      if (matchedMenu) {
        bxSubmenu.style.maxHeight = `${bxSubmenu.scrollHeight}px`
      } else {
        bxSubmenu.style.maxHeight = ''
      }
    })
  },
  { flush: 'post' }
)

watch(activeItem, newActiveItem => {
  emit('update:active', newActiveItem)
})
</script>
