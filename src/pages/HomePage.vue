<script setup lang="ts">
import { ref } from 'vue'

import BxInput from '@hn/components/common/BxInput.vue'
import BxTextarea from '@hn/components/common/BxTextarea.vue'
import BxButton from '@hn/components/common/BxButton.vue'
import BxSelect from '@hn/components/common/BxSelect.vue'
import BxCheckbox from '@hn/components/common/BxCheckbox.vue'
import BxSwitch from '@hn/components/common/BxSwitch.vue'
import BxRadio from '@hn/components/common/BxRadio.vue'
import BxSlider from '@hn/components/common/BxSlider.vue'
import BxRangeSlider from '@hn/components/common/BxRangeSlider.vue'
import BxAccordion from '@hn/components/common/BxAccordion.vue'
import BxMenu, { BxMenuProps } from '@hn/components/common/BxMenu.vue'
import BxTable, { BxTableProps } from '@hn/components/common/BxTable.vue'
import BxBadge from '@hn/components/common/BxBadge.vue'

const radio = ref()
const slider = ref(50)
const slider2 = ref(50)
const rangeSlider = ref<[number, number]>([20, 60])
const items: BxMenuProps['items'] = [
  {
    id: '1',
    title: 'Navigator 1',
    childrens: [
      { id: '1_1', title: 'Item 1' },
      { id: '1_2', title: 'Item 2' },
      { id: '1_3', title: 'Item 3', to: '/' }
    ]
  },
  {
    id: '2',
    title: 'Navigator 2',
    childrens: [
      { id: '2_1', title: 'Item 1' },
      { id: '2_2', title: 'Item 2' },
      { id: '2_3', title: 'Item 3', to: '/' }
    ]
  },
  {
    id: '3',
    title: 'Navigator 3',
    childrens: [
      { id: '3_1', title: 'Item 1' },
      { id: '3_2', title: 'Item 2' },
      { id: '3_3', title: 'Item 3', to: '/' }
    ]
  },
  {
    id: '4',
    title: 'Navigator 4',
    to: '/'
  }
]

const columns: BxTableProps['columns'] = [
  {
    title: 'Mã bài đăng',
    dataKey: 'id',
    type: 'text'
  },
  {
    title: 'Tiêu đề',
    dataKey: 'title',
    type: 'text'
  },
  {
    title: 'Người đăng',
    dataKey: 'user',
    type: 'text'
  },
  {
    title: 'Ngày tạo',
    dataKey: 'createdAt',
    type: 'date'
  },
  {
    title: 'Ngày cập nhật',
    dataKey: 'updatedAt',
    type: 'date'
  },
  {
    title: 'Hành động',
    dataKey: 'action',
    type: 'custom'
  }
]

interface SampleRecord {
  id: string
  title: string
  user: string
  createdAt: Date
  updatedAt: Date
}

