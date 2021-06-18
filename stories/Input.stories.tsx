import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import { useField } from 'formik'
import { createProductFullName, formatDate } from 'inventhora-utils'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import withFormik from 'storybook-formik'
import * as Yup from 'yup'
import StorybookWrapper from '../.storybook/Wrapper'
import {
  ButtonGroup,
  Checkbox,
  ComboBox,
  ConsumableInput,
  DateInput,
  DateTimeInput,
  EmailInput,
  FileInput,
  getTheme,
  MultiCombobox,
  MultiCreate,
  NumberInput,
  Option,
  PasswordInput,
  PhoneInput,
  SelectInput,
  TableInput,
  TextAreaInput,
  TextInput,
  TextListInput,
  TimeInput,
  WithCreationOption,
} from '../src'

export default {
  title: 'Inputs',
  decorators: [
    StorybookWrapper,
    withKnobs,
    withA11y,
    withFormik,
    muiTheme([getTheme(false)]),
  ],
  parameters: {
    formik: {
      initialValues: {
        MultiCreateStory: [],
        DimensionsInput: {},
        FileInputStory: boolean('Multiple Files?', true) ? [] : null,
        consumables: [],
        TableInputStory: [],
        MultiComboboxStory: [],
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

// export const DimensionsInputStory = (props) => (
//   <DimensionsInput name='DimensionsInput' lengthUnit='cm' />
// )

export const PhoneInputStory = (props) => (
  <PhoneInput
    name='PhoneInputStory'
    prefixName='PrefixPhoneInputStory'
    label='PhoneInput'
    required={boolean('Required', false)}
  />
)

export const FileInputStory = (props) => (
  <FileInput
    label='FileInputStory'
    onDelete={() => {}}
    onReOrder={() => {}}
    isImages={boolean('Is Image Upload?', false)}
    name='FileInputStory'
    multiple={boolean('Multiple Files?', true)}
  />
)

// export const WYSIWYGInputStory = (props) => {
//   const [value, setValue] = useState('')

//   return (
//     <>
//       <WYSIWYGInput
//         onChange={(val) => setValue(val)}
//         name='WYSIWYGInput'
//         label='WYSIWYGInput'
//         required={boolean('Required', false)}
//       />
//       <Markdown source={value} />
//     </>
//   )
// }

// export const AddressInputStory = (props) => (
//   <AddressInput withBilling={boolean('With Billing Address', true)} />
// )

export const MultiComboboxStory = (props) => (
  <MultiCombobox
    name='MultiComboboxStory'
    helperText='MultiComboboxHelper'
    required={boolean('Required', false)}
    label='MultiComboboxStory'
    options={['tag1', 'tag2', 'tag3']}
  />
)

const MultiCrateForm = () => {
  const [_, meta] = useField('MultiCreateStory')

  return (
    <>
      <TextInput
        autoFocus
        name={'MultiCreateStory'}
        index={meta.value.length - 1}
        subName='name'
        required
        label={'unitName'}
        helperText={'unitNameHelper'}
      />
      <NumberInput
        name={'MultiCreateStory'}
        index={meta.value.length - 1}
        subName='baseAmount'
        required
        label={'baseAmount'}
        helperText={'baseAmountHelper'}
      />
    </>
  )
}

export const MultiCreateStory = (props) => {
  return (
    <>
      <MultiCreate
        label='MultiCreate'
        schema={Yup.object({
          name: Yup.string(),
          baseAmount: Yup.string().required(),
        })}
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
        helperText={
          'unitExplanation super duper long so long wow is this long who even reads this'
        }>
        <MultiCrateForm />
      </MultiCreate>
    </>
  )
}

export const TableInputStory = (props) => {
  return (
    <TableInput
      label='TableInput'
      withSearch={boolean('With Search', true)}
      multiple={boolean('Multiple?', false)}
      helperText='This is a helper text'
      name='TableInputStory'
      filterWith={boolean('With Filter', false) && 'supplier.id'}
      columns={[
        {
          accessor: (val) =>
            createProductFullName({
              product: val.product,
              lengthUnit: 'cm',
              weightUnit: 'gr',
              t: null,
            }),
          Header: 'product',
        },
        { accessor: 'amount', Header: 'amount' },
        {
          accessor: (val: any) => val?.batch?.batchNumber ?? 'N/A',
          Header: 'batchNumberShort',
        },
        {
          accessor: (val: any) =>
            val?.batch?.bestBefore
              ? formatDate(val?.batch?.bestBefore, 'day')
              : 'N/A',
          Header: 'bestBeforeShort',
        },
        {
          accessor: 'supplier.name',
          Header: 'supplier',
        },
        {
          accessor: 'warehouse.name',
          Header: 'warehouse',
        },
      ]}
      options={[
        {
          id: '1',
          amount: 167,
          supplier: {
            id: 'ckdilk78c0108f3c9a1km2ex2',
            name: 'Supplier1',
          },
          batch: {
            id: 'ckdilk79z0185f3c9urbbyapl',
            batchNumber: '1',
            bestBefore: null,
          },
          product: {
            id: 'ckdilk7800088f3c9hpvagjhu',
            fullName: 'Teller',

            consumables: [],
          },
          warehouse: {
            id: 'ckdilk78c0108f3c9a1km2ex2',
            name: 'Warehouse2',
          },
        },
        {
          id: '2',
          amount: 100,
          supplier: {
            id: 'ckdilk76u0037f3c9k6jy0ghm',
            name: 'Supplier2',
          },
          batch: {
            id: 'ckdilk79z0185f3c9urbbyapl',
            batchNumber: null,
            bestBefore: null,
          },
          product: {
            id: 'ckdilk7800088f3c9hpvagjhu',
            fullName: 'Glas',

            consumables: [],
          },
          warehouse: {
            id: 'ckdilk78c0108f3c9a1km2ex2',
            name: 'Warehouse1',
          },
        },
        {
          id: '3',
          amount: 37,
          supplier: {
            id: 'ckdilk78c0108f3c9a1km2ex2',
            name: 'Supplier1',
          },
          batch: {
            id: 'ckdilk79z0185f3c9urbbyapl',
            batchNumber: '12',
            bestBefore: null,
          },
          product: {
            id: 'ckdilk7800088f3c9hpvagjhu',
            fullName: 'Tisch',

            consumables: [],
          },
        },
      ]}
    />
  )
}

export const ConsumableInputStory = (props) => {
  return (
    <ConsumableInput
      name='consumables'
      label='Consumables'
      helperText='Consumables Helper'
      columns={[
        {
          accessor: (val) =>
            createProductFullName({
              product: val.product,
              lengthUnit: 'cm',
              weightUnit: 'gr',
              t: null,
            }),
          Header: 'product',
        },
        { accessor: 'amount', Header: 'amount' },
        {
          accessor: (val: any) => val?.batch?.batchNumber ?? 'N/A',
          Header: 'batchNumberShort',
        },
        {
          accessor: (val: any) =>
            val?.batch?.bestBefore
              ? formatDate(val?.batch?.bestBefore, 'day')
              : 'N/A',
          Header: 'bestBeforeShort',
        },
        {
          accessor: 'supplier.name',
          Header: 'supplier',
        },
        {
          accessor: 'warehouse.name',
          Header: 'warehouse',
        },
      ]}
      options={[
        {
          title: 'Holz',
          amount: 1,
          options: [
            {
              id: '1',
              amount: 167,
              supplier: {
                id: 'ckdilk76u0037f3c9k6jy0ghm',
                name: 'Magaña, Montañez and Valdez',
              },
              batch: {
                id: '2',
                batchNumber: '1',
                bestBefore: null,
              },
              product: {
                id: 'ckdilk7800088f3c9hpvagjhu',
                fullName: 'Teller',

                consumables: [],
              },
              warehouse: {
                id: 'ckdilk78c0108f3c9a1km2ex2',
                name: 'Warehouse2',
              },
            },
            {
              id: '2',
              amount: 100,
              supplier: {
                id: 'ckdilk76u0037f3c9k6jy0ghm',
                name: 'Supplier2',
              },
              batch: {
                id: 'ckdilk79z0185f3c9urbbyapl',
                batchNumber: null,
                bestBefore: null,
              },
              product: {
                id: 'ckdilk7800088f3c9hpvagjhu',
                fullName: 'Glas',

                consumables: [],
              },
              warehouse: {
                id: 'ckdilk78c0108f3c9a1km2ex2',
                name: 'Warehouse1',
              },
            },
            {
              id: '3',
              amount: 37,
              supplier: {
                id: 'ckdilk76u0037f3c9k6jy0ghm',
                name: 'Supplier1',
              },
              batch: {
                id: 'ckdilk79z0185f3c9urbbyapl',
                batchNumber: '12',
                bestBefore: null,
              },
              product: {
                id: 'ckdilk7800088f3c9hpvagjhu',
                fullName: 'Tisch',

                consumables: [],
              },
            },
          ],
        },
        {
          title: 'Nägel',
          amount: 10,
          options: [
            {
              id: '4',
              amount: 167,
              supplier: {
                id: 'ckdilk76u0037f3c9k6jy0ghm',
                name: 'Magaña, Montañez and Valdez',
              },
              batch: {
                id: 'ckdilk79z0185f3c9urbbyapl',
                batchNumber: '1',
                bestBefore: null,
              },
              product: {
                id: 'ckdilk7800088f3c9hpvagjhu',
                fullName: 'Teller',

                consumables: [],
              },
              warehouse: {
                id: 'ckdilk78c0108f3c9a1km2ex2',
                name: 'Warehouse2',
              },
            },
            {
              id: '5',
              amount: 100,
              supplier: {
                id: 'ckdilk76u0037f3c9k6jy0ghm',
                name: 'Supplier2',
              },
              batch: {
                id: 'ckdilk79z0185f3c9urbbyapl',
                batchNumber: null,
                bestBefore: null,
              },
              product: {
                id: 'ckdilk7800088f3c9hpvagjhu',
                fullName: 'Glas',

                consumables: [],
              },
              warehouse: {
                id: 'ckdilk78c0108f3c9a1km2ex2',
                name: 'Warehouse1',
              },
            },
            {
              id: '6',
              amount: 37,
              supplier: {
                id: 'ckdilk76u0037f3c9k6jy0ghm',
                name: 'Supplier1',
              },
              batch: {
                id: 'ckdilk79z0185f3c9urbbyapl',
                batchNumber: '12',
                bestBefore: null,
              },
              product: {
                id: 'ckdilk7800088f3c9hpvagjhu',
                fullName: 'Tisch',

                consumables: [],
              },
            },
          ],
        },
      ]}
    />
  )
}
