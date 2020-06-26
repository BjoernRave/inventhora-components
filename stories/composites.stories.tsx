import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import withFormik from 'storybook-formik'
import { AddressInput, getTheme } from '../src'

export default {
  title: 'Composites',
  decorators: [withKnobs, withA11y, withFormik, muiTheme([getTheme])],
}

export const AddressInputStory = (props) => <AddressInput />
