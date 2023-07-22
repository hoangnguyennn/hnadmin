<template>
  <div class="bx-table" :class="tableClasses">
    <div class="bx-table__header">
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="getHeaderKey(column.dataKey)">
              {{ column.title }}
            </th>
            <!-- <th class="bx-table__cell--scrollbar"></th> -->
          </tr>
        </thead>
      </table>
    </div>

    <div class="bx-table__body">
      <table>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td
              v-for="column in columns"
              :key="getCellKey(index, column.dataKey)"
            >
              <slot
                :name="getBodySlotName(column.dataKey)"
                :item="item"
                :index="index"
              >
                <template v-if="column.type === 'text'">
                  {{ item[column.dataKey] }}
                </template>

                <template v-if="column.type === 'image'">
                  <img :src="item[column.dataKey]" alt="" />
                </template>

                <template v-if="column.type === 'date'">
                  {{ formatFullDate(item[column.dataKey]) }}
                </template>
              </slot>

              <slot></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed } from 'vue'

import { formatFullDate } from '@hn/utils/date.util'

type DataType = 'text' | 'image' | 'date' | 'custom'

interface BxTableColumn {
  title: string
  dataKey: string
  width?: number
  type: DataType
}

export interface BxTableProps {
  height?: number
  striped?: boolean
  bordered?: boolean
  columns: BxTableColumn[]
  data: any[]
}

const props = withDefaults(defineProps<BxTableProps>(), {
  height: undefined,
  striped: undefined,
  bordered: undefined
})

const tableClasses = computed(() => {
  const classes: string[] = []

  if (props.striped) {
    classes.push('striped')
  }

  if (props.bordered) {
    classes.push('bordered')
  }

  return classes.join(' ')
})

const getHeaderKey = (dataKey: string) => {
  return `header-${dataKey}`
}

const getCellKey = (rowIndex: number, dataKey: string) => {
  return `body-${rowIndex}-${dataKey}`
}

const getBodySlotName = (dataKey: string) => {
  return `item.${dataKey}`
}
</script>
