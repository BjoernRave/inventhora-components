import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { boolean, number, withKnobs } from '@storybook/addon-knobs'
import '@toast-ui/editor/dist/toastui-editor.css'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import withFormik from 'storybook-formik'
import {
  AddressInput,
  ButtonGroup,
  Checkbox,
  ComboBox,
  DateInput,
  DateTimeInput,
  DimensionsInput,
  EmailInput,
  FileUpload,
  getTheme,
  MultiCreate,
  NumberInput,
  Option,
  PasswordInput,
  ProductAmountInput,
  SelectInput,
  TextAreaInput,
  TextInput,
  TextListInput,
  TimeInput,
  WithCreationOption,
  WYSIWYGInput,
} from '../src'

export default {
  title: 'Inputs',
  decorators: [withKnobs, withA11y, withFormik, muiTheme([getTheme])],
  parameters: {
    formik: {
      initialValues: {
        ProductAmountInput: [
          { id: '1', name: 'unit', baseAmount: 1, amount: null },
        ],
        MultiCreateStory: [],
        DimensionsInput: {},
      },
    },
  },
}

const exampleOptions2: Option[] = [
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
]

const exampleOptions3: Option[] = [
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
  {
    label: 'Option 3',
    value: 'option3',
  },
]

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const TextInputStory = (props) => (
  <TextInput
    name='TextInput'
    label='TextInput'
    helperText='HelperText'
    error={boolean('Has Error', false)}
    required={boolean('Required', false)}
  />
)

export const NumberInputStory = (props) => (
  <NumberInput
    allowDecimals={boolean('Allow Decimals', true)}
    name='NumberInput'
    required={boolean('Required', false)}
    label='NumberInput'
  />
)

export const PasswordInputStory = (props) => (
  <PasswordInput
    name='PasswordInput'
    label='PasswordInput'
    helperText='HelperText'
    required={boolean('Required', false)}
  />
)

export const EmailInputStory = (props) => (
  <EmailInput
    name='EmailInput'
    label='EmailInput'
    helperText='HelperText'
    required={boolean('Required', false)}
  />
)

export const TextListInputStory = (props) => (
  <TextListInput
    name='TextListInput'
    label='TextListInput'
    helperText='HelperText'
    required={boolean('Required', false)}
  />
)

export const TextAreaInputStory = (props) => (
  <TextAreaInput
    name='TextAreaInput'
    label='TextAreaInput'
    helperText='HelperText'
    required={boolean('Required', false)}
  />
)

export const ComboBoxStory = (props) => (
  <ComboBox
    required={boolean('Required', false)}
    name='ComboboxInput'
    label='ComboboxInput'
    helperText='HelperText'
    options={exampleOptions2}
    getOptionLabel={(option) => option.label}
  />
)

export const SelectInputStory = (props) => (
  <SelectInput
    required={boolean('Required', false)}
    name='SelectInput'
    label='SelectInput'
    helperText='HelperText'
    options={exampleOptions2}
  />
)

export const DateInputStory = (props) => (
  <DateInput
    name='DateInput'
    label='DateInput'
    helperText='HelperText'
    required={boolean('Required', false)}
  />
)
export const TimeInputStory = (props) => (
  <TimeInput
    name='TimeInput'
    label='TimeInput'
    helperText='HelperText'
    required={boolean('Required', false)}
  />
)
export const DateTimeInputStory = (props) => (
  <DateTimeInput
    name='DateTimeInput'
    label='DateTimeInput'
    helperText='HelperText'
    required={boolean('Required', false)}
  />
)

export const CheckboxStory = (props) => (
  <Checkbox
    name='Checkbox'
    label='Checkbox'
    helperText='HelperText'
    required={boolean('Required', false)}
  />
)

export const ButtonGroupStory = (props) => (
  <>
    <ButtonGroup
      label='ButtonGroupInput2'
      name='ButtonGroupInput2'
      helperText='ButtonGroupHelper2'
      options={exampleOptions2}
      required={boolean('Required', false)}
    />
    <ButtonGroup
      label='ButtonGroupInput3'
      name='ButtonGroupInput3'
      helperText='ButtonGroupHelper3'
      options={exampleOptions3}
      required={boolean('Required', false)}
    />
  </>
)

export const WithCreationOptionStory = (props) => (
  <WithCreationOption
    title='CreationOption'
    canCreate={boolean('Can Create', true)}
    onCreate={() => console.log('creating')}>
    <TextInput label='WithCreationOption' name='WithCreationOption' />
  </WithCreationOption>
)

export const DimensionsInputStory = (props) => (
  <DimensionsInput name='DimensionsInput' lengthUnit='cm' />
)

export const FileUploadStory = (props) => (
  <FileUpload
    onUpload={action('on Upload')}
    multiple={boolean('Multiple Files?', true)}
  />
)

export const WYSIWYGInputStory = (props) => (
  <WYSIWYGInput
    name='WYSIWYGInput'
    label='WYSIWYGInput'
    required={boolean('Required', false)}
  />
)

export const AddressInputStory = (props) => (
  <AddressInput withBilling={boolean('With Billing Address', true)} />
)

export const ProductAmountInputStory = (props) => (
  <ProductAmountInput
    required={boolean('Required', false)}
    type={boolean('Is Outgoing', true) ? 'outgoing' : 'incoming'}
    max={number('Max Amount', 100)}
    name='ProductAmountInput'
    product={{
      units: [
        { id: '2', name: 'Palette', baseAmount: 32 },
        { id: '3', name: 'Palette', baseAmount: 100 },
      ],
    }}
  />
)

export const MultiCreateStory = (props) => {
  return (
    <>
      <MultiCreate
        name={'MultiCreateStory'}
        fields={[
          {
            name: 'name',
            label: 'unitName',
          },
          {
            name: 'baseAmount',
            label: 'baseAmount',
          },
        ]}
        title={'Create a Unit'}
        onDelete={action}
        helperText={'unitExplanation'}>
        <TextInput
          autoFocus
          name={'MultiCreateStory'}
          index={0}
          subName='name'
          required
          label={'unitName'}
          helperText={'unitNameHelper'}
        />
        <NumberInput
          name={'MultiCreateStory'}
          index={0}
          subName='baseAmount'
          required
          label={'baseAmount'}
          helperText={'baseAmountHelper'}
        />
      </MultiCreate>
    </>
  )
}
