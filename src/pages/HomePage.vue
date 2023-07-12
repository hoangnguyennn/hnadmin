<script setup lang="ts">
import BxInput from '@hn/components/common/BxInput.vue'
import BxTextarea from '@hn/components/common/BxTextarea.vue'
import BxButton from '@hn/components/common/BxButton.vue'
import BxSelect from '@hn/components/common/BxSelect.vue'
import BxCheckbox from '@hn/components/common/BxCheckbox.vue'
import BxSwitch from '@hn/components/common/BxSwitch.vue'
import BxRadio from '@hn/components/common/BxRadio.vue'
import { ref } from 'vue'

const radio = ref()
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
          <bx-button>Click me</bx-button>
          <bx-button variant="blue">Click me</bx-button>
          <bx-button variant="green">Click me</bx-button>
          <bx-button variant="red">Click me</bx-button>
          <bx-button variant="yellow">Click me</bx-button>
          <bx-button variant="gray">Click me</bx-button>
        </div>

        <h4>Outline</h4>
        <div style="display: flex; gap: 10px">
          <bx-button outlined>Click me</bx-button>
          <bx-button outlined variant="blue">Click me</bx-button>
          <bx-button outlined variant="green">Click me</bx-button>
          <bx-button outlined variant="red">Click me</bx-button>
          <bx-button outlined variant="yellow">Click me</bx-button>
          <bx-button outlined variant="gray">Click me</bx-button>
        </div>

        <h4>Disabled</h4>
        <div style="display: flex; gap: 10px">
          <bx-button disabled>Click me</bx-button>
          <bx-button disabled variant="blue">Click me</bx-button>
          <bx-button disabled variant="green">Click me</bx-button>
          <bx-button disabled variant="red">Click me</bx-button>
          <bx-button disabled variant="yellow">Click me</bx-button>
          <bx-button disabled variant="gray">Click me</bx-button>
        </div>

        <h4>Disabled + outline</h4>
        <div style="display: flex; gap: 10px">
          <bx-button disabled outlined>Click me</bx-button>
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
  </div>
</template>
