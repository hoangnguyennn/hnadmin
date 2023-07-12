import type { Meta, StoryObj } from '@storybook/vue3'

import BxInput from '@hn/components/common/BxInput.vue'

const meta = {
  title: 'Example/Input',
  component: BxInput,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    placeholder: 'Please input'
  }
} satisfies Meta<typeof BxInput>

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
