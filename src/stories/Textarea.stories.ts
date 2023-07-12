import type { Meta, StoryObj } from '@storybook/vue3'

import BxTextarea from '@hn/components/common/BxTextarea.vue'

const meta = {
  title: 'Example/Textarea',
  component: BxTextarea,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    placeholder: 'Please input'
  }
} satisfies Meta<typeof BxTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Pleaceholder: Story = {
  args: {
    placeholder: 'Please input'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const Error: Story = {
  args: {
    errorMessage: 'The input is required.'
  }
}

export const Fixed: Story = {
  args: {
    rows: 10,
    fixed: true
  }
}

export const AutoSize: Story = {
  args: {
    rows: 4,
    autoSize: true
  }
}
