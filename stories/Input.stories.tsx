import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import withFormik from 'storybook-formik'
import {
  Checkbox,
  ComboBox,
  DateInput,
  DateTimeInput,
  EmailInput,
  FileUpload,
  getTheme,
  NumberInput,
  Option,
  PasswordInput,
  SelectInput,
  TextAreaInput,
  TextInput,
  TextListInput,
  TimeInput,
} from '../src'

export default {
  title: 'Inputs',
  decorators: [withKnobs, withA11y, withFormik, muiTheme([getTheme])],
}

const exampleOptions: Option[] = [
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
]

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const TextInputStory = (props) => (
  <TextInput
    name='TextInput'
    label='TextInput'
    helperText='HelperText'
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
    options={exampleOptions}
    getOptionLabel={(option) => option.label}
  />
)

export const SelectInputStory = (props) => (
  <SelectInput
    required={boolean('Required', false)}
    name='SelectInput'
    label='SelectInput'
    helperText='HelperText'
    options={exampleOptions}
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

export const FileUploadStory = (props) => (
  <FileUpload
    onUpload={action('on Upload')}
    multiple={boolean('Multiple Files?', true)}
  />
)
