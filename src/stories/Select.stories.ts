import type { Meta, StoryObj } from '@storybook/vue3'

import BxSelect from '@hn/components/common/BxSelect.vue'

const meta = {
  title: 'Example/Select',
  component: BxSelect,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { description: 'Hiển thị placeholder cho input' },
    items: {
      description:
        'Mảng gồm các object hoặc primitive. Khi sử dụng object, nó sẽ tìm kiếm theo title, value và disabled. Những cái này có thể thay đổi bằng thuộc tính `item-title`, `item-value` và `item-disabled`'
    },
    itemTitle: {
      description:
        'Thuộc tính này được sử dụng với thuộc tính `items`. Được sử dụng để hiển thị title'
    },
    itemValue: {
      description:
        'Thuộc tính này được sử dụng với thuộc tính `items`. Được sử dụng để tính toán value'
    },
    itemDisabled: {
      description:
        'Thuộc tính này được sử dụng với thuộc tính `items`. Được sử dụng để xác định item có bị disable'
    },
    disabled: {
      description: 'Nếu `true`, select sẽ không thể tương tác'
    },
    returnObject: {
      description:
        'Nếu `true`, object sẽ được emit thay vì dựa theo `itemValue`'
    },
    errorMessage: {
      description: 'Hiển thị lỗi của select'
    },
    modelValue: { description: 'Giá trị của select' },
    multiple: {
      description: 'Nếu `true`, có thể chọn nhiều giá trị'
    },
    hideSelected: {
      description: 'Nếu `true`, item được chọn sẽ ẩn khỏi danh sách'
    },
    closeOnSelect: {
      description: 'Nếu `true`, dropdown sẽ ẩn sau khi chọn item'
    }
  },
  args: {
    placeholder: 'Please select'
  }
} satisfies Meta<typeof BxSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [1, 2, 3]
  }
}

export const ObjectItems: Story = {
  args: {
    items: [
      { id: 1, name: 111 },
      { id: 2, name: 222 },
      { id: 3, name: 333 },
      { id: 4, name: 444 },
      { id: 5, name: 555 }
    ],
    itemTitle: 'name',
    itemValue: 'id'
  }
}

export const DisabledItem: Story = {
  args: {
    items: [
      { id: 1, name: 111 },
      { id: 2, name: 222 },
      { id: 3, name: 333 },
      { id: 4, name: 444 },
      { id: 5, name: 555, disabled: true }
    ],
    itemTitle: 'name',
    itemValue: 'id'
  }
}

export const Disabled: Story = {
  args: {
    items: [1, 2, 3],
    disabled: true
  }
}

export const Error: Story = {
  args: {
    items: [1, 2, 3],
    errorMessage: 'The select is required.'
  }
}

export const Multiple: Story = {
  args: {
    items: [1, 2, 3],
    multiple: true
  }
}
