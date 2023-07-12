import type { Meta, StoryObj } from '@storybook/vue3'

import BxButton from '@hn/components/common/BxButton.vue'

const meta = {
  title: 'Example/Button',
  component: BxButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'blue', 'green', 'red', 'yellow', 'gray']
    }
  },
  args: {
    default: 'Click me',
    variant: 'blue'
  }
} satisfies Meta<typeof BxButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Outlined: Story = {
  args: {
    outlined: true
  }
}

export const Rounded: Story = {
  args: {
    rounded: true
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}
