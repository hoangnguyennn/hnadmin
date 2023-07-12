import type { Meta, StoryObj } from '@storybook/vue3'

import BxCheckbox from '@hn/components/common/BxCheckbox.vue'

const meta = {
  title: 'Example/Checkbox',
  component: BxCheckbox,
  tags: ['autodocs'],
  argTypes: {
    id: { description: 'Id của checkbox' },
    label: { description: 'Label của checkbox' },
    value: {
      description:
        'Giá trị sử dụng khi toggle checkbox. Nếu không truyền vào, checkbox sẽ có giá trị `true`, `false`'
    },
    modelValue: { description: 'Giá trị của checkbox' },
    disabled: { description: 'Nếu `true`, checkbox sẽ không thể tương tác' }
  },
  args: {}
} satisfies Meta<typeof BxCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const WithLabel: Story = {
  args: {
    label: 'Option 1'
  }
}

export const Disabled: Story = {
  args: {
    label: 'Option 1',
    disabled: true
  }
}
