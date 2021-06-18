import { useField } from 'formik'
import { NextPage } from 'next'
import React from 'react'
import * as Yup from 'yup'
import { FormPage, MultiCreate, NumberInput, TextInput } from '../src'

const MultiCreator = ({ name }) => {
  const [, meta, helper] = useField(name)

  return (
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
      helperText={
        'unitExplanation super duper long so long wow is this long who even reads this'
      }>
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
    </MultiCreate>
  )
}

const Test: NextPage<Props> = ({}) => {
  return (
    <FormPage
      onSubmit={() => {}}
      title='test'
      initialValues={{ test: [] }}
      validationSchema={null}>
      <MultiCreator name='test' />
    </FormPage>
  )
}

export default Test

interface Props {}