const data: SampleRecord[] = [
  {
    id: '#001',
    title: 'Nhà cho thuê',
    user: 'Nguyễn Hoàng',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '#001',
    title: 'Nhà cho thuê',
    user: 'Nguyễn Hoàng',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '#001',
    title: 'Nhà cho thuê',
    user: 'Nguyễn Hoàng',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '#001',
    title: 'Nhà cho thuê',
    user: 'Nguyễn Hoàng',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '#001',
    title: 'Nhà cho thuê',
    user: 'Nguyễn Hoàng',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '#001',
    title: 'Nhà cho thuê',
    user: 'Nguyễn Hoàng',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '#001',
    title: 'Nhà cho thuê',
    user: 'Nguyễn Hoàng',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '#001',
    title: 'Nhà cho thuê',
    user: 'Nguyễn Hoàng',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '#001',
    title: 'Nhà cho thuê',
    user: 'Nguyễn Hoàng',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '#001',
    title: 'Nhà cho thuê',
    user: 'Nguyễn Hoàng',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
</script>

<template>
  <div class="p-10">
    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Input</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <h4>Default</h4>
        <bx-input placeholder="Please input" />

        <h4>Disabled</h4>
        <bx-input placeholder="Please input" disabled />

        <h4>Error</h4>
        <bx-input
          placeholder="Please input"
          error-message="The input is required."
        />
      </div>
    </div>

    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Textarea</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <h4>Default</h4>
        <bx-textarea placeholder="Please input" />

        <h4>Disabled</h4>
        <bx-textarea placeholder="Please input" disabled />

        <h4>Error</h4>
        <bx-textarea
          placeholder="Please input"
          error-message="The input is required."
        />

        <h4>Fixed</h4>
        <bx-textarea placeholder="Please input" fixed :rows="7" />

        <h4>Auto size</h4>
        <bx-textarea placeholder="Please input" auto-size />
      </div>
    </div>

    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Button</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <h4>Default</h4>
        <div style="display: flex; gap: 10px">
          <bx-button variant="blue">Click me</bx-button>
          <bx-button variant="green">Click me</bx-button>
          <bx-button variant="red">Click me</bx-button>
          <bx-button variant="yellow">Click me</bx-button>
          <bx-button variant="gray">Click me</bx-button>
        </div>

        <h4>Outlined</h4>
        <div style="display: flex; gap: 10px">
          <bx-button outlined variant="blue">Click me</bx-button>
          <bx-button outlined variant="green">Click me</bx-button>
          <bx-button outlined variant="red">Click me</bx-button>
          <bx-button outlined variant="yellow">Click me</bx-button>
          <bx-button outlined variant="gray">Click me</bx-button>
        </div>

        <h4>Rounded</h4>
        <div style="display: flex; gap: 10px">
          <bx-button rounded variant="blue">Click me</bx-button>
          <bx-button rounded variant="green">Click me</bx-button>
          <bx-button rounded variant="red">Click me</bx-button>
          <bx-button rounded variant="yellow">Click me</bx-button>
          <bx-button rounded variant="gray">Click me</bx-button>
        </div>

        <h4>Disabled</h4>
        <div style="display: flex; gap: 10px">
          <bx-button disabled variant="blue">Click me</bx-button>
          <bx-button disabled variant="green">Click me</bx-button>
          <bx-button disabled variant="red">Click me</bx-button>
          <bx-button disabled variant="yellow">Click me</bx-button>
          <bx-button disabled variant="gray">Click me</bx-button>
        </div>

        <h4>Disabled + outlined</h4>
        <div style="display: flex; gap: 10px">
          <bx-button disabled outlined variant="blue">Click me</bx-button>
          <bx-button disabled outlined variant="green">Click me</bx-button>
          <bx-button disabled outlined variant="red">Click me</bx-button>
          <bx-button disabled outlined variant="yellow">Click me</bx-button>
          <bx-button disabled outlined variant="gray">Click me</bx-button>
        </div>
      </div>
    </div>

    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Select</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <h4>Default</h4>
        <bx-select :items="[1, 2, 3, 4, 5]" placeholder="Please select" />

        <h4>Disabled</h4>
        <bx-select
          :items="[1, 2, 3, 4, 5]"
          placeholder="Please select"
          disabled
        />

        <h4>Disabled item</h4>
        <bx-select
          :items="[
            { id: 1, value: 'Option 1' },
            { id: 2, value: 'Option 2' },
            { id: 3, value: 'Option 3' },
            { id: 4, value: 'Option 4' },
            { id: 5, value: 'Option 5', disabled: true }
          ]"
          placeholder="Please select"
        />

        <h4>Multiple</h4>
        <bx-select
          :items="[
            { id: 1, value: 'Option 1' },
            { id: 2, value: 'Option 2' },
            { id: 3, value: 'Option 3' },
            { id: 4, value: 'Option 4' },
            { id: 5, value: 'Option 5', disabled: true }
          ]"
          placeholder="Please select"
          multiple
        />

        <h4>Error</h4>
        <bx-select
          :items="[1, 2, 3, 4, 5]"
          placeholder="Please select"
          error-message="The select is required."
        />
      </div>
    </div>

    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Checkbox</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <h4>Default</h4>
        <bx-checkbox />

        <h4>With label</h4>
        <bx-checkbox label="Option 1" />
        <bx-checkbox label="Option 2" />

        <h4>Disabled</h4>
        <bx-checkbox label="Option 1" disabled />
        <bx-checkbox label="Option 2" disabled :model-value="true" />
      </div>
    </div>

    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Switch</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <h4>Default</h4>
        <bx-switch />

        <h4>With label</h4>
        <bx-switch label="Option 1" />
        <bx-switch label="Option 2" />

        <h4>Disabled</h4>
        <bx-switch label="Option 1" disabled />
        <bx-switch label="Option 2" disabled :model-value="true" />
      </div>
    </div>

    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Radio</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <h4>Default</h4>
        <bx-radio v-model="radio" name="name" value="Hoang" />
        <bx-radio v-model="radio" name="name" value="Huy" />

        <h4>With label</h4>
        <bx-radio name="age" label="Option 1" />
        <bx-radio name="age" label="Option 2" />

        <h4>Disabled</h4>
        <bx-radio label="Option 1" disabled />
        <bx-radio label="Option 2" disabled :model-value="true" />
      </div>
    </div>

    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Slider</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <p>{{ slider }}</p>
        <bx-slider v-model="slider" />

        <bx-slider v-model="slider2" disabled />
      </div>
    </div>

    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Range slider</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <p>{{ rangeSlider }}</p>
        <bx-range-slider v-model="rangeSlider" />

        <bx-range-slider v-model="rangeSlider" disabled />
      </div>
    </div>

    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Accordion</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <bx-accordion title="Section">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </bx-accordion>
      </div>
    </div>

    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Menu</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <bx-menu :items="items"></bx-menu>
      </div>
    </div>

    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Table</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <bx-table :columns="columns" :data="data">
          <template #[`item.action`]="{ item }">
            <div style="display: flex; gap: 10px">
              <router-link :to="`/${item.id}`">Xem trên web</router-link>
              <router-link to="/">Sửa</router-link>
              <router-link to="/">Xóa</router-link>
            </div>
          </template>
        </bx-table>
      </div>
    </div>

    <div class="mt-5 py-5" style="border-top: 3px solid">
      <h2>Badge</h2>

      <div style="display: flex; flex-direction: column; gap: 20px">
        <h4>Default</h4>
        <div style="display: flex; gap: 10px">
          <bx-badge variant="blue">99+</bx-badge>
          <bx-badge variant="green">99+</bx-badge>
          <bx-badge variant="red">99+</bx-badge>
          <bx-badge variant="yellow">99+</bx-badge>
          <bx-badge variant="gray">99+</bx-badge>
        </div>

        <h4>Rounded</h4>
        <div style="display: flex; gap: 10px">
          <bx-badge rounded variant="blue">99+</bx-badge>
          <bx-badge rounded variant="green">99+</bx-badge>
          <bx-badge rounded variant="red">99+</bx-badge>
          <bx-badge rounded variant="yellow">99+</bx-badge>
          <bx-badge rounded variant="gray">99+</bx-badge>
        </div>

        <h4>Dot</h4>
        <div style="display: flex; gap: 10px">
          <bx-badge dot variant="blue">99+</bx-badge>
          <bx-badge dot variant="green">99+</bx-badge>
          <bx-badge dot variant="red">99+</bx-badge>
          <bx-badge dot variant="yellow">99+</bx-badge>
          <bx-badge dot variant="gray">99+</bx-badge>
        </div>
      </div>
    </div>
  </div>
</template>
