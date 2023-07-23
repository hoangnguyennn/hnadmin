<template>
  <div class="bx-pagination">
    <div class="bx-pagination__pager">
      <div
        class="bx-pagination__control bx-pagination__control--prev"
        :class="{ disabled: _currentPage === 1 }"
        @click="onGoToPrev"
      ></div>

      <div
        v-for="page in renderedPages"
        :key="page"
        class="bx-pagination__item"
        :class="{ active: page === _currentPage, skip: isSkipPage(page) }"
        @click="onChangePage(page)"
      >
        {{ isSkipPage(page) ? '...' : page }}
      </div>

      <div
        class="bx-pagination__control bx-pagination__control--next"
        :class="{ disabled: _currentPage === numberOfPages }"
        @click="onGoToNext"
      ></div>
    </div>
    <div v-if="pageSizes?.length" class="bx-pagination__sizes">
      <bx-select
        v-model="_pageSize"
        :items="pageSizeItems"
        item-value="value"
        item-title="title"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import BxSelect from './BxSelect.vue'

export interface BxPaginationProps {
  currentPage: number
  pageSize: number
  total: number
  pageSizes?: number[]
  disabled?: boolean
}

const props = withDefaults(defineProps<BxPaginationProps>(), {
  pageSizes: undefined,
  disabled: undefined
})

const emit = defineEmits<{
  (event: 'update:current-page', value: number): void
  (event: 'update:page-size', value: number): void
}>()

const _currentPage = computed({
  get: () => props.currentPage,
  set: value => emit('update:current-page', value)
})

const _pageSize = computed({
  get: () => props.pageSize,
  set: value => {
    emit('update:page-size', value)
    _currentPage.value = 1
  }
})

const pageSizeItems = computed(() => {
  return props.pageSizes?.map(pageSize => {
    return {
      value: pageSize,
      title: `${pageSize}/page`
    }
  })
})

const numberOfPages = computed(() => {
  return Math.ceil(props.total / props.pageSize)
})

const renderedPages = computed(() => {
  if (numberOfPages.value < 7) {
    return Array.from({ length: numberOfPages.value }, (_, index) => index + 1)
  }

  if (_currentPage.value <= 4) {
    return [1, 2, 3, 4, 5, -2, numberOfPages.value]
  }

  if (_currentPage.value >= numberOfPages.value - 3) {
    return [
      1,
      -1,
      numberOfPages.value - 4,
      numberOfPages.value - 3,
      numberOfPages.value - 2,
      numberOfPages.value - 1,
      numberOfPages.value
    ]
  }

  return [
    1,
    -1,
    _currentPage.value - 1,
    _currentPage.value,
    _currentPage.value + 1,
    -2,
    numberOfPages.value
  ]
})

watch(
  renderedPages,
  newRenderedPages => {
    console.log(newRenderedPages)
  },
  { immediate: true }
)

const onChangePage = (page: number) => {
  if (!isSkipPage(page)) {
    _currentPage.value = page
  }
}

const onGoToPrev = () => {
  if (_currentPage.value > 1) {
    _currentPage.value -= 1
  }
}

const onGoToNext = () => {
  if (_currentPage.value < numberOfPages.value) {
    _currentPage.value += 1
  }
}

const isSkipPage = (page: number) => {
  return page < 1
}
</script>
